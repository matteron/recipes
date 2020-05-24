module.exports = class IndexPage {
	path = 'index';
	data = {
		title: 'Recipes',
		recipes: require('./recipes')
	}
}