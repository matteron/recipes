const fs = require('fs');
const QRCode = require('qrcode-svg');
const url = 'https://localhost:3000/';


module.exports = fs.readdirSync('./src/pages/recipes').reduce((acc, cur) => {
	const base = cur.split('.')[0];
	const recipe = require('./recipes/' + base);
	const path = 'recipes/' + base
	const qrContent = url + path;
	const qr = new QRCode({
		content: qrContent,
		padding: 0,
		width: 64,
		height: 64
	}).svg();
	acc.push({
		path,
		data: Object.assign(recipe, {qr})
	});
	return acc;
}, []);