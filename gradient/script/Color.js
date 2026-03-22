class Color
{
    red;
    green;
    blue;

    constructor(red, green, blue)
    {

        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    /*
    returns the red value of a color in hex notation passed as a string
    EX: stringToRed("#abcdef") = 171
    */
    static stringToRed(color){
        return Number("0x" + color.slice(1, 3));
    }

    /*
    returns the green value of a color in hex notation passed as a string
    EX: stringToGreen("#abcdef") = 205
    */
    static stringToGreen(color){
        return Number("0x" + color.slice(3, 5));
    }

    /*
    returns the blue value of a color in hex notation passed as a string
    EX: stringToBlue("#abcdef") = 239
    */
    static stringToBlue(color){
        return Number("0x" + color.slice(5));
    }

    asString(){
        return "rgb("+this.red+", "+this.green+", "+this.blue+")";
    }

    asHexCode(){
        return "#000000";
    }

   value(){
    return 0;
   }

   hue(){
    return 0;
   }

   luminance(){
    return 0;
   }

   saturation(){
    return 0;
   }
   lightness(){
    return 0;
   }

    
}