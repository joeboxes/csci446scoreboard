// Canvas.js

// CLASS VARIABLES
Canvas.EVENT_MOUSE_DOWN = "canevtmdn";
Canvas.EVENT_MOUSE_UP = "canevtmup";
Canvas.EVENT_CLICK = "canevtclk";

function Canvas(canHTML){ // input is canvas HTML object
// VARIABLES --------------------------------------------------------------
	// public
	this.width = 0;
	this.height = 0;
	this.mouseDown = false;
	// private
	var canvas;
	var context;
	var dispatch;
	// constructor
	dispatch = new Dispatch();
	canvas = canHTML;
	this.width = canvas.width;
	this.height = canvas.height;
	context = canvas.getContext("2d");
	// dispatch -----------------------------------------------------------
	this.addFunction = addFunction;
	function addFunction(str,fxn){
		dispatch.addFunction(str,fxn);
	}
	this.removeFunction = removeFunction;
	function removeFunction(str,fxn){
		dispatch.removeFunction(str,fxn);
	}
	this.alertAll = alertAll;
	function alertAll(str,o){
		dispatch.alertAll(str,o);
	}
	// getters -----------------------------------------------------------
	this.getCanvas = getCanvas;
	function getCanvas(){
		return canvas;
	}
	this.getContext = getContext;
	function getContext(){
		return context;
	}
	// LISTENERS ----------------------------------------------------------
	this.addListeners = addListeners;
	function addListeners(){
		canvas.addEventListener('click', canvasClickFxn);
		canvas.addEventListener('mousedown', canvasMouseDownFxn);
		canvas.addEventListener('mouseup', canvasMouseUpFxn);
	}
	this.removeListeners = removeListeners;
	function removeListeners(){
		canvas.removeEventListener('click', canvasClickFxn);
		canvas.removeEventListener('mousedown', canvasMouseDownFxn);
		canvas.removeEventListener('mouseup', canvasMouseUpFxn);
	}
	function canvasClickFxn(e){
		pos = getMousePosition(e);
		alertAll(Canvas.EVENT_CLICK,pos);
		pos = null;
	}
	function canvasMouseDownFxn(e){
		this.mouseDown = true;
		pos = getMousePosition(e);
		alertAll(Canvas.EVENT_MOUSE_DOWN,pos);
		pos = null;
	}
	function canvasMouseUpFxn(e){
		this.mouseDown = false;
		pos = getMousePosition(e);
		alertAll(Canvas.EVENT_MOUSE_UP,pos);
		pos = null;
	}
	function getMousePosition(e){
		var pos = new V2D(0,0);
		var ele = canvas;
		while(ele != null){
			pos.x += ele.offsetLeft;
			pos.y += ele.offsetTop;
			ele = ele.offsetParent;
		}
		pos.x = e.pageX - pos.x;
		pos.y = e.pageY - pos.y;
		return pos;
	}
}





