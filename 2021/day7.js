const compute = (input, costFn) => {
  const sum = input.reduce((agg, i) => agg + i, 0);
  const avg = sum / input.length;
  let position = Math.round(avg);

  // search from the avg in decreasing direction
  const getCostFor = (pos) => input.reduce((c, i) => costFn(pos, i) + c, 0);
  const costs = [getCostFor(position - 1), getCostFor(position)];
  let direction = 1;
  let cost = costs[1];
  if (costs[0] < costs[1]) {
    direction = -1;
    cost = costs[0];
  }

  while (true) {
    const step = getCostFor(position + direction);
    if (step > cost) {
      return { position, cost };
    }
    position += direction;
    cost = step;
  }
};

process.stdin.setEncoding("utf8");
process.stdin.on("readable", () => {
  const s = process.stdin
    .read()
    ?.split(",")
    .map((s) => parseInt(s));
  if (s) {
    console.log(compute(s, (pos, i) => Math.abs(pos - i)));
    console.log(
      compute(s, (pos, i) => {
        const dist = Math.abs(pos - i);
        return 0.5 * dist * (dist + 1);
      })
    );
  }
});
