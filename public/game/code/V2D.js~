// V2D.js
function V2D(xP,yP){ // input is debug HTML object
//	alert( [x,y] );
	this.x = 0;
	this.y = 0;
	// constructor
	this.x = xP; this.y = yP;
	
// FUNCTIONS --------------------------------------------------------------
	this.length = length;
	function length(){
		return Math.sqrt(x*x+y*y);
	}
	this.norm = norm;
	function norm(){
		dist = Math.sqrt(this.x*this.x+this.y*this.y);
		this.x = this.x/dist; this.y = this.y/dist;
	}
	this.kill = kill
	function kill(){
		this.x = undefined; this.y = undefined;
		this = null;
	}
}

