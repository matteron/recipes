const fs = require('fs');
const recipe = require('./recipe');
const QRCode = require('qrcode-svg');
const url = process.env.NODE_ENV === 'production'
	? 'https://recipes.mattia.id'
	: 'https://localhost:3000/';

module.exports = fs.readdirSync('./src/pages/recipes')
	.filter(r => r.split('.')[1] === 'rcp')
	.reduce((acc, cur) => {
		const path = 'recipes/' + cur.split('.')[0];
		const data = recipe(__dirname + '/recipes/' + cur);
		const qrContent = url + path;
		const qr = new QRCode({
			content: qrContent,
			padding: 0,
			width: 64,
			height: 64
		}).svg();
		acc.push({
			path,
			data: Object.assign(data, { qr }),
		});
		return acc;
	}, []);