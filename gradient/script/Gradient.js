class Gradient
{
    color1;
    color2;

    constructor(color1, color2)
    {
        this.color1 = color1;
        this.color2 = color2;
    }

    getColorAtPoint(point){
        return new Color(
            Math.round(point * this.color1.red + (1-point) * this.color2.red),
            Math.round(point * this.color1.green + (1-point) * this.color2.green),
            Math.round(point * this.color1.blue + (1-point) * this.color2.blue)
        )
    }
    
}