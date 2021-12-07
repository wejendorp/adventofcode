const pickWinner = (numbers, boards, pickFirst = true) => {
	const boardsRowSets = boards.map((rows) => rows.map((row) => new Set(row)));
	const boardsColSets = boards.map((rows) => {
		const cols = [[], [], [], [], []];
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				cols[i][j] = rows[j][i];
			}
		}
		return cols.map((vals) => new Set(vals));
	});

	const skipList = new Set();
	const sum = (xs) => xs.reduce((agg, x) => x + agg, 0);
	const boardSum = (sets) => sets.reduce((agg, set) => agg + sum([...set]), 0);
	const removeNumber = (n) => {
		for (
			let boardNumber = 0;
			boardNumber < boardsRowSets.length;
			boardNumber++
		) {
			if (skipList.has(boardNumber)) {
				continue;
			}

			// remove row wise
			for (let set of boardsRowSets[boardNumber]) {
				set.delete(n);
				if (set.size === 0) {
					if (pickFirst || skipList.size === boardsRowSets.length - 1) {
						return boardSum(boardsRowSets[boardNumber]);
					}
					skipList.add(boardNumber);
				}
			}
			// remove col wise
			for (let set of boardsColSets[boardNumber]) {
				set.delete(n);
				if (set.size === 0) {
					if (pickFirst || skipList.size === boardsRowSets.length - 1) {
						return boardSum(boardsColSets[boardNumber]);
					}
					skipList.add(boardNumber);
				}
			}
		}
	};
	while (numbers.length) {
		const currentNumber = numbers.shift();
		const res = removeNumber(currentNumber);
		if (res) {
			return res * currentNumber;
		}
	}
};

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	const s = process.stdin.read()?.split('\n\n');
	if (s) {
		const [numbersStr, ...boardsStr] = s;
		const numbers = numbersStr.split(',').map((i) => parseInt(i));
		const boards = boardsStr.map((boardStr) =>
			boardStr.split('\n').map((s) =>
				s
					.split(/\s+/)
					.filter(Boolean)
					.map((s) => parseInt(s))
			)
		);
		console.log(pickWinner([...numbers], boards));
		console.log(pickWinner([...numbers], boards, false));
	}
});
