// Win.js
Win.EVENT_RESIZE = 'winevtrsz';
Win.EVENT_START_DRAG = 'winevtstadrg';
Win.EVENT_STOP_DRAG = 'winevtstodrg';
//Win.DEPTH = 10;
Win.DEPTH_TOP = 0;

function Win(parent, title, xPos,yPos, wid,hei){
	// data elements
	var winTitle = '';
	var winWidth = 0;
	var winHeight = 0;
	var winBarHeight = 20;
	var winX = 0;
	var winY = 0;
	var dispatch = null;
	var depth = 0;

	// state elements
	var dragStartX = 0;
	var dragStartY = 0;
	var dragOffsetX = 0;
	var dragOffsetY = 0;
	var isDragging = false;

	// document elements
	var divParent = null;
	var divWindow = null;
	var divTitle = null;
	var divMenubar = null;
	var divBGMenu = null;
	var divBG = null;
	
	// init everything
	divWindow = document.createElement('div');
	divMenubar = document.createElement('div');
	divContent = document.createElement('div');
	divTitle = document.createElement('div');
	divBGMenu = document.createElement('div');
	divBG = document.createElement('div');
	divWindow.appendChild(divBG);
	divWindow.appendChild(divBGMenu);
	divWindow.appendChild(divTitle);
	divWindow.appendChild(divContent);
	divWindow.appendChild(divMenubar);
		// base properties
		divWindow.style.position = 'absolute';
		divBG.style.position = 'absolute';
		divBGMenu.style.position = 'absolute';
		divTitle.style.position = 'absolute';
		divTitle.style.textAlign = 'center';
		divTitle.style.fontSize = '16px';
		divTitle.style.fontWeight = 'bold';
		divMenubar.style.position = 'absolute';
		divMenubar.style.opacity = 0.0;
		divMenubar.style.backgroundColor = '#00FF00';
		divContent.style.position = 'absolute';
		divContent.style.textAlign = 'center';
		divContent.style.fontSize = '14px';
	dispatch = new Dispatch();
		// set properties
		setTitle(title);
		setParent(parent);
		setSize(wid,hei);
		setPosition(xPos,yPos);
		setWindowColor('#000000',0.85);
		setMenuColor('#330000',0.9);
		setTitleColor('#FF3333',0.9);
		setContentColor('#FFFFFF',0.9);
		setDepthTop();
	addListeners();
	

	// get/set functions
	this.addListeners = addListeners;
	function addListeners(){
		divMenubar.onmousedown = startDragMenu;
		divMenubar.onmouseup = stopDragMenu;
		document.onmousemove = checkMouseMove;
	}
	this.removeListeners = removeListeners;
	function removeListeners(){
		divMenubar.onmousedown = null;
		divMenubar.onmouseup = null;
		document.onmousemove = null;
	}
	this.setTitleColor = setTitleColor;
	function setTitleColor(color,alpha){
		if(alpha==null){
			alpha = 0.50;
		}
		divTitle.style.opacity = alpha;
		divTitle.style.color = color;
	}
	this.setMenuColor = setMenuColor;
	function setMenuColor(color,alpha){
		if(alpha==null){
			alpha = 0.50;
		}
		divBGMenu.style.opacity = alpha;
		divBGMenu.style.backgroundColor = color;
	}
	this.setWindowColor = setWindowColor;
	function setWindowColor(color, alpha){
		if(alpha==null){
			alpha = 0.50;
		}
		divBG.style.opacity = alpha;
		divBG.style.backgroundColor = color;
	}
	this.setSize = setSize;
	function setSize(wid,hei){
		winBarHeight = 20;
		winWidth = wid;
		winHeight = hei;
		divTitle.style.top = '0px';
		divTitle.style.width = winWidth+'px';
		divTitle.style.height = winBarHeight+'px';
		divMenubar.style.top = '0px';
		divMenubar.style.width = winWidth+'px';
		divMenubar.style.height = winBarHeight+'px';
		divBGMenu.style.top = '0px';
		divBGMenu.style.width = winWidth+'px';
		divBGMenu.style.height = winBarHeight+'px';
		divBG.style.top = winBarHeight+'px';
		divBG.style.width = winWidth+'px';
		divBG.style.height = winHeight+'px';
		divContent.style.top = winBarHeight+'px';
		divContent.style.width = winWidth+'px';
		divContent.style.height = winHeight+'px';
	}
	this.setPosition = setPosition;
	function setPosition(xPos,yPos){
		winX = xPos;
		winY = yPos;
		divWindow.style.left = winX+'px';
		divWindow.style.top = winY+'px';
	}
	this.setTitle = setTitle;
	function setTitle(title){
		winTitle = title;
		divTitle.innerHTML = winTitle;
	}
	this.setParent = setParent;
	function setParent(parent){
		if(divParent!=null){
			divParent.removeChild(divWindow);
		}
		divParent = parent;
		divParent.appendChild(divWindow);
	}
	this.setDepth = setDepth;
	function setDepth(val){
		depth = val;
		divWindow.style.zIndex = depth;
	}
	this.setDepthTop = setDepthTop;
	function setDepthTop(){
		Win.DEPTH_TOP += 1;
		setDepth(Win.DEPTH_TOP);
	}
	//
	this.setContent = setContent;
	function setContent(obj){
		while( divContent.hasChildNodes() ){
		    divContentremoveChild(node.lastChild);
		}
		//divContent.innerHTML = obj;
		divContent.appendChild(obj);
	}
	this.setContentColor = setContentColor;
	function setContentColor(color,alpha){
		if(alpha==null){
			alpha = 0.50;
		}
		divContent.style.opacity = alpha;
		divContent.style.color = color;
	}
	// interaction functions
// START
	this.startDragMenu = startDragMenu;
	function startDragMenu(e){
		if(!isDragging){
			dragStartX = winX; dragStartY = winY;
			dragOffsetX = e.pageX; dragOffsetY = e.pageY;
			setDepthTop();
			isDragging = true;
		}
		return false;
	}
// ENTER FRAME 
	this.checkMouseMove = checkMouseMove;
	function checkMouseMove(e){
		if(isDragging){
			setPosition(dragStartX+(e.pageX-dragOffsetX),dragStartY+(e.pageY-dragOffsetY));
		}
	}
// STOP
	this.stopDragMenu = stopDragMenu;
	function stopDragMenu(e){
		if(isDragging){
			isDragging = false;
			setPosition(dragStartX+(e.pageX-dragOffsetX),dragStartY+(e.pageY-dragOffsetY));
			document.selection.empty();
		}
		return false;
	}
	// 
}



