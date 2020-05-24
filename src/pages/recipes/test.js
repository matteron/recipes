const tags = require('../../meta/tags');

module.exports = {
	title: 'Test',
	meta: {
		time: {
			prep: 20,
			cook: 30
		},
		serves: '1-2',
		tags: [
			tags.breakfast
		]
	},
	body: {
		ingredients: [
			'test 1',
			'test 2'
		],
		equipment: [
			'pannnn'
		],
		steps: [
			'first do this',
			'oh then this'
		]
	}
}