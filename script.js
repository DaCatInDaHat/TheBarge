const stages = document.querySelector("#stages");
const loadCount = document.querySelector("#load-count");
const prepareBargeBtn = document.querySelector("#prepare");
const loadGrainBtn = document.querySelector("#load");
const shipYard = document.querySelector("#shipyard");
const columns = shipYard.children;

let levels = [];
let cells = [];

function createLevel(column, dotclass, color) {
    const level = document.createElement("div");
    level.setAttribute("class", dotclass);
    level.style.backgroundColor = color;
    column.appendChild(level);
}

function isHole(array2d, x, y) {
    let resultRight = false;
    let resultLeft = false;

    for (let j = x; j >= 0; j--) {
        if (array2d[j][y] !== undefined) {
            resultLeft = true;
        }
    }

    for (let i = x; i < array2d.length; i++) {
        if (array2d[i][y] !== undefined) {
            resultRight = true;
        }
    }

    if (resultLeft === true && resultRight === true) {
        return true;
    }
    else return false;
}

function prepareBarge() {
    levels = Array(10).fill(null).map(() => Math.floor(Math.random() * 11));

    for (let i = 0; i < levels.length; i++) {
        createLevel(shipYard, "column", "inherit");
        for (let n = 0; n < levels[i]; n++) {
            createLevel(columns[i], "cell", "blue");
        }
    }

    stages.innerHTML = levels.toString();
    prepareBargeBtn.disabled = true;
}

function loadGrain() {
    let result = 0;
    let levels2d = levels.map(row => new Array(row).fill(1));
    let levelMaxLength = Math.max(...levels);

    for (let x = 0; x < levels2d.length; x++) {
        let level = levels2d[x];
        for (let y = 0; y < levelMaxLength; y++) {
            let cell = level[y];
            if (cell === undefined) {
                if (isHole(levels2d, x, y)) {
                    result++;
                    createLevel(columns[x], "cell", "yellow");
                }
            }
        }
    }

    loadCount.innerHTML = result.toString();
    loadGrainBtn.disabled = true;
}

prepareBargeBtn.onclick = prepareBarge;
loadGrainBtn.onclick = loadGrain;