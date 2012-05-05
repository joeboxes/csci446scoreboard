// Comm.js
Comm.EVENT_INDEX = 'comevtidx';
Comm.EVENT_ADDED = 'comevtadd ';

function Comm(){
	var dispatch = new Dispatch();
	var requestIndex = new XMLHttpRequest();
	var requestAdd = new XMLHttpRequest();
	var baseURL = "http://sharp-mist-1683.herokuapp.com/";
	// sharp-mist-1683.herokuapp.com/scores?name=richie&score=0
	// http://sharp-mist-1683.herokuapp.com/game/game.html
	
	this.addScore = addScore;
	function addScore(name,score){
		var params = "name="+name+"&score="+score;
		var reqType = "POST";
		var reqURL = baseURL+"scores"+"?"+params;
		var reqSync = true;
		requestAdd.onreadystatechange = addedScores;
		requestAdd.open(reqType,reqURL,reqSync);
		requestAdd.send();
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
		requestIndex.onreadystatechange = updateScores; // show current list
		requestIndex.open(reqType,reqURL,reqSync);
		requestIndex.send(); // nothing specific
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



