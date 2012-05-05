// Voxel.js

function Voxel(){
	var background = new Array();
	var chars = new Array();
	var res = false;
	
// -----------------------------------------------
	this.clear = clear;
	function clear(){
		Code.emptyArray(background);
		Code.emptyArray(chars);
		res = false;
	}
// -----------------------------------------------
	this.setBG = setBG;
	function setBG(arr){
		Code.emptyArray(background);
		var i;
		for(i=0;i<arr.length;++i){
			background.push(arr[i]);
		}
	}
	this.getBG = getBG;
	function getBG(){
		return background;
	}
// -----------------------------------------------
	this.setChars = setChars;
	function setChars(arr){
		Code.emptyArray(chars);
		var i;
		for(i=0;i<arr.length;++i){
			chars.push(arr[i]);
		}
	}
	this.getChars = getChars;
	function getChars(){
		return chars;
	}
	this.addChar = addChar;
	function addChar(ch){
		chars.push(ch);
	}
	this.removeChar = removeChar;
	function removeChar(ch){
		Code.removeElement(chars,ch);
	}
// -----------------------------------------------
	this.getReserved = getReserved;
	function getReserved(){
		return res;
	}
	this.setReserved = setReserved;
	function setReserved(){
		res = true;
	}
}





