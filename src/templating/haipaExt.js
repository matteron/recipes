const { h } = require('haipa');
const { HaipaNode } = require('haipa/lib/main/node');

HaipaNode.prototype.rHeader = function(title, qr) {
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

HaipaNode.prototype.rFooter = function() {
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

HaipaNode.prototype.recipeList = function(list) {
	return this.ul(h()
		.forEach(list, (tag, n) => {
			tag.li(h()
				.a(h().href(n.path).txt(n.data.title))
			);
		})
	);
}

HaipaNode.prototype.simpleList = function(list, numbered) {
	const inner = h().forEach(list, (tag, n) => {
		tag.li(h().txt(n))
	});
	return this[(numbered ? 'ol' : 'ul')](inner);
}

HaipaNode.prototype.branchList = function(data, numbered) {
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

HaipaNode.prototype.titledList = function(title, list, numbered) {
	return this.h3(h()
		.txt(title)
	).branchList(list, numbered);
}

HaipaNode.prototype.ingredients = function(r) {
	return this
		.titledList(`Ingredients (Serves: ${r.serves})`, r.ingredients);
}

HaipaNode.prototype.steps = function(r) {
	return this.titledList('Steps', r.steps, true);
}

HaipaNode.prototype.tag = function(name) {
	return this.a(h().class('tag').href(`/tags/${name}`).txt(name));
}

HaipaNode.prototype.tagList = function(list) {
	return this.div(h().class('tags').forEach(list, (tag, n) => {
		tag.tag(n)
	}));
}

HaipaNode.prototype.cookTime = function(prep, cook) {
	return this.div(h().title('Prep and Cook Times').class('times')
		.span(h(`prep: ${prep}`))
		.txt(' | ')
		.span(h(`cook: ${cook}`))
	);
}

HaipaNode.prototype.rInfo = function(r) {
	return this.div(h().class('info')
		.tagList(r.tags)
		.cookTime(r.prep, r.cook)
	);
}

HaipaNode.prototype.qr = function(qr) {
	return this.div(h(qr).class('qr'));
}

HaipaNode.prototype.rBody = function(r) {
	return this.rInfo(r).ingredients(r).steps(r);
}

module.exports = HaipaNode;