let s;

function setup() {
    let canvas = createCanvas(500, 400);
    canvas.parent("p5-canvas-container");
    s = new stuff(width / 2, height / 2, random(30, 50));
}

function draw() {
    background(220);

}

class stuff {
    constructor(u, v, r) {
        this.x = u;
        this.y = v;
        this.size = r;
    }
    show() {
        fill(0);
        circle(this.x, this.y, this.dia);

    }
}