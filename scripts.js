let radius = 200;
let time = 0;
let x = 0;
let y = 0;
let points = [];
let slider;

function setup() {
	createCanvas(1800, 800);
	slider = createSlider(1,100,1);
}

function draw() {
	background(210);
	noFill();
	
	angleMode(DEGREES);
	
	let n = slider.value();
	let r = radius;
	let oldx = 0;
	let oldy = 0;
	let fact = 0;
	
	translate(300, height/2);
	
	strokeWeight(15);
	point(0,0);
	strokeWeight(1);
	
	for (let i = 1; i <= n; i++) {
		fact = (4/((i*2-1)*PI));
		x = oldx + r/2*cos((i*2-1)*time) * fact;
		y = oldy + r/2*sin((i*2-1)*time) * fact;
		ellipse(oldx,oldy,r * fact);
		line(oldx,oldy,x,y);
		oldx = x;
		oldy = y;
		if (i === n) {
			points.unshift(y);
		}
	}
	
	push();
	translate(400, 0);
	strokeWeight(2);
	
	beginShape();
	for (let i = 0; i < points.length; i++) {
		let y = points[i];
		vertex(i,y);
	}
	endShape();
	
	if (points.length > 1000) {
		points.pop();
	}
	
	pop();
	
	time++;
}
