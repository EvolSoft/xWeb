/*
 * xWeb (v1.0) by EvolSoft
 * Developer: EvolSoft
 * Website: http://www.evolsoft.tk
 * Date: 29/03/2015 06:01 PM (UTC)
 * Copyright & License: (C) 2015 EvolSoft
 * Licensed under MIT (https://github.com/EvolSoft/xWeb/blob/master/LICENSE)
 */

//**** xWeb Core ****//

/** @var string XWEB_VERSION **/
var XWEB_VERSION = "1.0";

/**
 * Changes the Webpage title
 * 
 * @param title The new title
 */
function changeTitle(title){
	if(checkElement("title")){
		$("title").text(title);
	}else{
		$("head").append("<title>" + title + "</title>");
	}
}

/**
 * Checks if a element exists
 * 
 * @param element The element tag, class, name or id to check
 * 
 * @return int
 */
function checkElement(element){
	return $(element).length;
}

/**
 * Get xWeb version
 * 
 * @return string xWebVersion
 */
function getVersion(){
	return XWEB_VERSION;
}

/**
 * px to int
 * 
 * @param px px
 * 
 * @return int
 */
function pxtoint(px){
	return px.replace("px", "");
}

//**** Alerts ****//

$(document).on("click", ".close", function() {
	if($(this).parent().hasClass("alert")){
		$(this).parent().trigger("alert.close");
		$(this).parent().remove();
	}
});

$(document).on("click", "[alert-close]", function() {
	if($(this).parent().hasClass("alert")){
		$(this).parent().trigger("alert.close");
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
	    if($(target).hasClass("modal-open")){ //Modal opened
	    	$(target).trigger("modal.open");
	    }else{ //Modal closed
	    	$(target).trigger("modal.close");
	    }
	}
}

$(document).on("click", ".close", function() {
	if($(this).parent().parent().hasClass("modal")){ //.modal > .modal-window > .close
		$(this).parent().parent().trigger("modal.close");
		$(this).parent().parent().removeClass("modal-open");
	}
});

$(document).on("click", ".modal-background", function() {
	if($(this).parent().hasClass("modal")){ //.modal > .modal-background
	    if($(this).parent().attr("static") == "false" || typeof $(this).parent().attr("static") === typeof undefined){
			$(this).parent().trigger("modal.close");
	    	$(this).parent().removeClass("modal-open");
		}
	}
});

//**** Navbar ****//

$(document).on("click", ".navbar-toggle", function(){
	if($(this).parent().hasClass("navbar")){ //.navbar > .navbar-toggle
		$(this).parent().find(".navbar-links").toggleClass("open");
	}
});

//**** Sliders ****//

/** @var bool click **/
var click = false;
/** @var current **/
var current = null;
/** @var int pos **/
var pos = 0;

$(document).on("mousedown", function() {
	click = true;
	current = event.target;
});

$(document).on("mouseup", function() {
	click = false;
	current = null;
});

$(document).on("mousemove", function(e) {
	if(click && current != null && $(current).attr("class") == "slider-handle"){
		fixedpos = e.pageX - $(current).parent().offset().left;
		percent = Math.round(((fixedpos * 100) / pxtoint($(current).parent().css("width"))));
		if(e.pageX > pos){ //Check mouse direction
			if(fixedpos >= 0 && fixedpos <= $(current).parent().width()){
				$(current).css("left",  + percent + "%");
				$(current).parent().find(".slider-progress").css("width", percent + 1 + "%");
				$(current).parent().trigger("slider.change");
			}
		}else{
			if(fixedpos >= 0 && fixedpos <= $(current).parent().width()){
				$(current).css("left",  + percent + "%");
				$(current).parent().find(".slider-progress").css("width", percent + 1 + "%");
				$(current).parent().trigger("slider.change");
			}
		}
	}
	pos = e.pageX;
});

/**
 * Get range slider value
 * 
 * @param r_slider the range slider
 *
 * @return int|null range slider value in percentage or null if the element isn't a range slider
 */
function getRSliderVal(r_slider){
	if($(r_slider).hasClass("slider")){
		percentage = percent = Math.round(((pxtoint($(r_slider).find(".slider-handle").css("left")) * 100) / pxtoint($(r_slider).css("width"))));
		return percentage;
	}else{
		return null;
	}
}

//**** Tabs ****//

$(document).on("click", "a", function(){
	if($(this).parent().parent().hasClass("tabs")){ //ul.tabs > li > a
		$(this).parent().parent().find("li").removeClass("active"); //ul.tabs > li
		$(this).parent().addClass("active"); //ul.tabs > li
		$(this).parent().parent().parent().find(".tab-content").css("display", "none"); //Closes all tab-contents (div.tabs > ul.tabs > li > a)
		if($(this).parent().parent().parent().find("[tab-id=" + $(event.target).attr("open-tab") + "]").hasClass("tab-content")){
			$(this).parent().parent().parent().find("[tab-id=" + $(event.target).attr("open-tab") + "]").css("display", "block");
		}
	}
});
