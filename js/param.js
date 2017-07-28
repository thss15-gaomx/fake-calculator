// *******************************************************变量、类**********************
var canvas_up, canvas_bottom;   //画布
var ctx_u, ctx_b;   //两个画笔
var canWid, canHei;  //画布的宽高
var gameStatus = 0;  //游戏状态 0：开始界面 1：fake 2：24 3：music 4：calculator
var nowButton;
var loopID; //24点计时器id
var level = 1, result = 0;      //和数据对象（计算分值）
var maxlevel = 30;    //fake最大关卡数
var begin = [0,0,3,0,4321,50,171,0,0,0,15,0,0,0,0,0,0,11,2,0,0,0,0,14,111,34,15,0,8,7,0,0];   //fake中result的初始值
var constmoves = [0,3,3,4,3,4,4,5,3,3,4,5,4,4,4,6,5,5,4,4,3,3,4,5,6,5,3,4,5,5,7,0];    //fake中moves的初始值
var goal = [0,8,4,64,4,9,23,2,101,56,10,210,11,222,93,2321,24,29,15,-85,9,144,-13,12,126,3,21,102,9,81,28,0];  //fake中goal值
var moves = 0, time = 0, mode = 1;
var num = 0;    //24点随机出题
var nowaction = 0;
var numshow = "0", prenum = 0;    //计算器
var operate = 0;   //判断输入状态的标志
var calcul = 0;    //判断计算状态的标志
var quit = 0;      //防止重复按键的标志
const areaX = 0, areaY = 50; //游戏框的位置
const areaW = 400, areaH = 500;  //游戏框的大小
const screenX = 25, screenY = 75; 
const screenW = 350, screenH = 200; 
const inner_screenX = 50, inner_screenY = 130; 
const inner_screenW = 300, inner_screenH = 115; 
const shadowX = 50, shadowY = 125; 
const shadowW = 300, shadowH = 120; 
const logoX = 60, logoY = 160;
const movesX = 160, movesY = 135;
const movesW = 80, movesH = 35;
const goalX = 255, goalY = 135;
const goalW = 80, goalH = 35;
const levelX = 60, levelY = 105;
const batteryX = 230, batteryY = 85;
const batteryW = 100, batteryH = 30;
const inner_batteryX = 231, inner_batteryY = 90;
const inner_batteryW = 98, inner_batteryH = 24;
const shadow_batteryX = 231, shadow_batteryY = 86;
const shadow_batteryW = 98, shadow_batteryH = 28;
const buttonX = 25, buttonY = 300;    //按键左上角位置
var startButton11Ob,startButton12Ob,startButton13Ob,startButton21Ob,startButton22Ob,
	startButton23Ob,startButton31Ob,startButton32Ob,startButton33Ob;
var gameButton11Ob,gameButton12Ob,gameButton13Ob,gameButton21Ob,gameButton22Ob,
	gameButton23Ob,gameButton31Ob,gameButton32Ob,gameButton33Ob;
var calButton11Ob,calButton12Ob,calButton13Ob,calButton14Ob,calButton21Ob,
	calButton22Ob,calButton23Ob,calButton24Ob,calButton31Ob,calButton32Ob,
	calButton33Ob,calButton34Ob,calButton41Ob,calButton42Ob,calButton43Ob,
	calButton44Ob,calButton51Ob,calButton52Ob,calButton53Ob,calButton54Ob;
var musicButton11Ob, musicButton12Ob, musicButton13Ob, musicButton21Ob, musicButton22Ob,
	musicButton23Ob, musicButton31Ob, musicButton32Ob, musicButton33Ob, musicButton41Ob,
	musicButton42Ob, musicButton43Ob, musicButton51Ob, musicButton52Ob, musicButton53Ob
var startButton = [], gameButton = [], calButton = [], musicButton = [];
var Button33Y = [], Button54Y = [], Button53Y = [];
var musicID;  //音乐计时器id
var ifpause = 0; //是否暂停音乐
var nowKey = 0;  //音乐模式一中点击的音符
var upkey = 1;  //升降调
var musicState = 0;  //音乐模式为一或二
var resultMusic = [];  //储存一串音符
var resource = [];   //音频文件数组
var song = 0;   //音乐模式二中当前播放的音符
var helping = 0;   //fake模式下是否在讲解界面
var HELP = 0;  // 开始界面是否点击help按钮
var next = 0;  //开始界面当前instruction


//********************************************************************//定义按钮类****************************
var buttonObject = function(row, column, r, g, b){
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.row = row;
	this.column = column;
	this.text = [];
	this.r = r;
	this.g = g;
	this.b = b;
	this.pos = 0;
	this.used = false;
}
buttonObject.prototype.init = function(rows, columns){
	var columnArea = (areaW + areaX - buttonX) / columns;
	var rowArea = (areaH + areaY - buttonY) / rows;
	this.x = buttonX + (this.column - 1) * columnArea;
	this.y = buttonY + (this.row - 1) * rowArea;
	this.w = columnArea * 0.8;
	this.h = rowArea * 0.7;
	this.pos = (this.row - 1) * columns + this.column - 1;
}
buttonObject.prototype.drawButton = function(){
	var text, posY;
	switch (gameStatus){
		case 0:
			text = this.text[0];
			posY = Button33Y[this.pos];
			break;
		case 1:
			if(helping == 1){
				text = this.text[0];
			}
			else{
				text = this.text[level];
			}
			posY = Button33Y[this.pos];
			break;
		case 2:
			text = this.text[num];
			posY = Button33Y[this.pos];
			break;
		case 3:
			text = this.text[ifpause];
			posY = Button53Y[this.pos];
			break;
		case 4:
			text = this.text[0];
			posY = Button54Y[this.pos];
			break;
	}
	if(text == "$"){
		roudedRec(this.x, this.y, this.w, this.h, 10, ctx_u, 203, 196, 185);
		roudedRec(this.x, this.y + 3, this.w, this.h - 6, 10, ctx_u, 180, 174, 164);
	}
	else{
		roudedRec(this.x, this.y, this.w, this.h, 10, ctx_u, this.r + 15, this.g - 35, this.b - 35);
		roudedRec(this.x, posY - 10, this.w, this.h, 10, ctx_u, this.r, this.g, this.b);
		ctx_u.font = '20px verdana';
		ctx_u.textAlign = 'center';
		ctx_u.fillStyle="rgba(255, 235, 205, 1)";
		ctx_u.fillText(text, this.x + this.w / 2, posY+ (this.h + 20) / 2 - 10);
		ctx_u.textAlign = 'left';
	}
}


	