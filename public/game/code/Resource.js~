// Resource.js

function Resource(){
	var tex = new Array();
	this.tex = tex;
	var snd = new Array();
	this.snd = snd;
	var map = new Array();
	this.map = map;
	var imgLoader = new ImageLoader( "images/", new Array(), this );
	this.imgLoader = imgLoader;
	var fxnLoader = new MultiLoader( new Array(), this );
	this.fxnLoader = fxnLoader;
	imgLoader.setFxnComplete(load2);
	fxnLoader.setFxnComplete(load3);
	var fxnComplete = null;
	
	this.load = load;
	function load(){
		imgLoader.load();
	}
	this.load2 = load2;
	function load2(imgList, ref){
		var i;
		for(i=0;i<imgList.length;++i){
			tex[i] = imgList[i];
		}
		fxnLoader.load();
	}
	this.load3 = load3;
	function load3(){
		if(fxnComplete!=null){
			fxnComplete();
		}
	}
	this.setFxnComplete = setFxnComplete;
	function setFxnComplete(fxn){
		fxnComplete = fxn;
	}
	this.kill = kill;
	function kill(){
		
	}

}



