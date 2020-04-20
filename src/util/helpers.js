const fs = require('fs');
const path = require('path');
const marked = require('marked');
const { recipes } = require('../pages/pages');

const markdown = (loc) => {
    const normalized = path.normalize(path.join('src/pages', loc));
    const raw = fs.readFileSync(normalized, 'utf-8');
    return marked(raw);
}

const copyCss = (outDir) => {
    fs.readdirSync(path.normalize('src')).filter(f => f.includes('.css')).forEach(f => {
        const src = path.normalize(path.join('src', f));
        const out = path.normalize(path.join(outDir, f));
        fs.copyFileSync(src, out);
    });
}

module.exports = {
    markdown,
    copyCss
}