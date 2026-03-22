let canvas = document.getElementById("screen");
//let mask_canvas = document.getElementById("mask");

let ctx = canvas.getContext("2d");
//let mask_ctx = mask_canvas.getContext("2d");

//let mask_src = "img/europe_mask.png";

let  colors = [
"#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#800000","#008000","#000080","#808000",
"#800080","#008080","#C0C0C0","#808080","#9999FF","#993366","#FFFFCC","#CCFFFF","#660066","#FF8080",
"#0066CC","#CCCCFF","#000033","#330000","#333300","#003333","#663300","#336600","#663399","#999966",
"#FFCC99","#CCFF99","#99FFCC","#99CCFF","#CC99FF","#FF99CC","#660000","#006600","#000066","#666600",
"#660066","#006666","#FF6633","#FF3366","#33FF66","#66FF33","#3366FF","#6633FF","#FFCC00","#CCFF00",
"#00FFCC","#00CCFF","#CC00FF","#FF00CC","#330033","#003333","#333300","#330066","#660033","#033366",
"#663300","#336633","#666633","#336666","#663366","#996633","#339966","#993399","#669999","#996699",
"#CC6666","#66CC66","#6666CC","#CC66CC","#66CCCC","#CCCC66","#FF9999","#99FF99","#9999FF","#FF99FF",
"#99FFFF","#FFFF99","#CC3333","#33CC33","#3333CC","#CC33CC","#33CCCC","#CCCC33","#FF6600","#FF0066",
"#00FF66","#0066FF","#6600FF","#FF0066","#3300FF","#00FF33","#FF3300","#3300CC","#00CC33","#CC0033",
"#0033CC","#CC3300","#33CC00","#0033CC","#CC0033","#0F0F0F","#F0F0F0","#123456","#654321","#ABCDEF"
];

let randx = function()
{
    return Math.floor(Math.random() * canvas.clientWidth);
}

let randy = function()
{
    return Math.floor(Math.random() * canvas.clientHeight);
}

let points = [];

let generateSeeds = function(num)
{
    for (let i = 0; i < num; i++)
    {
        points[i] = {x:randx(), y:randy(), col: colors[i]};
    }
}

let mask = function(p)
{
    let ok = false;
    let rgba = mask_ctx.getImageData(p.x, p.y, 1, 1).data;
    console.log(rgba);
    for(let i = 0; i < 4 && ok; i++){
        ok = rgba[i] == 0;
    }

    return ok;
}

let drawCicrcle = function(center, radius, color)
{
    ctx.save();

    ctx.strokeStyle = "black";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.restore();
}

let distance = function(p1, p2)
{
    return Math.sqrt(Math.pow(Math.abs((p1.x - p2.x)), 2) +  Math.pow(Math.abs((p1.y- p2.y)), 2));
}

let nearestPoint = function (p)
{
    let minDistance = distance(p, points[0]);
    let minIndex = 0;

    for (let i = 1; i < points.length; i++)
    {
        let tmp = distance(p,  points[i]);
        if(tmp < minDistance)
        {
            minIndex = i;
            minDistance = tmp;
        }
    }

    return points[minIndex];
}

let main = function()
{
    /*
    let mask_img = new Image(500, 500);
    mask_img.src = mask_src;
    mask_img.onload = function()
    {
        mask_ctx.drawImage(mask_img, 0, 0);
    }
    */

    generateSeeds(100);

        for (let x = 0; x < canvas.clientWidth; x++)
        {
            for (let y = 0; y < canvas.clientHeight; y++)
            {
                //ctx.fillStyle = y % 2 ? nearestPoint({x: x, y : y}).col : "white";
                ctx.fillStyle = nearestPoint({x:x, y:y}).col;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        for (let i = 0; i < points.length; i++)
        {
            drawCicrcle(points[i], 5, "black");
        }
}

main();