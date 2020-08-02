const { BuildSpace } = require('buildspace');
const Templates = require('../src/templates');
const Pages = require('../src/pages');

const bs = new BuildSpace({
	copy: ['media'],
});
bs.register(Pages.Index, Templates.Index);
bs.register(Pages.Favicon, Templates.Favicon);
bs.setDefaultTemplate(Templates.Recipe);
bs.bulkRegister(Pages.Recipes);

module.exports = bs;