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

let binom = function(n, k){
    if(k < 0 || k > n){
        return 0
      }
    
      if(k === 0 || k === n){
        return 1
      }
    
      if(k === 1 || k === n - 1){
        return n
      }
    
      let res = n;
      for(let i = 2; i <= k; i++){
        res *= (n - i + 1) / i;
      }
    
      return Math.round(res);
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

let drawSlopes = function(points){
    let step = canvas.width/15;
    let arr = [];
    ctx.save();
    ctx.font = "10px monospace";
    ctx.lineWidth = 2;
    for(i = 0; i < points.length; i++){
        for(j = i+1; j < points.length; j++){
            ctx.strokeStyle = points[i].y <= points[j].y ? "red" : "blue";
            draw_line({x:step*points[i].x , y:canvas.height-step*points[i].y}, {x:step*points[j].x , y:canvas.height-step*points[j].y});
            let slopeAsString = "" + Math.round(100*((points[j].y - points[i].y)/(points[j].x - points[i].x)))/100;
            arr.push(slopeAsString);
            if(writeSlopes){
                let x = (points[i].x+points[j].x)/2*step;
                let y = canvas.height - (points[i].y+points[j].y)/2*step
                ctx.fillStyle = "RGBA(255, 255, 255, 0.7)";
                ctx.fillText(Array(slopeAsString.length + 2).join('█'), x, y);
                ctx.fillStyle = "#000000";
                ctx.fillText(slopeAsString, x, y);
            } 
        }
    }
    console.log(arr);
    ctx.restore();
}

let invCount = function(array, compare){
    let inv_left = 0;
    let inv_right = 0;
    let left = [];
    let right = [];

    if(array.length < 2){
        return {sorted:array, count:0};
    }

    let midpoint = Math.floor(array.length/2);
    left = array.slice(0, midpoint);
    right = array.slice(midpoint, array.length);

    let tmp = invCount(left, compare);
    left = tmp.sorted;
    inv_left = tmp.count;
    tmp = invCount(right, compare);
    right = tmp.sorted;
    inv_right = tmp.count;


    let i = 0, j = 0, inv = 0;
    array =[];

    while(i < left.length && j < right.length){
        if(compare(left[i], right[j]) <= 0){
            array.push(left[i++]);
        }
        else{
            array.push(right[j++]);
            inv += left.length - i;
        }
    }

    if(i < left.length){
        array.push.apply(array, left.slice(i, left.length));
    }
    if(j < right.length){
        array.push.apply(array, right.slice(j, right.length));
    }
    return {sorted:array, count: inv + inv_left + inv_right};
}

let pointToLineDual = function(p){
    return {m: p.x, q:-(p.y)}
}

let run = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    writeSlopes =  document.getElementById("writeSlopes").checked;

    drawGrid();
    points.sort((a, b) => a.x - b.x);
    drawSlopes(points);
    drawPoints(points);

    let total = document.getElementById("total").value = binom(points.length, 2);
    let tmp = invCount(points, (a, b) => a.y - b.y);
    document.getElementById("nonneg").value = total - tmp.count;
    points = tmp.sorted;

    let minx = document.getElementById("minimum").value;
    let maxx = document.getElementById("maximum").value;
    let lines = [];
    for(k in points){
        lines.push(pointToLineDual(points[k]));
    }
    lines.sort((a, b) => {
        let d =(a.m*minx+a.q) - (b.m*minx+b.q)
        if (d == 0) return a.m - b.m;
        else return d;
    });
    tmp = invCount(lines, (a, b) => {
        let d =(a.m*maxx+a.q) - (b.m*maxx+b.q)
        if (d == 0) return a.m - b.m;
        else return d;
    });
    document.getElementById("interval").value = tmp.count;
}

let generateAndRun = function(){
    points = generatePoints(document.getElementById("points").value)
    run();
}

document.getElementById("run").onclick = generateAndRun;

run();