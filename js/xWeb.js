/*
 * xWeb (v1.0) by EvolSoft
 * Developer: EvolSoft
 * Website: http://www.evolsoft.tk
 * Date: 08/03/2015 07:56 PM (UTC)
 * Copyright & License: (C) 2015 EvolSoft
 * Licensed under MIT (https://github.com/EvolSoft/xWeb/blob/master/LICENSE)
 */
 
//**** Alerts ****//

$(document).on("click", ".close", function() {
	if($(this).parent().hasClass("alert")){
		$(this).parent().remove();
	}
});

//**** Modals ****//

/**
 * Toggles a modal
 * 
 * @param target The target modal
 */
function toggleModal(target) {
    $(target).toggleClass("modal-open");
}

$(document).on("click", ".modal", function() {
    if($(this).attr("static") == "true" || typeof $(this).attr("static") === typeof undefined){
	    $(this).removeClass("modal-open");
	}
});
