const compute = (rows) => {
	const avg = rows[0].split('').map((s) => parseInt(s));
	rows.slice(1).forEach((row) => {
		for (let i = 0; i < row.length; i++) {
			avg[i] += row[i] === '1' ? 1 : 0;
		}
	});
	const binaryArr = avg.map((f) => Math.round(f / rows.length));
	const gamma = parseInt(binaryArr.join(''), 2);
	const epsilon = parseInt(
		binaryArr.map((s) => ({ 0: 1, 1: 0 }[s])).join(''),
		2
	);

	return { gamma, epsilon, result: gamma * epsilon };
};

const compute2 = (rows, bit = 0, keep) => {
	let avg = 0;
	rows.forEach((row) => {
		avg += row[bit] === '1' ? 1 : 0;
	});
	const filter = Math.round(avg / rows.length).toString();
	const newRows = rows.filter((r) => keep(r[bit], filter));
	if (newRows.length === 1) {
		return parseInt(newRows.pop(), 2);
	}
	return compute2(newRows, bit + 1, keep);
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	const s = process.stdin.read()?.split('\n');
	if (s) {
		console.log(compute(s));
		console.log(
			compute2(s, 0, (a, b) => a != b) * compute2(s, 0, (a, b) => a == b)
		);
	}
});
