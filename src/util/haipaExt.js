const { tags, attr } = require('haipa');
const { ul, li, a } = tags;
const { href, classes } = attr;

const recipeListing = (r) => li([], [
    a([href('/' + r.path + '.html')], [r.name])
]);

const recipeList = (recipes) => ul([], [
    recipes.reduce((acc, cur) => acc + recipeListing(cur), '')
]);

module.exports = {
    recipeList
}