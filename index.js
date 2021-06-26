const wayOut = (maze) => {
  let allWay = []    
  let passedPoitns = [] 
  let exit = false;
  const xLineLengh = maze[0].length - 1;
  const yLineLengh = maze.length - 1;

  let exits = [];
  for (let i = 0; i <= xLineLengh; i++) {
    if (maze[0][i] === '+') {
      exits.push({x: i, y: 0})
    }
  }
  for (let i = 0; i <= xLineLengh; i++) {
    if (maze[yLineLengh][i] === '+') {
      exits.push({x: i, y: yLineLengh})
    }
  }
  for (let i = 0; i <= yLineLengh; i++) {
    if (maze[i][0] === '+') {
      exits.push({x: 0, y: i})
    }
  }
  for (let i = 0; i <= yLineLengh; i++) {
    if (maze[i][xLineLengh] === '+') {
      exits.push({x: xLineLengh, y: i})
    }
  }

  if (!exits.length) {
    alert('There is no way out')
    return null
  }

  const nextCellTest = (x, y, way) => {
    if (exit) return false;
    if (way.length > 1) {
      for (let i = 0; i < passedPoitns.length; i++) {
        if (passedPoitns[i].x === x && passedPoitns[i].y === y) return false
      }
    }
    if (!maze[y] || !maze[y][x]) return false;
    if (maze[y][x] === '#') return false
    if (maze[y][x] === '+' || maze[y][x] === '0') return true
  }

  const mole = (point, way, directions, course) => {
    const x = point.x;
    const y = point.y;
    if (way.length > 0) {
      if (maze[y][x] === '0') {
        way.push(course);
          if (allWay.length === 0) {
            allWay = way;
          } else {
            allWay = allWay.length > way.length ? way : allWay
          };
        exit = true;
        return allWay;
      }
    };

    way.push(course);
    passedPoitns.push(point);

    const getCourse = (x, y) => {
      if (x === 0 && y === -1) return 'bottom'
      if (x === 1 && y === 0) return 'left'
      if (x === 0 && y === 1) return 'top'
      if (x === -1 && y === 0) return 'right'
    }
    if (nextCellTest(x + directions[0], y + directions[1], way)) {
      const nextPoint = {x: x + directions[0], y: y + directions[1]}

      mole(nextPoint, [...way], directions, getCourse(directions[0], directions[1]))
    }
    if (nextCellTest(x + directions[2], y + directions[3], way)) {
      const nextPoint = {x: x + directions[2], y: y + directions[3]}
      mole(nextPoint, [...way], directions, getCourse(directions[2], directions[3]))
    }
    if (nextCellTest(x + directions[4], y + directions[5], way)) {
      const nextPoint = {x: x + directions[4], y: y + directions[5]}
      mole(nextPoint, [...way], directions, getCourse(directions[4], directions[5]))
    }
    if (nextCellTest(x + directions[6], y + directions[7], way)) {
      const nextPoint = {x: x + directions[6], y: y + directions[7]}
      mole(nextPoint, [...way], directions, getCourse(directions[6], directions[7]))
    }
  }
  for (let i = 0; i < exits.length; i++) {
    let start = exits[i];
    passedPoitns = [];
    exit = false;
    mole(start, [], [0, -1, 1, 0, 0, 1, -1, 0], 'exit');
    passedPoitns = [];
    exit = false;
    mole(start, [], [1, 0, 0, 1, -1, 0, 0, -1], 'exit');
    passedPoitns = [];
    exit = false;
    mole(start, [], [0, 1, -1, 0, 0, -1, 1, 0], 'exit');
    passedPoitns = [];
    exit = false;
    mole(start, [], [-1, 0, 0, -1, 1, 0, 0, 1], 'exit');
  }  
  return allWay ? allWay.splice(1, allWay.length).reverse() : 'There is no way out';
}

const maze = [ 
  ['#','#','#','#','#','#','#','#','#'],
  ['#','+','+','+','#','+','+','+','#'],
  ['#','+','#','+','#','+','#','+','#'],
  ['+','+','#','+','0','+','#','+','#'],
  ['#','#','#','+','#','#','#','#','+'],
  ['#','#','+','+','#','#','#','#','#'],
  ['#','#','+','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#','#','#'],
];

console.log(wayOut(maze))