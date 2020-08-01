const { h } = require('haipa');
require('../templating/haipaExt');
const ladybugTitle = h()
	.span(h('Antonella '))
	.span(h('C').ladybug().txt('ccinella'));

module.exports = class IndexPage {
	path = 'index';
	data = {
		title: ladybugTitle.render(),
		altTitle: 'Antonella Coccinella',
		recipes: require('./recipes')
	}
}