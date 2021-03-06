const bs = require('./buildspace');
const recipe = require('../src/pages/recipe');
const { Davit } = require('../../davit/lib/index');

const src = bs.options.source;
const out = bs.options.output;

bs.enter();

const dv = new Davit({
	source: src,
	root: out
});

const requireUncached = (module) => {
	delete require.cache[require.resolve(module)];
	return require(module);
};

dv.watch('/media/style.css', () => {
	bs.copyFile('/media/style.css');
});

dv.watch('/pages/recipes/*rcp', (f, p) => {
	const name = f.split('.')[0];
	const index = bs.pages.findIndex(p => p.path === 'recipes/' + name);
	if (index > -1) {
		const qr = bs.pages[index].data.qr;
		const data = recipe(p);
		bs.pages[index].data = Object.assign(data, { qr });
		const compiled = bs.compilePage(bs.pages[index]);
		bs.writeToFile(bs.pages[index].path, compiled);
	}
});

dv.start();

process.on('SIGINT', function() {
    require('./clean');
    process.exit();
});