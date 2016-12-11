const dirs = [0, 1, 0, -1];
const compute = s => {
	const {x, y} = s.split(', ')
		.reduce((agg, x) => {
			const [rot] = x;
			const distStr = x.slice(1);
			const dist = parseInt(distStr, 10);
			const offset = {R: 1,	L: -1}[rot];
			const dir = (agg.dir + offset + 4) % 4;
			return {
				dir,
				x: agg.x + dirs[dir] * dist,
				y: agg.y + dirs[(dir + 1) % 4] * dist
			};
		}, {dir: 0, x: 0, y: 0});
	return x + y;
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	var s = process.stdin.read();
	if (s) {
		console.log(compute(s));
	}
});
