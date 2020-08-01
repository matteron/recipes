const { h } = require('haipa');
require('./haipaExt');

module.exports = class IndexTemplate {
	build = (d) => h().doctype().html(h()
		.lang('en')
		.head(h()
			.title(h().txt(d.title))
			.viewport()
			.encoding()
			.stylesheet('/media/style.css')
		)
		.body(h()
			.rHeader(d.title, null, d.altTitle)
			.main(h()
				.recipeList(d.recipes)
			)
			// .rFooter()
		)
	).render();
}