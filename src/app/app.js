

function randBetween(low, high, tightness=2) {
    let sum = 0
    for (i=0;i<tightness;i++) {
        sum += Math.random()
    }
    sum /= tightness
    return Math.floor(sum*(high-low+1)+low)
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

const setAttributeList = (element, props) => {
    Object.entries(props).forEach(([key,value]) => {
        element.setAttributeNS(null, key, value);
    })
}

class Maze {
    constructor(size, svg) {
        this.height=size;
        this.width=size;
        this.svg=svg;
        this.maxdepth=0;
        [this.rows, this.cols] = this.createEmpty();
        this.lineOrder = {}
    }

    createEmpty() {
        let rows = [];
        let cols = [];
        for (let i = 0; i<this.height;i++) {
            let row = [];
            let colrow = [];
                for (let j=0; j<this.width;j++) {
                    if (i == 0 || i == this.height - 1) {
                        row.push(1)
                    } else {
                        row.push(0)
                    }
                    if (j == 0 || j == this.width - 1) {
                        colrow.push(1)
                    } else {
                        colrow.push(0)
                    }
                }
                rows.push(row)
                cols.push(colrow)
        }
        return [rows, cols];
    }

    drawRow(idx, start, end, depth, direction=0) {
        let gap = 100/(this.width-1);
        let len = (end-start)*gap
        for (let i = start; i < end; i++) {
            this.rows[idx][i] = 1
        }
        if (!this.lineOrder[depth]) {
            this.lineOrder[depth] = []
        }
        if (start != end) {
        if (!direction) {
            this.lineOrder[depth].push([`M${start*gap} ${idx*gap}L${end*gap} ${idx*gap}Z`, len])
        } else {
            this.lineOrder[depth].push([`M${end*gap} ${idx*gap}L${start*gap} ${idx*gap}Z`, len])
        }
    }   
    }

    drawCol(idx, start, end, depth, direction=0) {
        let gap = 100/(this.width-1);
        let len = (end-start)*gap
        for (let i = start; i < end; i++) {
            this.cols[i][idx] = 1
        }
        if (!this.lineOrder[depth]) { 
            this.lineOrder[depth] = []
        }
        if (start != end) {
        if (!direction) {
            this.lineOrder[depth].push([`M${idx*gap} ${start*gap}L${idx*gap} ${end*gap}Z`, len])
        } else {
            this.lineOrder[depth].push([`M${idx*gap} ${end*gap}L${idx*gap} ${start*gap}Z`, len])
        }
    }   
    }

    drawLines(depth) {
        for (let j=0;j<this.lineOrder[depth].length;j++) {
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            setAttributeList(line, {
                d: this.lineOrder[depth][j][0],
                class: "lines",
                opacity: `${Math.trunc(50-(depth/this.maxdepth)*49)/100}`,
                pathLength: "1"
            })
            this.svg.appendChild(line);
        }
        // addEndpoints(this, gap)
        // console.log(`total lines: ${total}`)
    }
}

function addEndpoints(maze, gap) {
    let start = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    setAttributeList(start, {
        cx: gap/2,
        cy: gap/2,
        r: gap/5,
        stroke: "black",
        fill: "#00000000"
    });
    let goal = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    setAttributeList(goal, {
        cx: (maze.width-1.5) * gap,
        cy: (maze.height-1.5) * gap,
        r: gap/5,
        stroke: "black"
    });
    maze.svg.appendChild(goal);
    maze.svg.appendChild(start);
}


function generate(maze, top, bottom, left, right, depth, polarity=1) {
    // polarity: 1 => horizontal, polarity: 0 => vertical

    // if (depth >= 15) {
    //     return
    // }
    if (depth > maze.maxdepth) {
        maze.maxdepth = depth
    }
    if (polarity) {
        if (right-left <= 1) {
            return
        } else {
            let rank = randBetween(left+1, right-1)
            gap = randBetween(top, bottom-1);
            maze.drawCol(rank, top, gap, depth, direction=0);
            maze.drawCol(rank, gap+1, bottom, depth, direction=1);
            generate(maze, top, bottom, left, rank, depth+1, !polarity,);
            generate(maze, top, bottom, rank, right, depth+1, !polarity);
        }
        
    } else {
        if (bottom - top <= 1 || right - left <= 1) {
            if (depth > maze.maxdepth) {
                maze.maxdepth = depth;
            }
            return
        } else {
            let rank = randBetween(top+1, bottom-1);
            gap = randBetween(left, right-1);
            maze.drawRow(rank, left, gap, depth, direction=0);
            maze.drawRow(rank, gap+1, right, depth, direction=1);
            generate(maze, top, rank, left, right, depth+1, !polarity);
            generate(maze, rank, bottom, left, right, depth+1, !polarity);
            
        }
    }
}


var a = new Maze(20, document.getElementById("maze"));
generate(a, 0, a.height-1, 0, a.width-1, 0);
console.log(a.lineOrder)

async function render(maze) {
    for (i=0;i<maze.maxdepth;i++) {
        maze.drawLines(i);
        await delay(600);
    }
}

render(a)

console.log(`maximum recursion depth: ${a.maxdepth}`)

