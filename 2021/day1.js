const compute = (input) => {
	let current = Infinity;
	let count = 0;
	input.split('\n').forEach((val) => {
		const num = parseInt(val);
		if (num > current) count++;
		current = num;
	});
	return count;
};

const compute2 = (input) => {
	let count = 0;
	const values = input.split('\n').map((s) => parseInt(s));
	for (let i = 3; i < values.length; i++) {
		if (values[i] > values[i - 3]) count++;
	}
	return count;
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	var s = process.stdin.read();
	if (s) {
		console.log(compute(s));
		console.log(compute2(s));
	}
});
