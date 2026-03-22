let maxx = 0;
let minx = 0;
let maxy = 0;
let miny = 0;

let ctx = null;

let colors = [
	"#ff0000",
	"#00ff00",
	"#0000ff",
	"#ffff00",
	"#00ffff",
	"#ff00ff",	
];
let current_color = 0;

let change_color = function(){
	ctx.strokeStyle = colors[current_color];
	current_color = (current_color + 1) % colors.length;
}

let screen_to_canvas_x = function(x){
	return x - minx;
}

let screen_to_canvas_y = function(y){
	return y - miny;
}

let deg_to_rad = function(theta){
	return theta * Math.PI / 180;
}

let is_point_in_range = function(x, y){
	return x<=maxx && x>=minx && y<=maxy && y>=miny;
}

let draw_line = function(x1, y1, x2, y2){
	if(is_point_in_range(x1, y1) && is_point_in_range(x2, y2)){
		ctx.beginPath();
		ctx.moveTo(screen_to_canvas_x(x1), screen_to_canvas_y(y1));
		ctx.lineTo(screen_to_canvas_x(x2), screen_to_canvas_y(y2));
		ctx.stroke();
	}
	else
	console.log("one or more points is out of range");
}

let draw_axis = function(){
	ctx.strokeStyle = "#ededed";
	draw_line(minx, 0, maxx, 0);
	draw_line(0, miny, 0, maxy);
}

let setup_screen = function(canvas, csizex, csizey){
	ctx = canvas.getContext("2d");
	maxx = csizex / 2;
	minx = -maxx;
	if(csizex % 2){
		maxx = Math.floor(maxx);
		minx = - maxx - 1;
	}
	
	maxy = csizey / 2;
	miny = -maxy;
	if(csizey % 2){
		maxy = Math.floor(maxy);
		miny = - maxy - 1;
	}
	
	ctx.clearRect(0, 0, csizex, csizey);
	ctx.lineWidth = 2;
	current_color = 0;
	draw_axis();
	
	console.log("set up cartesian coordinate screen of size " + csizex + ", " + csizey);
}

let draw_polygon = function(sides, radius, angle){
	if(sides > 2 && sides < 101){
		let step = (2 * Math.PI) / sides;
		for(let i = 1; i < sides; i ++){
			draw_line(polar_to_cart_x(radius, angle + step * (i-1)), polar_to_cart_y(radius, angle + step * (i-1)), polar_to_cart_x(radius, angle + step * (i)), polar_to_cart_y(radius, angle + step * (i)));
		}
		draw_line(polar_to_cart_x(radius, angle + step * (sides-1)), polar_to_cart_y(radius, angle + step * (sides-1)), polar_to_cart_x(radius, angle), polar_to_cart_y(radius, angle));
	}
	else
		console.log("sides must be between 2 and 100 (included)");
}

