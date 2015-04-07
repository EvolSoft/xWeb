/*
 * xWeb (v1.0) by EvolSoft
 * Developer: EvolSoft
 * Website: http://www.evolsoft.tk
 * Date: 07/04/2015 02:00 PM (UTC)
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

//**** Image Sliders ****//

$(document).on("click", ".image-slider-control-left", function(){
	parent = $(event.target).parent().find(".image-slider-images").children(".image-slider-item");
	activeParent = $(event.target).parent().find(".image-slider-images").children(".image-slider-item.active");
	if(activeParent.prev().length > 0){ //Check if previous element exists
		parent.removeClass("active");
		activeParent.prev().addClass("active");
		activeParent.css("margin-left", "0%");
		activeParent.prev().css("margin-left", "-100%");
		activeParent.animate({"margin-left" : "100%"}, 200);
		activeParent.prev().animate({"margin-left" : "0%"}, 200);
		$(event.target).parent().find(".image-slider-navigation").children("li").removeClass("active");
		$(event.target).parent().find(".image-slider-navigation").find("[img-id='" + activeParent.prev().attr("img-item") + "']").addClass("active");
	}else{
		parent.removeClass("active");
		parent.last().addClass("active");
		activeParent.css("margin-left", "0%");
		parent.last().css("margin-left", "-100%");
		activeParent.animate({"margin-left" : "100%"}, 200);
		parent.last().animate({"margin-left" : "0%"}, 200);
		$(event.target).parent().find(".image-slider-navigation").children("li").removeClass("active");
		$(event.target).parent().find(".image-slider-navigation").find("[img-id='" + parent.last().attr("img-item") + "']").addClass("active");
	}
});

$(document).on("click", ".image-slider-control-right", function(){
	parent = $(event.target).parent().find(".image-slider-images").children(".image-slider-item");
	activeParent = $(event.target).parent().find(".image-slider-images").children(".image-slider-item.active");
	if(activeParent.next().length > 0){ //Check if next element exists
		parent.removeClass("active");
		activeParent.next().addClass("active");
		activeParent.css("margin-left", "0%");
		activeParent.next().css("margin-left", "100%");
		activeParent.animate({"margin-left" : "-100%"}, 200);
		activeParent.next().animate({"margin-left" : "0%"}, 200);
		$(event.target).parent().find(".image-slider-navigation").children("li").removeClass("active");
		$(event.target).parent().find(".image-slider-navigation").find("[img-id='" + activeParent.next().attr("img-item") + "']").addClass("active");
	}else{
		parent.removeClass("active");
		parent.first().addClass("active");
		activeParent.css("margin-left", "0%");
		parent.first().css("margin-left", "100%");
		activeParent.animate({"margin-left" : "-100%"}, 200);
		parent.first().animate({"margin-left" : "0%"}, 200);
		$(event.target).parent().find(".image-slider-navigation").children("li").removeClass("active");
		$(event.target).parent().find(".image-slider-navigation").find("[img-id='" + parent.first().attr("img-item") + "']").addClass("active");
	}
});

//**** Menus ****//

$(document).on("mousedown", function() {
	var target = event.target;
	if($(target).parent().hasClass("open") && $(target).parent().hasClass("menu-group")){
		$(".menu-group").removeClass("open"); //Closes all other menus
		$(".menu-group").each(function(){
			$(this).not($(target).parent()).trigger("menu.close"); //Trigger menu.close event on all closed menus
		});
	}else if($(target).parent().hasClass("menu-group") && $(target).attr("openmenu") == ""){
		$(".menu-group").removeClass("open"); //Closes all other menus
		$(".menu-group").each(function(){
			$(this).not($(target).parent()).trigger("menu.close"); //Trigger menu.close event on all closed menus
		});
		$(target).parent().toggleClass("open");
		$(target).parent().trigger("menu.open");
	}else{ //Close all opened menus
		$(".menu-group").removeClass("open"); //Closes all other menus
		$(".menu-group").each(function(){
			$(this).not($(target).parent()).trigger("menu.close"); //Trigger menu.close event on all closed menus
		});
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




