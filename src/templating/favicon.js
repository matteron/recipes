const { h } = require('haipa');
require('./haipaExt');

module.exports = class FaviconTemplate {
	build = () => h('<?xml version="1.0" encoding="UTF-8" standalone="no"?>')
		.doctype('svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"')
		.ladybug()
		.render();
}