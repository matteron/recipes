const buildspace = require('./buildspace');
const browsersync = require('browser-sync');
const rimraf = require('rimraf');
const { copyCss, markdown } = require('./src/util/helpers');
const path = require('path');
const fs = require('fs');

const src = './src'
const out = buildspace.options.outputDir;

buildspace.enter();

browsersync.init({
    server: {
        baseDir: out,
        serveStaticOptions: {
            extensions: ['html']
        }
    }
});

browsersync.watch(src + '/*.css').on('change', (loc) => {
    const base = path.basename(loc)
    const source = path.normalize(path.join('src', base));
    const dest = path.normalize(path.join(out, base));
    fs.copyFileSync(source, dest);
    browsersync.reload(loc)
});

browsersync.watch(src + '/pages/*/*.md').on('change', (loc) => {
    const filePath = loc.substr('src/pages/'.length);
    const base = filePath.split('.')[0];
    const page = buildspace.pages.find(p => p.path === base);
    if (page) {
        page.data.body = markdown(filePath);
        buildspace.writeToFile(page.path, buildspace.compilePage(page))
    } else {
        console.log(`Not really sure how this happened, but the page at ${base} can't be found.`);
    }
    browsersync.reload(loc)
});

process.on('SIGINT', function() {
    console.log('\nCleaning up...');
	rimraf.sync(buildspace.options.outputDir)
	console.log('Buh bye 👋');
    process.exit();
});