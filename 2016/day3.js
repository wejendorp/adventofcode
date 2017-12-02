const compute = s => s.split('\n')
	.filter(l => {
		const sides = l.split(/\s+/)
			.filter(x => x)
			.map(x => parseInt(x, 10))
			  .sort((a, b) => a - b); // silly js

		return sides[0] + sides[1] > sides[2];
	}).length;

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	var s = process.stdin.read();
	if (s) {
		console.log(compute(s));
	}
});
