const tags = require('../../meta/tags');

module.exports = {
	title: 'Test 2',
	meta: {
		time: {
			prep: 10,
			cook: 50
		},
		serves: '801',
		tags: [
			tags.lunch,
			tags.breakfast,
			tags.dinner
		]
	},
	body: {
		ingredients: [
			{
				title: 'part 1',
				list: [
					'test 1',
					'test 2'
				]
			},
			{
				title: 'part 2',
				list: [
					'test 3',
					'test 4'
				]
			}
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