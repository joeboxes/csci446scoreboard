// Lattice.js

// CLASS VARIABLES
function Lattice(xNum,yNum, obj){
	// private
	var a = null;
	var x, y, xy;
	// constructor
	setDims(xNum,yNum, obj);
	
	// public
	this.setDims = setDims;
	function setDims(xNum,yNum, obj){
		x = xNum; y = yNum; xy = x*y;
		if(a!=null && a!=undefined){
			Code.emptyArray(a);
			delete a;
		}
		a = new Array(xy);
		var i;
		if(obj==null || obj==undefined){
			for(i=0;i<xy;++i){
				a[i] = null;
			}
		}else{
			for(i=0;i<xy;++i){
				a[i] = new obj();
			}
		}
	}
// -----------------------------------------------
	this.clear = clear;
	function clear(){
		var i;
		for(i=0;i<xy;++i){
			a[i].clear();
		}
	}
// -----------------------------------------------
	this.inLimits = function(xN,yN){
		var xF = Math.floor(xN), yF = Math.floor(yN);
		return ( 0<=xF && xF<x && 0<=yF && yF<y );
	}
	this.getElement = function(xN,yN){
		var xF = Math.floor(xN), yF = Math.floor(yN);
		var i = yF*x + xF;
		return a[i];
	}
	this.setElement = function(xN,yN, val){
		var xF = Math.floor(xN), yF = Math.floor(yN);
		var i = yF*x + xF;
		a[i] = val;
	}
	this.getIndex = function(i){
		return a[i];
	}
	this.setIndex = function(i, val){
		a[i] = val;
	}
	this.getLength = function(){
		return xy;
	}
}



