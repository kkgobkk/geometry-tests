let  i = 0;
let box = document.getElementById("colorbox");
let g;
let steps;
let dir = 1;

let updateColor = function()
{
    i += dir;
    if (i == steps || i == 0){
        dir = -dir;
    }
    let newcolor = g.getColorAtPoint(i/steps);
    box.style.background = newcolor.asString(); 
}

let main = function()
{
    
    let color1 = document.getElementById("startcolor").value;
    color1 =  new Color(Color.stringToRed(color1), Color.stringToGreen(color1), Color.stringToBlue(color1));

    let color2 = document.getElementById("endcolor").value;
    color2 =  new Color(Color.stringToRed(color2), Color.stringToGreen(color2), Color.stringToBlue(color2));

    g = new Gradient(color1, color2);
    steps = document.getElementById("steps").value;

    setInterval(updateColor, 30);
}
