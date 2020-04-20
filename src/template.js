const { tags, attr} = require('haipa');
const { html, head, body, title, div, header, main, nav, h1, link, a } = tags;
const { classes, id, lang, rel, type, href } = attr;

module.exports = class DefaultTemplate {

    build = (p) => html([lang`en`], [
        head([], [
            title([], [`${p.title ? `${p.title} - ` : ''}Carannante`]),
            link([
                rel`stylesheet`,
                type`text/css`,
                href('/styles.css')
            ])
        ]),
        body([], [
            header([], [
                h1([], ['Carannante']),
                nav([], [
                    a([href`/`], ['Home']),
                    a([href`/about`], ['About'])
                ])
            ]),
            main([], [
                p.body
            ]),
        ]),
    ]);
}