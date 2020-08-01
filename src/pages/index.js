const { h } = require('haipa');
require('../templating/haipaExt');
const ladybugTitle = h().txt('Antonella C').span(h().ladybug()).txt('ccinella');

module.exports = class IndexPage {
	path = 'index';
	data = {
		title: ladybugTitle.render(),
		altTitle: 'Antonella Coccinella',
		recipes: require('./recipes')
	}
}