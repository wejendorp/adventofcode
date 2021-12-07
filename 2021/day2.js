const compute = (instructions) => {
	let posX = 0;
	let depth = 0;
	instructions.forEach((instruction) => {
		const [type, val] = instruction.split(' ');
		const num = parseInt(val);
		if (type === 'forward') {
			posX += num;
		} else if (type === 'down') {
			depth += num;
		} else {
			depth -= num;
		}
	});

	return { posX, depth, result: posX * depth };
};

const compute2 = (instructions) => {
	let aim = 0;
	let posX = 0;
	let depth = 0;
	instructions.forEach((instruction) => {
		const [type, val] = instruction.split(' ');
		const num = parseInt(val);
		if (type === 'forward') {
			posX += num;
			depth += aim * num;
		} else if (type === 'down') {
			aim += num;
		} else {
			aim -= num;
		}
	});

	return { posX, depth, result: posX * depth };
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	const s = process.stdin.read()?.split('\n');
	if (s) {
		console.log(compute(s));
		console.log(compute2(s));
	}
});
