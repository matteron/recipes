const { markdown } = require('../util/helpers');
const { recipeList } = require('../util/haipaExt');

const recipes = [
    {
        name: 'Test',
        path: 'recipes/test',
        data: {
            body: markdown('recipes/test.md')
        }
    }
];

const static = [
    {
        name: 'Index',
        path: 'index',
        data: {
            body: recipeList(recipes)
        }
    }
];

module.exports = {
    static,
    recipes
}