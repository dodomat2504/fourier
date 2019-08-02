let radius = 200;
let time = 0;
let x = 0;
let y = 0;
let points = [];
let nslider;
let speedslider;
let checkbox;

function setup() {
	createCanvas(1800, 800);
	textSize(20);
	checkbox = createCheckbox('', false);
	checkbox.position(10, 810);
	nslider = createSlider(1,200,1);
	nslider.position(10, 840);
	speedslider = createSlider(0,5,1,0.1);
	speedslider.position(10, 870);
}

function draw() {
	background(210);
	fill(0);
	
	let speed = speedslider.value();
	let r = radius;
	let oldx = 0;
	let oldy = 0;
	let fact = 0;
	let n = nslider.value();
	
	text('line', checkbox.x + 15, checkbox.y-95);
	text('circles (' + n + ')', nslider.x + nslider.width + 15, nslider.y-95);
	text('speed (x' + speedslider.value() + ')', speedslider.x + speedslider.width + 15, speedslider.y-95);
	
	noFill();
	angleMode(DEGREES);
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
			if (checkbox.checked()) {
				line(x,y,400,y);
			}
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
	
	time+=speed;
}
