const { h } = require('haipa');
require('./haipaExt');

module.exports = class RecipeTemplate {
	build = (d) => h().html(h()
		.lang('en')
		.head(h()
			.title(h().txt(d.title))
			.viewport()
			.encoding()
			.stylesheet('/media/style.css')
		)
		.body(h()
			.rHeader(d.title, d.qr)
			.main(h().rBody(d))
			// .rFooter()
		)
	).render();
}