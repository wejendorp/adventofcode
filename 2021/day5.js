const compute = (lines) => {
  // separate into horizontal and vertical lines
  const { xs, ys, h, v } = lines.reduce(
    (obj, [[x1, y1], [x2, y2]]) => {
      const isVertical = x1 === x2;
      const isHorizontal = y1 === y2;
      if (isHorizontal) {
        const [xmin, xmax] = [Math.min(x1, x2), Math.max(x1, x2)];
        obj.xs.push([y1, xmin, xmax]);
        obj.h[y1] = obj.h[y1] || [];
        obj.h[y1].push([xmin, xmax]);
      }
      if (isVertical) {
        const [ymin, ymax] = [Math.min(y1, y2), Math.max(y1, y2)];
        obj.ys.push([x1, ymin, ymax]);
        obj.v[x1] = obj.v[x1] || [];
        obj.v[x1].push([ymin, ymax]);
      }
      return obj;
    },
    { xs: [], ys: [], h: {}, v: {} }
  );

  const intersections = new Set();
  for (let [y, fromX, toX] of xs) {
    for (let [x, fromY, toY] of ys) {
      if (x <= toX && x >= fromX && y <= toY && y >= fromY)
        intersections.add(`${x},${y}`);
    }
  }
  const getIntersections = (xs) => {
    const res = [];
    for (let i = 0; i < xs.length; i++) {
      const [min1, max1] = xs[i];
      for (let j = i + 1; j < xs.length; j++) {
        const [min2, max2] = xs[j];
        for (let jj = min2; jj <= max2; jj++) {
          if (jj >= min1 && jj <= max1) {
            res.push(jj);
          }
        }
      }
    }
    return res;
  };
  for (let [y, lines] of Object.entries(h)) {
    for (let x of getIntersections(lines)) {
      intersections.add(`${x},${y}`);
    }
  }
  for (let [x, lines] of Object.entries(v)) {
    for (let y of getIntersections(lines)) {
      intersections.add(`${x},${y}`);
    }
  }

  return intersections.size;
};

process.stdin.setEncoding("utf8");
process.stdin.on("readable", () => {
  const s = process.stdin
    .read()
    ?.split("\n")
    .map((line) =>
      line.split(" -> ").map((z) => z.split(",").map((x) => parseInt(x)))
    );
  if (s) {
    console.log(compute(s));
  }
});
