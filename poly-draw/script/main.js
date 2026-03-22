let main = function(){
	let canva = document.getElementById("screen");	
	setup_screen(canva, canva.width, canva.height);
}

let setup_buttons = function(){
	document.getElementById("draw").setAttribute("onclick", "change_color();draw_polygon(document.getElementById('sides').value, document.getElementById('radius').value, deg_to_rad(document.getElementById('angle').value));");
	document.getElementById("clear").setAttribute("onclick", "main()");
}

setup_buttons();
main();
