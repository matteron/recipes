const fs = require('fs');

const parseArray = (raw) => raw.split('+')
	.filter(p => p.trim())
	.reduce((acc, cur) => {
		acc.push(cur.trim());
		return acc;
	}, []);

module.exports = (path) => {
	const raw = fs.readFileSync(path, 'utf-8');

	return raw.split('@').filter(p => p).reduce((acc, cur) => {
		const prop = cur.split(':');
		const key = prop[0];
		const value = prop[1].includes('+')
			? parseArray(prop[1])
			: prop[1].trim();
		acc[key] = value;
		return acc;
	}, {});
}