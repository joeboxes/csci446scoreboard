// ClassA.js

function ClassA(){
	this.a = 666;
	var b = 999;	
	this.getFxn1 = getFxn1;
	function getFxn1(){
		return b;
	}
	this.getFxn2 = getFxn2;
	function getFxn2(){
		return 44;
	}
}

function ClassB(){
	Code.extendClass(this,ClassA);
	var c = 890;
	this.getFxn1 = getFxn1;
	function getFxn1(){
		return c;//this.base.getFxn1();
	}
}


/*
	var a = new ClassA();
	alert( [a.getFxn1(), a.getFxn2()] );
	var b = new ClassB();
	alert( [b.getFxn1(), b.getFxn2()] );
*/


/*
var ClassA = Class.extend({
	init: function(){
		this.a = 666;
	},
	getFxn: function(){
		return this.a;
	}
});
*/
/*
var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  },
  dance: function(){
    return this.dancing;
  }
});

*/



/*
function ClassB = ClassA.extend(){
	
}

*/












