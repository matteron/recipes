const { h } = require('haipa');
const { Tag } = require('haipa/lib/tag');

Tag.prototype.rHeader = function(title, qr) {
	const inner = h();
	if (qr) {
		inner.div(h()
			.div(h().class('qrback')
				.a(h('⇱ back').class('back').href('/'))
				.qr(qr)
			)
		);
	}
	qr ? inner.h2(h(title)) : inner.h1(h(title));
	// inner.h1(h(title));
	return this.header(inner);
}

Tag.prototype.rFooter = function() {
	return this.footer(h()
		.span(h().txt('Made by '))
		.span(h()
			.a(h()
				.href('https://mattia.id')
				.txt('Mattia')
			)
		)
		// .span(h().txt('Dedicated to Mamma'))
	);
}

Tag.prototype.recipeList = function(list) {
	return this.ul(h()
		.forEach(list, (tag, n) => {
			tag.li(h()
				.a(h().href(n.path).txt(n.data.title))
			);
		})
	);
}

Tag.prototype.simpleList = function(list, numbered) {
	const inner = h().forEach(list, (tag, n) => {
		tag.li(h().txt(n))
	});
	return this[(numbered ? 'ol' : 'ul')](inner);
}

Tag.prototype.branchList = function(data, numbered) {
	if (typeof data[0] === 'string') {
		return this.simpleList(data, numbered);
	} else {
		return this.ul(h()
			.forEach(data, (tag, n) => {
				tag.h4(h().txt(n.title))
					.simpleList(n.list, numbered)
			})
		)
	}
}

Tag.prototype.titledList = function(title, list, numbered) {
	return this.h3(h()
		.txt(title)
	).branchList(list, numbered);
}

Tag.prototype.ingredients = function(r) {
	return this
		.titledList(`Ingredients`, r.ingredients);
}

Tag.prototype.steps = function(r) {
	return this.titledList('Steps', r.steps, true);
}

Tag.prototype.tag = function(name) {
	return this.a(h().class('tag').href(`/tags/${name}`).txt(name));
}

Tag.prototype.tagList = function(list) {
	return this.div(h().class('tags').forEach(list, (tag, n) => {
		tag.tag(n)
	}));
}

Tag.prototype.cookTime = function(prep, cook) {
	return this.div(h().title('Prep and Cook Times').class('times')
		.span(h(`prep: ${prep}`))
		.txt(' | ')
		.span(h(`cook: ${cook}`))
	);
}

Tag.prototype.rInfo = function(r) {
	return this.div(h().class('info')
		.tagList(r.tags)
		.cookTime(r.prep, r.cook)
	);
}

Tag.prototype.qr = function(qr) {
	return this.div(h(qr).class('qr'));
}

Tag.prototype.rBody = function(r) {
	return this.rInfo(r).ingredients(r).steps(r);
}

module.exports = Tag;