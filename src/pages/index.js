module.exports = class IndexPage {
	path = 'index';
	data = {
		title: 'Antonella Coccinella',
		recipes: require('./recipes')
	}
}