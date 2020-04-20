const BuildSpace = require('../buildspace/lib/index');
const DefaultTemplate = require('./src/template');
const { static, recipes } = require('./src/pages/pages');
const { copyCss } = require('./src/util/helpers');

const bs = new BuildSpace();
bs.setDefaultTemplate(DefaultTemplate);
bs.bulkRegister(static);
bs.bulkRegister(recipes);
bs.addPostprocessor((bs) => {
    copyCss(bs.options.outputDir);
})

module.exports = bs;