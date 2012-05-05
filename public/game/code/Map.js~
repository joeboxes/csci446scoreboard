// Map.js
Map.WALL = 99;
Map.INIT = 0;
Map.MOVE_NA = 0;
Map.MOVE4_UP = 1;
Map.MOVE4_DN = 2;
Map.MOVE4_LF = 3;
Map.MOVE4_RT = 4;

function Map(xNum,yNum){
	var a = new Array();
	var wid = 0;
	var hei = 0;
	var len = 0;
	var que = new Queue();
	setDims(xNum,yNum);
	
	this.setDims = setDims;
	function setDims(xNum,yNum){
		wid = xNum; hei = yNum; len = xNum*yNum;
		Code.emptyArray(a);
		var i;
		for(i=0;i<len;++i){
			a[i] = 0;
		}
	}
// -----------------------------------------------
	this.setElement = function(xN,yN, val){
		var xF = Math.floor(xN), yF = Math.floor(yN);
		var i = yF*wid + xF;
		a[i] = val;
	}
	this.setIndex = function(i, val){
		a[i] = val;
	}
	this.getIndex = function(i){
		return a[i];
	}
// -----------------------------------------------
	this.clear = clear;
	function clear(){
		var i;
		for(i=0;i<len;++i){
			a[i] = Map.INIT;
		}
	}
// -----------------------------------------------
	this.getBestMove = getBestMove;
	function getBestMove(xIn,yIn){
		var xLoc = Math.floor(xIn); yLoc = Math.floor(yIn);
		var index = yLoc*wid + xLoc;
		var comp, value = a[index];
		var iM1 = index-1; iP1 = index+1; iMW = index-wid; iPW = index+wid;
		var xLeft = xLoc-1, xRight = xLoc+1;
		var yUp = yLoc-1, yDown = yLoc+1;
		var best = Map.MOVE_NA;
		if(xLeft>=0){// LEFT
			comp = a[iM1]; if(comp<value){ value=comp; best=Map.MOVE4_LF; }
		}
		if(xRight<wid){// RIGHT
			comp = a[iP1]; if(comp<value){ value=comp; best=Map.MOVE4_RT; }
		}
		if(yUp>=0){// UP
			comp = a[iMW]; if(comp<value){ value=comp; best=Map.MOVE4_UP; }
		}
		if(yDown<hei){// DOWN
			comp = a[iPW]; if(comp<value){ value=comp; best=Map.MOVE4_DN; }
		}
		return best;
	}
// -----------------------------------------------
	this.createPaths = createPaths;
	function createPaths(xLoc,yLoc){
		var arr, index;
		var yNum = Math.floor(yLoc);
		var xNum = Math.floor(xLoc);
		que.clear();
		index = yNum*wid + xNum;
		a[index] = 1;
		push4(index,xNum,yNum);
		while( !que.isEmpty() ){
			arr = que.pop();
			index = arr.pop(); yNum = arr.pop(); xNum = arr.pop();
			push4( index, xNum, yNum );
		}
	}
	function push4(index,xLoc,yLoc){
		var comp, value = a[index];
		var valNext = value+1;
		var iM1 = index-1, iP1 = index+1, iMW = index-wid; iPW = index+wid;
		var xLeft = xLoc-1, xRight = xLoc+1;
		var yUp = yLoc-1, yDown = yLoc+1;
		if(xLeft>=0){// LEFT
			comp = a[iM1];
			if(comp==Map.INIT){ a[iM1]=valNext; que.push(new Array(xLeft,yLoc,iM1)); }
		}
		if(xRight<wid){// RIGHT
			comp = a[iP1];
			if(comp==Map.INIT){ a[iP1]=valNext; que.push(new Array(xRight,yLoc,iP1)); }
		}
		if(yUp>=0){// UP
			comp = a[iMW];
			if(comp==Map.INIT){ a[iMW]=valNext; que.push(new Array(xLoc,yUp,iMW)); }
		}
		if(yDown<hei){// DOWN
			comp = a[iPW];
			if(comp==Map.INIT){ a[iPW]=valNext; que.push(new Array(xLoc,yDown,iPW)); }
		}
	}
}



