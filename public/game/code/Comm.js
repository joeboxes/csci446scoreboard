// Comm.js
Comm.EVENT_INDEX = 'comevtidx';
Comm.EVENT_ADDED = 'comevtadd ';

function Comm(){
	var dispatch = new Dispatch();
	var requestIndex = new XMLHttpRequest();
	var requestAdd = new XMLHttpRequest();
	var baseURL = "sharp-mist-1683.herokuapp.com/";
	
	this.addScore = addScore;
	function addScore(name,score){
		var params = "name="+name+"&score="+score;
		var reqType = "POST";
		var reqURL = baseURL+"scores"+"?"+params;
		var reqSync = true;
		alert('add scores 0');
		requestAdd.onreadystatechange = addedScores;
		requestAdd.open(reqType,reqURL,reqSync);
		requestAdd.send();
		alert('add scores 1');
	}
	this.addedScores = addedScores;
	function addedScores(){
		if (requestAdd.readyState==4 && requestAdd.status==200){
			dispatch.alertAll(Comm.EVENT_ADDED,true);
			listScores();
		}
	}
// --------------------------------------------------------------
	this.listScores = listScores;
	function listScores(){
		var reqType = "GET";
		var reqURL = baseURL+"scores.json";
		var reqSync = true;
		alert('list scores 0');
		requestIndex.onreadystatechange = updateScores; // show current list
		requestIndex.open(reqType,reqURL,reqSync);
		requestIndex.send(); // nothing specific
		alert('list scores 1');
	}
	this.updateScores = updateScores;
	function updateScores(){
		if (requestIndex.readyState==4 && requestIndex.status==200){
			var resp = requestIndex.responseText;
			dispatch.alertAll(Comm.EVENT_INDEX,resp);
		}
	}
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
}



