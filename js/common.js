function ifClick(mx, my, x, y, w, h) {
	if (mx >= x && mx <= x + w && my >= y - 10 && my <= y + h ) {
		return true;
	}
	return false;
}

function tip(){
	ctx_u.clearRect(0, 0, canWid, canHei); 
	time--; 
	if(time == 0){
		num = 0;
		result = "TOTAL:" + (level-1);
		for(var i = 0; i < 9; i++) {
			if(gameButton[i].y != Button33Y[i]) {
				Button33Y[i] = gameButton[i].y;
			}
			gameButton[i].used = false;
		}
		window.clearInterval(loopID);
	}
	canUApp.drawGameButton();
}

function playSong(){
	if(song < resultMusic.length) {
		if(resultMusic[song] != 0) {
			resource[resultMusic[song]].play();
		}
		song++;
	}
	else {
		song = 0;
		ifpause = 0;        	
		ctx_u.clearRect(0, 0, canWid, canHei); 
		canUApp.drawMusicButton();
		window.clearInterval(musicID);
	}
}

function playKey(){
	resource[nowKey].play();
}

function roudedRec(x, y, w, h, r, ctx, R, G, B){
	ctx.beginPath();
	ctx.moveTo(x + r, y);            
	ctx.arcTo(x + w, y, x + w, y + h, r);  
	ctx.arcTo(x + w, y + h, x, y + h, r); 
	ctx.arcTo(x, y + h, x, y, r); 
	ctx.arcTo(x, y, x + w, y, r);  
	ctx.closePath();
	ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ",1)";
	ctx.fill();
}