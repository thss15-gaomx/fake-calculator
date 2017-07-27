// *******************************************************底层画布上绘制东西**********************
window.canBApp = {};
// *************************************************************画背景****************************************
canBApp.drawBackgorund = function(){
	roudedRec(areaX, areaY, areaW, areaH, 30, ctx_b, 255, 235, 205);
	roudedRec(screenX, screenY, screenW, screenH, 10, ctx_b, 55, 60, 64);
	roudedRec(shadowX, shadowY, shadowW, shadowH, 10, ctx_b, 106, 116, 107);
	roudedRec(inner_screenX, inner_screenY, inner_screenW, inner_screenH, 10, ctx_b, 165, 183, 162);
	roudedRec(movesX, movesY, movesW, movesH, 5, ctx_b, 78, 81, 78);
	roudedRec(goalX, goalY, goalW, goalH, 5, ctx_b, 78, 81, 78);
	ctx_b.font = "23px verdana";
	ctx_b.fillStyle = "rgba(78, 81, 78)";
	ctx_b.fillText("(●ﾟωﾟ●)",logoX, logoY);
	roudedRec(batteryX, batteryY, batteryW, batteryH, 5, ctx_b, 0, 0, 0);
	roudedRec(shadow_batteryX, shadow_batteryY, shadow_batteryW, shadow_batteryH, 4, ctx_b, 73, 50, 48);
	roudedRec(inner_batteryX, inner_batteryY, inner_batteryW, inner_batteryH, 4, ctx_b, 101, 57, 51);

	ctx_b.lineWidth=2;
	ctx_b.strokeStyle="rgba(255, 255, 255, "+ 0.2 +")";
	ctx_b.beginPath();
	ctx_b.moveTo(inner_batteryX + 0.25 * inner_batteryW, shadow_batteryY);
	ctx_b.lineTo(inner_batteryX + 0.25 * inner_batteryW, shadow_batteryY + shadow_batteryH);
	ctx_b.stroke();

	ctx_b.beginPath();
	ctx_b.moveTo(inner_batteryX + 0.5 * inner_batteryW, shadow_batteryY);
	ctx_b.lineTo(inner_batteryX + 0.5 * inner_batteryW, shadow_batteryY + shadow_batteryH);
	ctx_b.stroke();

	ctx_b.beginPath();
	ctx_b.moveTo(inner_batteryX + 0.75 * inner_batteryW, shadow_batteryY);
	ctx_b.lineTo(inner_batteryX + 0.75 * inner_batteryW, shadow_batteryY + shadow_batteryH);
	ctx_b.stroke();
	
}

//***********************************************************************上层画布上绘制东西****************
window.canUApp = {};
// *************************************************************画开始按钮****************************************
canUApp.drawStartButton = function(){
	startButton11Ob.drawButton();
	startButton12Ob.drawButton();
	startButton13Ob.drawButton();
	startButton21Ob.drawButton();
	startButton22Ob.drawButton();
	startButton23Ob.drawButton();
	startButton31Ob.drawButton();
	startButton32Ob.drawButton();
	startButton33Ob.drawButton();

	if(HELP == 1){
		canUApp.drawStartHelp();
	}
	else{
		if(next > 0){
			canUApp.drawInstructions();
		}
		else{
			canUApp.drawResult();
		}
	}
	canUApp.drawMoves();
	canUApp.drawGoal();
}

canUApp.drawGameButton = function(){
	gameButton11Ob.drawButton();
	gameButton12Ob.drawButton();
	gameButton13Ob.drawButton();
	gameButton21Ob.drawButton();
	gameButton22Ob.drawButton();
	gameButton23Ob.drawButton();
	gameButton31Ob.drawButton();
	gameButton32Ob.drawButton();
	gameButton33Ob.drawButton();

	canUApp.drawLevel();
	canUApp.drawGoal();
	if(gameStatus == 1){
		canUApp.drawMoves();
		if(helping == 0){
			canUApp.drawResult();
		}
		else{
			canUApp.drawHelp();
		}
	}
	else if(gameStatus == 2){
		canUApp.drawTime();
		canUApp.drawResult();
	}
}

canUApp.drawMusicButton = function() {
    musicButton11Ob.drawButton();
    musicButton12Ob.drawButton();
    musicButton13Ob.drawButton();
    musicButton21Ob.drawButton();
    musicButton22Ob.drawButton();
    musicButton23Ob.drawButton();
    musicButton31Ob.drawButton();
    musicButton32Ob.drawButton();
    musicButton33Ob.drawButton();
    musicButton41Ob.drawButton();
    musicButton42Ob.drawButton();
    musicButton43Ob.drawButton();
    musicButton51Ob.drawButton();
    musicButton53Ob.drawButton();
    canUApp.drawMusicResult();
    canUApp.drawGoal();
    canUApp.drawMoves();
}

canUApp.drawCalButton = function(){
	calButton11Ob.drawButton();
	calButton12Ob.drawButton();
	calButton13Ob.drawButton();
	calButton14Ob.drawButton();
	calButton21Ob.drawButton();
	calButton22Ob.drawButton();
	calButton23Ob.drawButton();
	calButton24Ob.drawButton();
	calButton31Ob.drawButton();
	calButton32Ob.drawButton();
	calButton33Ob.drawButton();
	calButton34Ob.drawButton();
	calButton41Ob.drawButton();
	calButton42Ob.drawButton();
	calButton43Ob.drawButton();
	calButton44Ob.drawButton();
	calButton51Ob.drawButton();
	calButton52Ob.drawButton();
	calButton53Ob.drawButton();
	calButton54Ob.drawButton();

	canUApp.drawLevel();
	canUApp.drawMode();
	canUApp.drawNum();
}

canUApp.drawLevel = function() {
	ctx_u.font = "italic 20px verdana";
	ctx_u.fillStyle = "white";
	if(gameStatus == 1){
		if(level == (maxlevel + 1)){
			ctx_u.fillText("CHEERS!", levelX, levelY);
		}
		else{
			ctx_u.fillText("LEVEL:" + level, levelX, levelY);
		}
	}
	else if(gameStatus == 2){
		ctx_u.fillText("LEVEL:" + level, levelX, levelY);
	}
	else if(gameStatus == 4){
		ctx_u.fillText("CALCULATE", levelX, levelY);
	}
}

canUApp.drawResult = function() {
	if(result == "24Points In 60s"){
		ctx_u.font = "38px verdana";
	}
	else if(result == "TOTAL:" + (level - 1)){
		ctx_u.font = "70px verdana";
	}
	else{
		ctx_u.font = "75px verdana";
	}
	ctx_u.textAlign = "right";
	ctx_u.fillStyle = "rgba(121, 132, 119, 1)";
	ctx_u.fillText(result, inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	ctx_u.textAlign ="left";
}

canUApp.drawInstructions = function() {
	ctx_u.font="20px verdana";
	ctx_u.textAlign = "right";
	ctx_u.fillStyle = "rgba(121,132,119,1)";
	if(next==1) {
		ctx_u.fillText("FAKE:use limited moves ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 30);
		ctx_u.fillText("to reach goal ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	}
	else if(next==2) {
		
		ctx_u.fillText("24:24 Points in 60s ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 25);
	}
	else if(next==3) {
		ctx_u.fillText("MUSIC:use a calculator  ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 30);
		ctx_u.fillText("like a piano ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	}
	else if(next==4) {
		ctx_u.fillText("CAL:I am a real calculator ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 25);
	}
}
canUApp.drawStartHelp = function() {
	ctx_u.font="25px verdana";
	ctx_u.textAlign = "right";
	ctx_u.fillStyle = "rgba(121,132,119,1)";
	ctx_u.fillText("Click NEXT to see ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 30);
	ctx_u.fillText("the instructions ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	ctx_u.textAlign ="left";
}
canUApp.drawHelp = function() {
	ctx_u.font="20px verdana";
	ctx_u.textAlign = "right";
	ctx_u.fillStyle = "rgba(121,132,119,1)";
	if(level==4) {        
		ctx_u.fillText(">>:It deletes a number ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 30);
		ctx_u.fillText("from the result ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	}
	else if(level==8) {
		ctx_u.fillText("1, 0:It inserts a number ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 30);
		ctx_u.fillText("into the result ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	}
	else if(level==13) {
		ctx_u.fillText("2->1:Numbers in the result ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 30);
		ctx_u.fillText("convert to new numbers ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	}
	else if(level==22) {
		ctx_u.fillText("+/-:Change the sign ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 30);
		ctx_u.fillText("of a number",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	}
	else if(level==26) {
		ctx_u.fillText("Reverse:Now you can ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 30);
		ctx_u.fillText("reverse the result ",inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	}                   
	ctx_u.textAlign ="left";
}

canUApp.drawMusicResult = function() {
	ctx_u.font = "70px verdana";
	ctx_u.textAlign = "right";
	ctx_u.fillStyle = "rgba(121,132,119,1)";
	if(musicState == 0) {
		if(nowKey == 0) {
			ctx_u.font = "70px verdana";
			ctx_u.fillText(nowKey,inner_screenX + inner_screenW,inner_screenY + inner_screenH - 5);
		}
		else if(nowKey > 7 && nowKey < 15) {
			ctx_u.font = "70px verdana";
			ctx_u.fillText((nowKey - 7),inner_screenX + inner_screenW,inner_screenY + inner_screenH - 5);
		}
		else if(nowKey > 14 && nowKey < 22) {
			ctx_u.font = "80px verdana";
			ctx_u.fillText((nowKey - 14),inner_screenX + inner_screenW,inner_screenY + inner_screenH - 5);
		}
		else {
			ctx_u.font = "60px verdana";
			ctx_u.fillText(nowKey,inner_screenX + inner_screenW,inner_screenY + inner_screenH - 5);
		}
	}
	else {
		for(var i = 0; i <= 6 && i < resultMusic.length; i++) {
			if(resultMusic[resultMusic.length - i - 1] == 0) {
				ctx_u.font = "70px verdana";
				ctx_u.fillText(resultMusic[resultMusic.length - i - 1], inner_screenX + inner_screenW - i * 40, inner_screenY + inner_screenH - 5);
			}
			else if((resultMusic[resultMusic.length - i - 1] > 7 && resultMusic[resultMusic.length - i - 1] < 15) || resultMusic[resultMusic.length - i - 1] == 0) {
					ctx_u.font = "70px verdana";
					ctx_u.fillText(resultMusic[resultMusic.length - i - 1] - 7, inner_screenX + inner_screenW - i * 40, inner_screenY + inner_screenH - 5);
			}
			else if(resultMusic[resultMusic.length - i - 1] > 14 && resultMusic[resultMusic.length - i - 1] < 22) {
				ctx_u.font = "80px verdana";
				ctx_u.fillText(resultMusic[resultMusic.length - i - 1] - 14, inner_screenX + inner_screenW - i * 40, inner_screenY + inner_screenH - 5);
			}
			else {
				ctx_u.font = "60px verdana";
				ctx_u.fillText(resultMusic[resultMusic.length - i - 1], inner_screenX + inner_screenW - i * 40, inner_screenY + inner_screenH - 5);
			}
		}
	}
	ctx_u.textAlign ="left";
}

canUApp.drawNum = function() {
	if(numshow == "a fake PAINT" || numshow == "a fake ALT"){
		ctx_u.font = "40px verdana";
		ctx_u.textAlign = "right";
		ctx_u.fillStyle = "rgba(121, 132, 119, 1)";
		ctx_u.fillText(numshow, inner_screenX + inner_screenW, inner_screenY + inner_screenH - 5);
	}
	else{
		ctx_u.font = "60px verdana";
		ctx_u.textAlign = "right";
		ctx_u.fillStyle = "rgba(121, 132, 119, 1)";
		for(var i = 0; i <= 7 && i < numshow.length; i++) {
			ctx_u.fillText(numshow[numshow.length - i - 1], inner_screenX + inner_screenW - i * 35, inner_screenY + inner_screenH - 5);
		}
	}
	ctx_u.textAlign ="left";
}

canUApp.drawMoves = function() {
	ctx_u.textAlign = "center";
	ctx_u.font = "15px verdana";
	ctx_u.fillStyle = "rgba(165,183,162,1)";
	if(gameStatus == 0) {
		ctx_u.fillText("MOVES:" + constmoves[0], movesX + movesW / 2, movesY + (movesH + 15) / 2);
	}
	else if(gameStatus == 1) {
		ctx_u.fillText("MOVES:" + moves, movesX + movesW/2, movesY + (movesH + 15) / 2);
	}
	else if(gameStatus==3) {
		ctx_u.fillText("MODE:"+(musicState+1),movesX+movesW/2,movesY+(movesH+15)/2);
	}
	ctx_u.textAlign="left";
}

canUApp.drawTime = function() {
	ctx_u.textAlign = "center";
	ctx_u.font = "15px verdana";
	ctx_u.fillStyle = "rgba(165,183,162,1)";
	ctx_u.fillText("Time:" + time, movesX + movesW / 2, movesY + (movesH + 15) / 2);
	ctx_u.textAlign="left";
}

canUApp.drawMode = function() {
	ctx_u.textAlign = "center";
	ctx_u.font = "15px verdana";
	ctx_u.fillStyle = "rgba(165,183,162,1)";
	ctx_u.fillText("Mode: 1", movesX + movesW / 2, movesY + (movesH + 15) / 2);
	if(gameStatus == 4){
		ctx_u.fillText("CAL", goalX + goalW / 2, goalY + (goalH + 15) / 2);
	}
	ctx_u.textAlign="left";
}

canUApp.drawGoal = function() {
	ctx_u.textAlign = "center";
	ctx_u.font = "15px verdana";
	ctx_u.fillStyle = "rgba(165,183,162,1)";
	if(gameStatus == 0) {
		ctx_u.fillText("GOAL:" + goal[0], goalX + goalW / 2, goalY + (goalH + 15) / 2);
	}
	else if(gameStatus == 1) {
		ctx_u.fillText("GOAL:" + goal[level], goalX + goalW / 2, goalY + (goalH + 15) / 2);
	}
	else if(gameStatus == 2){
		ctx_u.fillText("GOAL:" + 24, goalX + goalW / 2, goalY + (goalH + 15) / 2);
	}
	else if(gameStatus==3) {
		if(musicState==0) {
			ctx_u.fillText("KEYS:1",goalX+goalW/2,goalY+(goalH+15)/2);
		}
		else {
			ctx_u.fillText("KEYS:"+resultMusic.length,goalX+goalW/2,goalY+(goalH+15)/2);
		}
	}
	ctx_u.textAlign="left";
}

	
