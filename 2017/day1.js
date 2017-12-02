const compute = s =>
	s
		.trim()
		.split('')
		.filter((x, i, arr) => {
			return x === arr[(i + 1) % arr.length];
		})
		.reduce((a, b) => a + parseInt(b, 10), 0);

const compute2 = s =>
	s
		.trim()
		.split('')
		.filter((x, i, arr) => {
			return x === arr[(i + arr.length / 2) % arr.length];
		})
		.reduce((a, b) => a + parseInt(b, 10), 0);

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	var s = process.stdin.read();
	if (s) {
		console.log(compute(s));
		console.log(compute2(s));
	}
});
