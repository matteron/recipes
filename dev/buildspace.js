const Buildspace = require('buildspace');
const Templates = require('../src/templates');
const Pages = require('../src/pages');

const bs = new Buildspace({
	copy: ['media']
});
bs.register(Pages.Index, Templates.Index);
bs.setDefaultTemplate(Templates.Recipe);
bs.bulkRegister(Pages.Recipes);

module.exports = bs;