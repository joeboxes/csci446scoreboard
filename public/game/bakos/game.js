// http://www.webmonkey.com/2010/02/make_oop_classes_in_javascript/
// http://stackoverflow.com/questions/7486825/javascript-inheritance
// global vars
var resource = null;
var winScores = null;
var winContent = null;
var commScore = null;
var userName = "";
var canvas = null;
var debug = null;
var lattice = null;
var ticker = null;
var keyboard = null;
var RECT_SIZE = 25;
var GRID_SIZE_X = 0;
var GRID_SIZE_Y = 0;
var GRID_SIZE = 0;
var frameSpeed = 20;
var windowsHTMLID = "windows";
var debugHTMLID = "output";
var canvasHTMLID = "canvas0";
var titleHTMLID = "title";
var titleBase = "Bakos' Ruby Data Mining";
var title;
//
var time = 0;
var score = 0;
var charMain = null;
var charListAll = new Array();
var level = 0;
var levelMax = 1;
var speedChar, speedEnem, speedVar, seeDistance;
var hitDistance = 0.5;
var mapSolution = null;

// init function called on page load complete
function startLoad(){
	var winWid = 250; var winHei = 300;
	winScores = new Win( document.getElementById(windowsHTMLID), 'Bakos\' Ruby Data Mining', 5,5, winWid,winHei );
	winContent =  document.createElement('div');
	winContent.innerHTML = "...";
	winContent.style.width = winWid+"px";
	winContent.style.height = winHei+"px";
	winContent.style.color = "#FFFFFF";
	winContent.style.textAlign = 'center';
	winContent.style.fontSize = "12px";
	winContent.style.overflow = "hidden";
	winScores.setContent(winContent);
	commScore = new Comm();
	commScore.addFunction(Comm.EVENT_INDEX, updateHighScores);
	//commScore.addScore("billybob",12345);
	//commScore.listScores();
	//startLoadOld();
	initName();
}
function initName(){
	winContent.innerHTML = 'Please Enter Your Name:<br /><input type="textfield" id="inputUserName" maxlength="15" size="12"></input><br /><input type="button" value="Start Game!" onclick="endName();"></input>';
}
function endName(){
	var ele = document.getElementById( "inputUserName" );
	userName = ele.value;
	if(userName.length<3){
		return;
	}
	commScore.addScore(userName,0);
	winScores.setTitle("High Scores");
	startLoadOld();
}
function updateHighScores(resp){
	var data = eval('('+resp+')');
	var len = data.length;
	var i;
	var scoreData = "";
	for(i=0;i<len;++i){
		scoreData = scoreData + Code.padString(data[i].name,16, '.', true) + "." + Code.padString('$'+data[i].score+'K',16, '.', false)  + "<br/\>";
	}
	winContent.innerHTML = "<b>Welcome "+userName+"!</b><br />"+scoreData;
}
function startLoadOld(){
	resource = new ResourceBakos();
	resource.setFxnComplete(loadAll);
	resource.load();
}
function loadAll(){
	debug = new Output( document.getElementById(debugHTMLID) );
	debug.setMaxChars(75); debug.setMaxLines(1);
	
	title = new Output( document.getElementById(titleHTMLID) );
	title.setMaxChars(35); title.setMaxLines(1);
	
	canvas = new Canvas( document.getElementById(canvasHTMLID) );
	GRID_SIZE_X = Math.floor(canvas.width/RECT_SIZE);
	GRID_SIZE_Y = Math.floor(canvas.height/RECT_SIZE);
	GRID_SIZE = GRID_SIZE_X*GRID_SIZE_Y;
	lattice = new Lattice(GRID_SIZE_X,GRID_SIZE_Y, Voxel);
	
	ticker = new Ticker(frameSpeed);
	keyboard = new Keyboard();
	keyboard.addListeners(); // keyboard.removeListeners();
	
	mapSolution = new Map(GRID_SIZE_X,GRID_SIZE_Y);
	levelMax = resource.map.length;
	level = 1;
	continueFxn();
}
function continueFxn(){
	ticker.stop();
	ticker.removeFunction(Ticker.EVENT_TICK,continueFxn);
	ticker.setFrameSpeed(frameSpeed);
speedChar = 0.25 + 0.05*level;
speedEnem = 0.03 + 0.01*level;
speedVar = 0.15*speedEnem;
seeDistance = 5.0 + 0.5*level;
	loadLevel(level);
	charMain.amt = score;
	updateTitle(charMain.amt);
	updateEnemyMap();
	addListeners();
}
function updateTitle(str,obj){
	if(obj==true){
		title.write(str);
	}else{
		title.write(titleBase+" : $"+str+"K");
	}
}
// INTERACTION - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var count = 0;
var gotoPause = true;//false;
function showPauseScreen(){
	var metrics, str, xPos, yPos;
	var spacing = 10;
	gotoPause = true;
	removeListeners();
	var context = canvas.getContext();
	// bg
var gr = context.createRadialGradient(canvas.width/2,canvas.height/2,0, canvas.width/2,canvas.height/2,500);
gr.addColorStop(0,'rgba(0,0,0,0.9)');
gr.addColorStop(0.5,'rgba(0,0,0,.8)');
gr.addColorStop(1,'rgba(0,0,0,.6)');
context.fillStyle = gr;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fill();
	//text
	context.textAlign = "center";
	context.baseLine = "middle";
	context.fillStyle = "#FFFFFF";
	//
	context.font = "30px sans-serif";
		context.fillText("Paused",canvas.width/2,30);
	context.font = "15px sans-serif";
	str = "You (Bakos)";
		metrics = context.measureText(str);
		context.fillText(str,(canvas.width+metrics.width)/2+spacing,100);
	str = "Enemy (Python)";
		metrics = context.measureText(str);
		context.fillText(str,(canvas.width+metrics.width)/2+spacing,130);
	str = "Dirt (Dig and Explore)";
		metrics = context.measureText(str);
		context.fillText(str,(canvas.width+metrics.width)/2+spacing,160);
	str = "Gems (Ruby)";
		metrics = context.measureText(str);
		context.fillText(str,(canvas.width+metrics.width)/2+spacing,190);
	str = "DataBase (Exit)";
		metrics = context.measureText(str);
		context.fillText(str,(canvas.width+metrics.width)/2+spacing,220);
	//icons
	img = resource.tex[ResourceBakos.TEX_BAKOS_1];
		context.drawImage(img, (canvas.width-img.width)/2-spacing, 100-17);
	img = resource.tex[ResourceBakos.TEX_PYTHON_1];
		context.drawImage(img, (canvas.width-img.width)/2-spacing, 130-17);
	img = resource.tex[ResourceBakos.TEX_DIRT_1];
		context.drawImage(img, (canvas.width-img.width)/2-spacing, 160-17);
	img = resource.tex[ResourceBakos.TEX_RUBY_3];
		context.drawImage(img, (canvas.width-img.width)/2-spacing, 190-17);
	img = resource.tex[ResourceBakos.TEX_DB_3];
		context.drawImage(img, (canvas.width-img.width)/2-spacing, 220-17);
	// instructions
	context.fillStyle = "#FFFFFF";
	context.font = "15px sans-serif";
		context.fillText("p to un/pause",canvas.width/2,280);
		context.fillText("u/d/l/r to move",canvas.width/2,300);
		context.fillText("Objective: Collect as many ruby gems as possible",canvas.width/2,350);
	addPauseListener();
}
function hidePauseScreen(){
	gotoPause = false;
	removePauseListener();
	addListeners();
}
function showCompleteScreen(){
	var i, j, rad, metrics, str;
	var context = canvas.getContext();
	context.fillStyle = "rgba(0, 0, 0, 0.9)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fill();

	context.save();
		context.scale(2,2);
		img = resource.tex[ResourceBakos.TEX_DB_3];
		for(i=0;i<12;++i){
			for(j=0;j<8;++j){
				context.drawImage(img, i*25,j*25);
			}
		}
	context.restore();

	context.save();
		context.scale(2,2);
		context.translate(137.5,75);
		img = resource.tex[ResourceBakos.TEX_RUBY_3];
		rad = 0;
		for(i=0;i<180;++i){
			context.drawImage(img, Math.cos(i/4)*rad,Math.sin(i/4)*rad);
			rad+=Math.pow(100/(i+1),.25);
		}
	context.restore();

	context.save();
		context.setTransform(1,0,0,1,0,0);
		context.scale(2,2);
		context.translate(112.5,50);
		img = resource.tex[ResourceBakos.TEX_RUBY_3];
			context.drawImage(img, 25,0);
			context.drawImage(img, 0,25);
			context.drawImage(img, 50,25);
			context.drawImage(img, 25,50);
		img = resource.tex[ResourceBakos.TEX_BAKOS_1];
			context.drawImage(img, 25,25);
	context.restore();

	img = resource.tex[ResourceBakos.TEX_PYTHON_1];
		context.drawImage(img, 535,360);

	//text
	context.textAlign = "center";
	context.baseLine = "middle";
	context.fillStyle = "#FFFFFF";
	context.shadowColor = "#990033";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 25;
	
	context.font = "30px sans-serif";
	str = "$"+score+"K";
	for(i=0;i<15;++i){
		context.fillText(str,canvas.width/2,40);
	}

	context.font = "20px sans-serif";
	str = "(To replay, refresh screen)";
	for(i=0;i<15;++i){
		context.fillText(str,canvas.width/2,380);
	}

}
function enterFrameFxn(){
	++time;
	processScene();
	renderScene();
	checkEnd();
	if(gotoPause){
		showPauseScreen();
	}
}
function checkEnd(){
// check for exit
	if(charMain.complete){
		removeListeners();
		len = lattice.getLength();
		for(i=0;i<len;++i){
			vox = lattice.getIndex(i);
			arr = vox.getChars();
			for(j=0;j<arr.length;++j){
				ch = arr[j];
				ch.setSelectedImage(666);
			}
			vox.setBG( new Array() );
		}
		renderScene();
		score = charMain.amt;
		updateTitle('Completed Level '+level+'!', true);
		level++;
		// HIGH SCORE ADD
		commScore.addScore(userName,score);
		if(level<=levelMax){
			ticker.setFrameSpeed(1000);
			ticker.addFunction(Ticker.EVENT_TICK,continueFxn);
			ticker.start();
		}else{
			updateTitle('YOU BEAT THE GAME $'+score+'K!', true);
			showCompleteScreen();
		}
	}
}
function keyDownPauseFxn(key){
	if(key==Keyboard.KEY_LET_P){
		hidePauseScreen();
	}
}
function keyDownFxn(key){
	if(!charMain.moving){
		if(key==Keyboard.KEY_UP){
			charMain.dir = Obj2D.DIR_UP;
		}else if(key==Keyboard.KEY_DN){
			charMain.dir = Obj2D.DIR_DN;
		}else if(key==Keyboard.KEY_LF){
			charMain.dir = Obj2D.DIR_LF;
		}else if(key==Keyboard.KEY_RT){
			charMain.dir = Obj2D.DIR_RT;
		}
	}
	if(key==Keyboard.KEY_LET_P){
		gotoPause = true;
	}
}
function onClickFxn(o){
	// 
}
function resizeEventFxn(e){
	// 
}
function addListeners(){
	window.onresize = resizeEventFxn;
	canvas.addListeners();
	canvas.addFunction(Canvas.EVENT_CLICK,onClickFxn);
	ticker.addFunction(Ticker.EVENT_TICK,enterFrameFxn);
	ticker.start();
	keyboard.addFunction(Keyboard.EVENT_KEY_DOWN,keyDownFxn);
}
function removeListeners(){
	window.onresize = null;
	canvas.removeListeners();
	canvas.removeFunction(Canvas.EVENT_CLICK,onClickFxn);
	ticker.removeFunction(Ticker.EVENT_TICK,enterFrameFxn);
	ticker.stop();
	keyboard.removeFunction(Keyboard.EVENT_KEY_DOWN,keyDownFxn);
}
function addPauseListener(){
	keyboard.addFunction(Keyboard.EVENT_KEY_DOWN,keyDownPauseFxn);
}
function removePauseListener(){
	keyboard.removeFunction(Keyboard.EVENT_KEY_DOWN,keyDownPauseFxn);
}
// PROCESSING - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function processScene(){
	var i, j, k, len, ch, obj, arr, next, dir, vox, v, u, canMove;
	next = new V2D(0,0); dir = new V2D(0,0);
	var xD, yD, dist, speed, move;
	// MOVE CHARS
	for(i=0;i<charListAll.length;++i){
		ch = charListAll[i];
		if( ch.type == Obj2D.TYPE_CHAR){
			speed = speedChar;
		}else{ //  ENEMY LOGIC GOETH HERE
			speed = speedEnem + Math.random()*speedVar - 0.5*speedVar;
			xD = ch.pos.x - charMain.pos.x; yD = ch.pos.y - charMain.pos.y;
			dist = Math.sqrt(xD*xD + yD*yD);
				if(dist<hitDistance){
					resetOrigins();
					break;
				}
			if(!ch.moving && ch.dir==Obj2D.DIR_NA){
				if(dist<seeDistance){
					move = mapSolution.getBestMove(ch.pos.x,ch.pos.y);
					if(move==Map.MOVE4_UP){ ch.dir=Obj2D.DIR_UP;
					}else if(move==Map.MOVE4_DN){ ch.dir=Obj2D.DIR_DN;
					}else if(move==Map.MOVE4_LF){ ch.dir=Obj2D.DIR_LF;
					}else if(move==Map.MOVE4_RT){ ch.dir=Obj2D.DIR_RT;
					}else{
						//do some random directions
					}
				}
			}
		}
		dir.x = 0; dir.y = 0;
		if( ch.dir != Obj2D.DIR_NA){
			if(ch.dir==Obj2D.DIR_UP){ // set up direction from symbol
				dir.y = -1;
			}else if(ch.dir==Obj2D.DIR_DN){
				dir.y = 1;
			}else if(ch.dir==Obj2D.DIR_LF){
				dir.x = -1;
			}else if(ch.dir==Obj2D.DIR_RT){
				dir.x = 1;
			}
			if( ch.moving ){ // already moving
				next.x = ch.pos.x+dir.x*speed; next.y = ch.pos.y+dir.y*speed;
				u = lattice.getElement(ch.pos.x,ch.pos.y); // AM IN
				v = lattice.getElement(Math.max(0,Math.min(GRID_SIZE_X-1,Math.floor(next.x))),
					Math.max(0,Math.min(GRID_SIZE_Y-1,Math.floor(next.y)))); // AVG IN
				w = lattice.getElement(ch.dest.x,ch.dest.y); // WILL BE IN
				if(u!=v){// switched voxels
					u.removeChar(ch);
					v.addChar(ch);
					w.setBG( new Array() );
					if( ch.type == Obj2D.TYPE_CHAR){// REFRESH AI MAP - ONLY NEED TO DO WHEN CHAR CHANGES LOCATION
						updateEnemyMap();
					}
				}
				if( (ch.pos.x<ch.dest.x && ch.dest.x<=next.x) || (ch.pos.x>ch.dest.x && ch.dest.x>=next.x) ||  
					(ch.pos.y<ch.dest.y && ch.dest.y<=next.y) || (ch.pos.y>ch.dest.y && ch.dest.y>=next.y) ){
					ch.pos.x = ch.dest.x; ch.pos.y = ch.dest.y;
					ch.moving = false; ch.dir = Obj2D.DIR_NA;
				}else{
/*var context = canvas.getContext();
context.strokeStyle = "#000000";
context.lineWidth = 5;
context.beginPath();
context.moveTo(RECT_SIZE*(ch.pos.x+0.5),RECT_SIZE*(ch.pos.y+0.5));
context.lineTo(RECT_SIZE*(next.x+0.5),RECT_SIZE*(next.y+0.5))
context.stroke();
context.closePath();*/
					ch.pos.x = next.x; ch.pos.y = next.y;
				}
			}else{ // start moving if possible
				next.x = ch.pos.x+dir.x; next.y = ch.pos.y+dir.y;
				if( lattice.inLimits(next.x,next.y) ){ // available - movement
					vox = lattice.getElement(next.x,next.y);
					arr = vox.getChars();
					canMove = true;
					for(j=0;j<arr.length;++j){
						obj = arr[j];
						if( obj.type==Obj2D.TYPE_WALL || obj.type==Obj2D.TYPE_ITEM || obj.type==Obj2D.TYPE_EXIT ){
							canMove = false;
							break;
						}
					}
					if(canMove){
						for(j=0;j<arr.length;++j){
							obj = arr[j];
							if( obj.type==Obj2D.TYPE_NONE || obj.type==Obj2D.TYPE_EXIT){
								debug.write("Got $"+obj.amt+"K!");
								obj.checkMe(ch);
								vox.removeChar(obj);
								updateTitle(ch.amt);
							}
						}
						ch.dest.x = next.x; ch.dest.y = next.y;
						ch.moving = true;
					}else{
						obj.nextImage();
						obj.checkMe(ch);
						ch.moving = false; ch.dir = Obj2D.DIR_NA;
					}
				}else{ // obstruction/limit - cannot move
					ch.moving = false; ch.dir = Obj2D.DIR_NA;
				}
			}
		}
	}
}
function resetOrigins(){ // for getting hit
	var i, arr, obj;
	for(i=0;i<charListAll.length;++i){
		obj = charListAll[i];
		obj.pos.x = obj.origin.x; obj.pos.y = obj.origin.y;
		obj.dir = Obj2D.DIR_NA;
		obj.moving = false;
	}
	var diff = charMain.amt - score;
	score = score + Math.floor(diff/2);
	charMain.amt = score;
	updateTitle(charMain.amt);
}

// RENDERING - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function renderScene(){
	var context = canvas.getContext();
	var img, obj, vox, arr, x, y, i, j, len;
	// bg
	var bgImage = resource.tex[ResourceBakos.TEX_BG_ROW_1];
	context.fillStyle = context.createPattern(bgImage,'repeat');
	context.fillRect(0,0,canvas.width,canvas.height);
	len = lattice.getLength();
	// BG
	x = 0; y = 0;
	for(i=0;i<len;++i){
		vox = lattice.getIndex(i);
		arr = vox.getBG();
		for(j=0;j<arr.length;++j){
			img = arr[j];
			context.drawImage(img, x*RECT_SIZE,y*RECT_SIZE);
		}
		++x; if(x>=GRID_SIZE_X){ x=0; ++y; }
	}
	// OBJECTS
	x = 0; y = 0;
	for(i=0;i<len;++i){
		vox = lattice.getIndex(i);
		arr = vox.getChars();
		for(j=0;j<arr.length;++j){
			obj = arr[j];
			img = obj.getSelectedImage();
			
			if(img!=null){
				context.drawImage(img, obj.pos.x*RECT_SIZE,obj.pos.y*RECT_SIZE);
			}
		}
		++x; if(x>=GRID_SIZE_X){ x=0; ++y; }
	}
	/*// TEXT
	x = 0; y = 0;
	var str, metrics, xPos, yPos;
	for(i=0;i<len;++i){
		context.fillStyle = "#000000";
		context.font = "10px sans-serif";
		str = ""+mapSolution.getIndex(i)+"";
		metrics = context.measureText(str);
		//alert(metrics.height);
		xPos = x*RECT_SIZE + metrics.width/2;
		yPos = (y+1)*RECT_SIZE - 10;// - metrics.height/2;
		context.fillText(str,xPos,yPos);
		++x; if(x>=GRID_SIZE_X){ x=0; ++y; }
	}
	*/
}

function updateEnemyMap(){
	var index,i, j, len, vox, obj, arr;
	mapSolution.clear(); // INIT TO EVERYTHING N/A
	for(i=0;i<GRID_SIZE;++i){
		vox = lattice.getIndex(i);
		arr = vox.getChars();
		for(j=0;j<arr.length;++j){
			obj = arr[j];
			if( obj.type==Obj2D.TYPE_WALL || obj.type==Obj2D.TYPE_ITEM || obj.type==Obj2D.TYPE_EXIT){
				mapSolution.setIndex(i, Map.WALL);
				break;
			}
		}
	}
	mapSolution.createPaths(charMain.dest.x,charMain.dest.y);
	//mapSolution.createPaths(Math.round(charMain.pos.x),Math.round(charMain.pos.y)); // PROPAGATE PATH NUMBERS
}

// LEVEL AUTO-LOADING -------------------------------------------------
function loadLevel(i){
	lattice.clear(); Code.emptyArray(charListAll);
	var levelString = resource.map[i-1];
	var i, len, vox, obj, x,y, arr, ch;
	len = levelString.length;
	x = 0; y = 0;
	for(i=0;i<len;++i){
		ch = levelString.charAt(i);
		vox = lattice.getIndex(i);
		// BG
		switch(ch){
			case ResourceBakos.SYM_NONE :
				vox.setBG( new Array() );
				break;
			case ResourceBakos.SYM_MAIN_CHAR :
				vox.setBG( new Array() );
				break;
			default:
				vox.setBG( new Array(resource.tex[ResourceBakos.TEX_DIRT_1]) );
				break;
		}
		// CHAR
		switch(ch){
			case ResourceBakos.SYM_DIRT :
				break;
			case ResourceBakos.SYM_RUBY :
				obj = new Obj2D(x,y, new Array(null, resource.tex[ResourceBakos.TEX_RUBY_1],resource.tex[ResourceBakos.TEX_RUBY_2],resource.tex[ResourceBakos.TEX_RUBY_3]));
				obj.type = Obj2D.TYPE_ITEM; obj.amt = Math.floor(Math.random()*10+10); vox.addChar(obj);
				break;
			case ResourceBakos.SYM_ROCK :
				obj = new Obj2D(x,y, new Array(null, resource.tex[ResourceBakos.TEX_ROCK_1],resource.tex[ResourceBakos.TEX_ROCK_2],resource.tex[ResourceBakos.TEX_ROCK_3]));
				obj.type = Obj2D.TYPE_WALL; vox.addChar(obj);
				break;
			case ResourceBakos.SYM_PYTHON :
				obj = new Obj2D(x,y, new Array(resource.tex[ResourceBakos.TEX_PYTHON_1]));
				obj.type = Obj2D.TYPE_ENEM; vox.addChar(obj); charListAll.push(obj);
				break;
			case ResourceBakos.SYM_MAIN_CHAR :
				obj = new Obj2D(x,y, new Array(resource.tex[ResourceBakos.TEX_BAKOS_1]));
				obj.type = Obj2D.TYPE_CHAR; vox.addChar(obj); charListAll.push(obj);
				break;
			case ResourceBakos.SYM_DB :
				obj = new Obj2D(x,y, new Array(null, resource.tex[ResourceBakos.TEX_DB_1],resource.tex[ResourceBakos.TEX_DB_2],resource.tex[ResourceBakos.TEX_DB_3],resource.tex[ResourceBakos.TEX_DB_3]));
				obj.type = Obj2D.TYPE_EXIT; vox.addChar(obj);
				break;
		}
		if(ch==ResourceBakos.SYM_MAIN_CHAR){ charMain = obj; }
		++x; if(x>=GRID_SIZE_X){ x = 0; ++y; }
	}
}

