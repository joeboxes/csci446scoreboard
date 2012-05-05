// Code.js
function Code(){
	alert('you shouldn\'t instantiate the Code class');
}

// array functions ----------------------------------------------
Code.elementExists = function(a,o){
	var i;
	for(i=0;i<a.length;++i){
		if(a[i]==o){ return true; }
	}
	return false;
}
Code.addUnique = function(a,o){
	if( !Code.elementExists(a,o) ){ a.push(o); }
}
Code.removeElement = function(a,o){ // preserves order
	var i;
	for(i=0;i<a.length;++i){
		if(a[i]==o){
			while(i<a.length){
				a[i] = a[i+1];
				++i;
			}
			a.pop();
			break;
		}
	}
}
Code.emptyArray = function(a){
	while(a.length>0){ a.pop(); }
}
// conversion functions ----------------------------------------------
Code.getHex = function (intVal){
	return '#'+intVal.toString(16);
}
// string functions ----------------------------------------------
Code.padString = function(str,len, ch, left){
	if(str.length>=len){
		return str.substring(0,len);
	}
	if(left==null){
		left = true;
	}
	var rem = len - str.length;
	//alert(rem);
	var add = '';
	while(add.length<rem){
		add = add + ch;
	}
	if(left){
		return str+add;
	}
	return add+str;
}

// class functions ----------------------------------------------
Code.extendClass = function(child,parent){
	parent.apply(child); child.base = new parent; child.base.child = child;
}

// ? functions ----------------------------------------------



