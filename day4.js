const parseLine = line => ({
	checksum: line.slice(-6, -1),
	chars: line.slice(0, -7)
		.replace(/-/g, '')
		.match(/[a-z]+/g)[0]
		.split(''),
	sector: parseInt(line.match(/\d+/g)[0], 10)
});

const compute = s => {
	return s.split('\n')
		.map(parseLine)
		.filter(room => {
			// CountingSet
			const counts = room.chars.reduce((agg, c) => {
				agg[c] = (agg[c] || 0) + 1;
				return agg;
			}, {});

			// Reverse the map to use counts as primary sort
			const checksum = Object.keys(counts)
				.map(c => [c, counts[c]])
				.sort((a, b) => {
					const comp = a[1] - b[1];
					if (comp) {
						return comp >= 0 ? 1 : -1;
					}
					// Chars as secondary sort, ascending
					return a[0] >= b[0] ? -1 : 1;
				})
				.reverse()
				.map(cx => cx[0])
				.join('')
				.slice(0, 5);

			return room.checksum === checksum;
		})
		.reduce((sum, room) => sum + room.sector, 0);
};

const decrypt = s => {
	return s.split('\n')
		.map(parseLine)
		.map(line => [
			line.chars
				.map(c => c.charCodeAt(0) - 97)
				.map(c => (c + line.sector) % 26)
				.map(c => c + 97),
			line.sector
		])
		.map(pair => [
			String.fromCharCode.apply(null, pair[0]),
			pair[1]
		]);
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	var s = process.stdin.read();
	if (s) {
		console.log(decrypt(s));
		console.log(compute(s));
	}
});
