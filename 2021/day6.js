const compute = (fishes, days) => {
	const cycles = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	fishes.forEach((fish) => ++cycles[parseInt(fish)]);
	const tick = () => {
		const newspawn = cycles[0];
		for (let i = 0; i < 8; i++) {
			cycles[i] = cycles[i + 1];
		}
		cycles[8] = newspawn;
		cycles[6] += newspawn;
	};
	for (let i = 0; i < days; i++) {
		tick();
	}
	return cycles.reduce((s, a) => s + a, 0);
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	const s = process.stdin.read()?.split(',');
	if (s) {
		console.log(compute(s, 80));
		console.log(compute(s, 256));
	}
});
