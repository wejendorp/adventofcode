const mapping = {
	U: i => i >= 4 ? i - 3 : i,
	D: i => i <= 6 ? i + 3 : i,
	L: i => (i % 3) === 1 ? i : i - 1,
	R: i => i % 3 ? i + 1 : i
};
const compute = s => {
	const lines = s.split('\n');
	let i = 5;

	return lines.map(line =>
		i = line.split('').reduce((agg, c) => mapping[c](agg), i)
	).join('');
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	var s = process.stdin.read();
	if (s) {
		console.log(compute(s));
	}
});
