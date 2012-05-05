// Output.js

// CLASS VARIABLES
var CANVAS_NUM_ALL =  0;

function Output(debHTML){ // input is debug HTML object
	var output;
	var MAXLINES;
	var MAXCHARS;
	
	// constructor
	output = debHTML;
	MAXLINES = 5;
	MAXCHARS = 100;
	
	// public
	this.getOutput = function(){
		return output;
	}
	this.setMaxChars = function(n){
		MAXCHARS = n;
	}
	this.setMaxLines = function(n){
		MAXLINES = n;
	}
	this.write = function(str){
		if(str.length>MAXCHARS){
			str = str.substr(0,MAXCHARS);
		}
		var newStr = str+"<br>"+output.innerHTML;	
		var count;
		var index = 0;
		for(count=0; count<MAXLINES; ++count){
			index = newStr.indexOf("<br>",index+1);
			if( index<0 ){
				break;
			}
		}
		if(index>0){
			newStr = newStr.substr(0,index);
		}
		output.innerHTML = newStr;
	}
	this.clear = function(){
		output.innerHTML = "";
	}
}



