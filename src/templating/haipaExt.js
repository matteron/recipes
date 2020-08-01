const { h } = require('haipa');
const { HaipaNode } = require('haipa/lib/main/node');

HaipaNode.prototype.rHeader = function(title, qr, altTitle) {
	const inner = h();
	if (qr) {
		inner.div(h()
			.div(h().class('qrback')
				.a(h('⇱ back').class('back').href('/'))
				.qr(qr)
			)
		);
	}
	const innerH = h(title);
	if (altTitle) {
		innerH.ariaLabel(altTitle);
	}
	qr ? inner.h2(innerH) : inner.h1(innerH);
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

HaipaNode.prototype.ladybug = function() {
	const path1 = 'M50 59s0 45 90 45 90-45 90-45 54 46 45 180c-4 53-71 121-135 120-65-1-130-68-135-120C-9 110 50 59 50 59z';
	const path2 = 'M50 119c16 0 30 14 30 30 0 33-14 60-30 60s-30-6-30-15c0-41 14-75 30-75m90 0c-16 0-30 21-30 45 0 9 14 15 30 15m-45 60c-16 0-30 14-30 30 0 17 14 30 30 30 8 0 15-13 15-30 0-16-7-30-15-30m45-225C90 24 60 39 50 59c0 25 41 45 90 45V14m90 105c-16 0-30 14-30 30 0 33 14 60 30 60s30-6 30-15c0-41-14-75-30-75m-90 0c16 0 30 21 30 45 0 9-14 15-30 15m45 60c16 0 30 14 30 30 0 17-14 30-30 30-8 0-15-13-15-30 0-16 7-30 15-30M140 14c50 10 80 25 90 45 0 25-41 45-90 45V14';
	const path3 = 'M140 89c-8 0-15-6-15-15 0-8 7-15 15-15m-90 0c0-16 27-30 60-30 0 25-14 45-30 45s-30-6-30-15m90 0v30m0 0c8 0 15-6 15-15 0-8-7-15-15-15m90 0c0-16-27-30-60-30 0 25 14 45 30 45s30-6 30-15m-90 0v30';
	const path4 = 'M5 209c0 83 61 150 135 150M5 209C5 89 50 24 140 14M50 59c0 25 41 45 90 45v255m135-150c0 83-61 150-135 150m135-150c0-120-45-185-135-195m90 45c0 25-41 45-90 45v255';
	const black = '#222';
	const white = '#f2f2f2';
	const orange = '#ea5c1f';
	return this.svg(h()
		.class('ladybug')
		.viewBox('0 0 280 365')
		.xmlns('ttp://www.w3.org/2000/svg')
		.fillRule('evenodd')
		.clipRule('evenodd')
		.strokeLinecap('round')
		.path(h().d(path1).fill(orange))
		.path(h().d(path2).fill(black).fillRule('nonzero').stroke(black).strokeWidth('7'))
		.path(h().d(path3).fill(white).fillRule('nonzero').stroke(white).strokeWidth('10').strokeLinejoin('round'))
		.path(h().d(path4).fill('none').stroke(black).strokeWidth('10').strokeLinejoin('bevel'))
	);
}

module.exports = HaipaNode;