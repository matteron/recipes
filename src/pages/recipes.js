const fs = require('fs');

module.exports = fs.readdirSync('./src/pages/recipes').reduce((acc, cur) => {
	const base = cur.split('.')[0];
	const recipe = require('./recipes/' + base);
	acc.push({
		path: 'recipes/' + base,
		data: recipe
	});
	return acc;
}, []);