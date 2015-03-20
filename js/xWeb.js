/*
 * xWeb (v1.0) by EvolSoft
 * Developer: EvolSoft
 * Website: http://www.evolsoft.tk
 * Date: 20/03/2015 12:30 AM (UTC)
 * Copyright & License: (C) 2015 EvolSoft
 * Licensed under MIT (https://github.com/EvolSoft/xWeb/blob/master/LICENSE)
 */
 
//**** Alerts ****//

$(document).on("click", ".close", function() {
	if($(this).parent().hasClass("alert")){
		$(this).parent().remove();
	}
});

//**** Menus ****//

$(document).on("mousedown", function() {
	if($(event.target).parent().hasClass("open") && $(event.target).parent().hasClass("menu-group")){
		$(".menu-group").removeClass("open"); //Closes all other menus
	}else if($(event.target).parent().hasClass("menu-group") && $(event.target).attr("openmenu") == ""){
		$(".menu-group").removeClass("open"); //Closes all other menus
		$(event.target).parent().toggleClass("open");
	}else{ //Close all opened menus
		$(".menu-group").removeClass("open"); //Closes all other menus
	}
});

//**** Modals ****//

/**
 * Toggles a modal
 * 
 * @param target The target modal
 */
function toggleModal(target) {
	if($(target).hasClass("modal")){
	    $(target).toggleClass("modal-open");
	}
}

$(document).on("click", ".close", function() {
	if($(this).parent().parent().hasClass("modal")){ //.modal > .modal-window > .close
		$(this).parent().parent().removeClass("modal-open");
	}
});

$(document).on("click", ".modal-background", function() {
	if($(this).parent().hasClass("modal")){ //.modal > .modal-background
	    if($(this).parent().attr("static") == "false" || typeof $(this).parent().attr("static") === typeof undefined){
		    $(this).parent().removeClass("modal-open");
		}
	}
});
