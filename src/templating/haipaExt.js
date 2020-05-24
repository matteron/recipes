const { h } = require('haipa');
const { Tag } = require('haipa/lib/tag');

Tag.prototype.rHeader = function(title, isHome) {
	const inner = h();
	if (!isHome) {
		inner.div(h().a(h().href('/').txt('back')))
	}
	inner.h1(h().txt(title));
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
		.titledList(`Ingredients (Serves ${r.meta.serves})`, r.body.ingredients);
}

Tag.prototype.equipment = function(r) {
	return this.titledList('Equipment', r.body.equipment);
}

Tag.prototype.steps = function(r) {
	return this.titledList('Steps', r.body.steps, true);
}

Tag.prototype.tag = function(name) {
	return this.a(h().class('tag').href(`/tags/${name}`).txt(name));
}

Tag.prototype.tagList = function(list) {
	return this.div(h().class('tags').forEach(list, (tag, n) => {
		tag.tag(n)
	}));
}

Tag.prototype.cookTime = function(time) {
	return this.div(h().title('Prep and Cook Times').class('times')
		.span(h().txt(`prep: ${time.prep}`))
		.txt(' | ')
		.span(h().txt(`cook: ${time.cook}`))
	);
}

Tag.prototype.rInfo = function(meta) {
	return this.div(h().class('info')
		.tagList(meta.tags)
		.cookTime(meta.time)
	);
}

Tag.prototype.rBody = function(r) {
	return this.rInfo(r.meta).ingredients(r).equipment(r).steps(r);
}

module.exports = Tag;