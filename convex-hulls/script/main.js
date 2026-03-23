let canvas = document.getElementById("screen");

let ctx = canvas.getContext("2d");

let writeSlopes = false;

let points = [
    { x: 1, y: 7 },
    { x: 2, y: 7 },
    { x: 3, y: 8 },
    { x: 4, y: 10 },
    { x: 5, y: 14 },
    { x: 6, y: 11 },
    { x: 7, y: 1 },
    { x: 8, y: 6 },
    { x: 9, y: 13 },
    { x: 10, y: 9 },
    { x: 11, y: 4 },
    { x: 12, y: 1 },
    { x: 13, y: 11 },
    { x: 14, y: 4 }
];

let draw_line = function(p1, p2){
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke();
}

let drawGrid = function(){
    let step = canvas.width/15;
    
    ctx.save();
    ctx.strokeStyle = "#bbbbdd";
    for(let i = step; i < canvas.width; i+=step){
        draw_line({x:i, y:0},{x:i, y:canvas.height});
        draw_line({x:0, y:i},{x:canvas.width, y:i});
    }
    ctx.restore();
}

let drawCicrcle = function(center, radius, color)
{
    ctx.save();

    ctx.fillStyle = "#333333";
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}

let generatePoints = function(num){
    let points = [];
    let seenX = new Set();
    let i = 0;

    while (i < num) {
        let x = 1 + Math.floor(Math.random() * 14);
        let y = 1 + Math.floor(Math.random() * 14);
        
        // Check if we have already used this exact X coordinate
        if (!seenX.has(x)) {
            seenX.add(x); // Mark this X as used
            points.push({ x: x, y: y });
            i++;
        }
    }

    return points;
}

let drawPoints = function(points){
    let step = canvas.width/15; 
     for (let i = 0; i < points.length; i++)
        {
            drawCicrcle({x:step*points[i].x , y:canvas.height - step*points[i].y}, 4, "black");
        }
}

let pointToLineDual = function(p){
    return {m: p.x, q:-(p.y)}
}

let orient = function(p1, p2, p3){
    return determinant3x3([[1, 1, 1], [p1.x, p2.x, p3.x], [p1.y, p2.y, p3.y]]);
}

//hell yeah
let determinant3x3 = function(m){
    return  + (m[0][0] * m[1][1] * m[2][2])
            + (m[0][1] * m[1][2] * m[2][0])
            + (m[0][2] * m[1][0] * m[2][1])
            - (m[0][0] * m[1][2] * m[2][1])
            - (m[0][2] * m[1][1] * m[2][0])
            - (m[0][1] * m[1][0] * m[2][2]);
}

let grahamUpperHull = function(points){
    let stack = [points[0], points[1]];

    for (let i = 2; i < points.length; i++){
        while(stack.length >= 2 && orient(points[i], stack[stack.length-1], stack[stack.length-2]) <= 0){
            stack.pop();
        }
        stack.push(points[i]);
    }

    return stack;
}

let grahamLowerHull = function(points){
    let stack = [points[points.length-1], points[points.length-2]];

    for (let i = points.length - 3; i >= 0; i--){
        while(stack.length >= 2 && orient(points[i], stack[stack.length-1], stack[stack.length-2]) <= 0){
            stack.pop();
        }
        stack.push(points[i]);
    }

    return stack.slice(1, stack.length-1);
}

let grahamConvexHull = function(points){
    points.sort((a, b) => a.x - b.x);   
    return grahamLowerHull(points).concat(grahamUpperHull(points));
}

let pointTimesScalar = function(p, l){
    return {x : l*p.x, y: canvas.width - (l * p.y)};
}


let drawPolygon = function(poly){
    let step = canvas.width / 15;
    for (let i = 1; i < poly.length; i++){
        draw_line(pointTimesScalar(poly[i-1], step), pointTimesScalar(poly[i], step));
    }
    draw_line(pointTimesScalar(poly[poly.length-1], step), pointTimesScalar(poly[0], step));
}

let run = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = document.getElementById("linecolor").value;
    drawGrid();
    drawPoints(points);
    let tmp = grahamConvexHull(points);

    console.log(tmp);
    drawPolygon(tmp);
}

let generateAndRun = function(){
    points = generatePoints(document.getElementById("points").value)
    run();
}

document.getElementById("run").onclick = generateAndRun;

run();