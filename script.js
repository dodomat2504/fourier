let paint_y = [];
let path = [];
let inputy = [];
let inputx = [];
let speed = 1;
let speedslider;
let WINDOW_SIZE;

function setup() { // p5 func
  WINDOW_SIZE = windowHeight < windowWidth ? windowHeight - 50 : windowWidth - 50;
  createCanvas(WINDOW_SIZE, WINDOW_SIZE);

  speedslider = createSlider(0.5, 10, 1, 0.5);
  speedslider.position(0, WINDOW_SIZE + 10);
  for (let i = 0; i < 200; i++) {
    inputy.push(Math.random()*200 - 100);
    inputx.push(Math.random()*200 - 100);
  }
  paint_y = dft(inputy);

  // drawing.sort((a, b) => b.amp - a.amp);
}

let time = 0;

function epicycles(xOff, yOff, phaseOff, dataset) {
  const N = dataset.length;
  let prevx = xOff, prevy = yOff;
  stroke(255);
  strokeWeight(5);
  point(xOff, yOff);
  for (let k = 0; k < N; k++) {
    const amp = dataset[k].amp;
    const freq = dataset[k].freq;
    const phase = dataset[k].phase;

    const x = amp * cos(freq * time * TWO_PI + phase + phaseOff);
    const y = amp * sin(freq * time * TWO_PI + phase + phaseOff);
  
    stroke(255);
    strokeWeight(0.25);
    noFill();
    ellipse(prevx, prevy, 2*amp);
    strokeWeight(0.5);
    line(prevx, prevy, prevx + x, prevy + y);

    prevx += x;
    prevy += y;

    if (k === N-1) {
      return createVector(prevx, prevy);
    }
	}
}

function draw() { // p5 func
  background(0);
  frameRate(60);

  speed = speedslider.value();

  const vector_y = epicycles(100, WINDOW_SIZE / 2 + 50, HALF_PI, paint_y);
  const vector_x = epicycles(WINDOW_SIZE / 2 + 50, 100, 0, dft(inputx));
  const final_vector = createVector(vector_x.x, vector_y.y);

  path.unshift(final_vector);

  line(vector_y.x, vector_y.y, final_vector.x, final_vector.y);
  line(vector_x.x, vector_x.y, final_vector.x, final_vector.y);

  // draw Path
  push();
  stroke("rgba(0, 255, 0, 0.4)");
  strokeWeight(3);

  beginShape();
	for (let i = 0; i < path.length; i++) {
		vertex(path[i].x, path[i].y);
	}
	endShape();

  pop();

  const dt = TWO_PI / paint_y.length;
  time += dt * speed * 0.001;

  if (path.length >= 10000) {
    path.pop();
  }
  
  /*
  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
  */
}
