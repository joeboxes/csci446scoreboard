// ResourceBakos.js
// TEXTURES -----------------------------------
ResourceBakos.TEX_BAKOS_1 = 0;
ResourceBakos.TEX_BG_ROW_1 = 1;
ResourceBakos.TEX_DB_1 = 2;
ResourceBakos.TEX_DB_2 = 3;
ResourceBakos.TEX_DB_3 = 4;
ResourceBakos.TEX_DIRT_1 = 5;
ResourceBakos.TEX_PYTHON_1 = 6;
ResourceBakos.TEX_ROCK_1 = 7;
ResourceBakos.TEX_ROCK_2 = 8;
ResourceBakos.TEX_ROCK_3 = 9;
ResourceBakos.TEX_RUBY_1 = 10;
ResourceBakos.TEX_RUBY_2 = 11;
ResourceBakos.TEX_RUBY_3 = 12;
// MAPS ---------------------------------------
ResourceBakos.MAP_LEVEL_1 = 0;
ResourceBakos.MAP_LEVEL_2 = 1;
ResourceBakos.MAP_LEVEL_3 = 2;
ResourceBakos.MAP_LEVEL_4 = 3;
ResourceBakos.MAP_LEVEL_5 = 4;
// SOUNDS -------------------------------------
// SYMBOLS -------------------------------------
ResourceBakos.SYM_NONE = '_';
ResourceBakos.SYM_MAIN_CHAR = 'M';
ResourceBakos.SYM_ROCK = '*';
ResourceBakos.SYM_DIRT = '-';
ResourceBakos.SYM_RUBY = 'R';
ResourceBakos.SYM_PYTHON = 'S';
ResourceBakos.SYM_DB = 'D';

function ResourceBakos(){
	Code.extendClass(this,Resource);
	
	this.imgLoader.setLoadList( "images/", new Array(	"bakos_1.png",
														"bg_row_1.png",
														"db_1.png",
														"db_2.png",
														"db_3.png",
														"dirt_1.png",
														"python_1.png",
														"rock_1.png",
														"rock_2.png",
														"rock_3.png",
														"ruby_1.png",
														"ruby_2.png",
														"ruby_3.png"), this );
	this.fxnLoader.setLoadList( new Array(loadLevels), this );
	this.loadLevels = loadLevels;
	function loadLevels(ref){ // 24 x 16
		var lvl1 = 	"_M______________________"+ // 1
					"----R----**********----R"+ // 2
					"---------*R---S--R*-----"+ // 3
					"---------*--------*-----"+ // 4
					"------------------------"+ // 5
					"*-----------*****-R-**-R"+ // 6
					"R--***--------R------R**"+ // 7
					"----R-------*-----------"+ // 8
					"------------*-----*R----"+ // 9
					"-----*R*---**R----------"+ // 10
					"---------*--------------"+ // 11
					"-***-------------R------"+ // 12
					"--R------S------***-----"+ // 14
					"---*--------------------"+ // 13
					"--R---R--*--*---*-----D-"+ // 15
					"R--*------**R-*R-------R"; // 16
		var lvl2 = 	"_M______________________"+
					"-*******---R-**----**--*"+
					"---R*R-----S----**-*--R-"+
					"-----*-----*---*--------"+
					"-*----*-------R-----S---"+
					"*R------------**--------"+
					"--**-----*-----R--------"+
					"------------*---*****R*R"+
					"****-*-*--*-------------"+
					"R----*-*--***-----------"+
					"------*-----*------R*---"+
					"-------R---**-----------"+
					"--*---*-*-----***-------"+
					"----*---*--------R*-----"+
					"-----D--*-S--------*----"+
					"R*R-----*R--R----R-R*---";
		var lvl3 = 	"_M______________________"+
					"******-****------*----*-"+
					"R-S-R*-*-----------***--"+
					"-----*-*----R*R----R--S-"+
					"*----*R*----***--*-*----"+
					"--*--R*-----R*R----R----"+
					"--R-----------*---------"+
					"---***-S-------*----*---"+
					"---*-----------R*--*R**-"+
					"-*----------*-----------"+
					"-----------*R*----------"+
					"------*-*-*---*---------"+
					"*--***R*-*--R--*--*--***"+
					"R-----------D---*R------"+
					"----*****-----------*---"+
					"-S----R---*--*-*----*--R";
		var lvl4 = 	"_M______________________"+
					"-------*****-------**--*"+
					"-*----*R-S--*--S--------"+
					"-R---*R------*----****--"+
					"----*R-------*-------*--"+
					"--**R-----*RR*--------*-"+
					"RS--------RRDRR------*--"+
					"**RR*------RR*------*---"+
					"-----R**--RR-*----**--*-"+
					"----RRR-**-------*R-----"+
					"-----*---------*--R*R*--"+
					"------*--------------*-*"+
					"-------RRR-----**----*--"+
					"R--S------*--*-*-----R--"+
					"R*-*-*-------*-***---*R-"+
					"R-R*R*R------*R----R-*-R";
		var lvl5 = 	"_M______________________"+
					"-------****************-"+
					"------*R-S-D-S--R---R---"+
					"R---**-R--RR*---*R----*-"+
					"RRSRR--R---RR-R---R---*-"+
					"-****--*----R----*----*-"+
					"-*--R---*R*-**R**--*----"+
					"-*--R------*R------*----"+
					"R--*-------*----*--*----"+
					"----*-RRR--*-------R*---"+
					"--*--*-S-*R*R**---*R----"+
					"----------*R-------*----"+
					"RR**-*-----**-------*S--"+
					"-R--*R**R---R**-R*---*--"+
					"-*-----R*****--**-***-R-"+
					"R*---------------------R";
		ref.map[ResourceBakos.MAP_LEVEL_1] = lvl1;
		ref.map[ResourceBakos.MAP_LEVEL_2] = lvl2;
		ref.map[ResourceBakos.MAP_LEVEL_3] = lvl3;
		ref.map[ResourceBakos.MAP_LEVEL_4] = lvl4;
		ref.map[ResourceBakos.MAP_LEVEL_5] = lvl5;
	}
	
	
	
}
/*
		var lvl1 = 	"________________________"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------"+
					"------------------------";
*/
	/*
	this.tex = this.base.tex;
	alert( [this.tex.length, this.base.tex.length] );
	*/
//	this.base.fxnLoader.setLoadList(new Array());
	 // = new MultiLoader(new Array());
//	imgLoader // = new ImageLoader("", new Array());
	//this.base.getFxn1();
	//this.setImageLoader = setImageLoader;
	/*function setImageLoader(){
		alert(base);
		base.imgLoader.setLoadList( "images/", new Array("bakos_1.png") );
		alert(base.imgLoader);
		
	}*/

/*
function ClassB(){
	Code.extendClass(this,ClassA);
	var c = 890;
	this.getFxn1 = getFxn1;
	function getFxn1(){
		return c;//this.base.getFxn1();
	}
}
*/



