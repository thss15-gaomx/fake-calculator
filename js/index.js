(function(){
	var canvas_up, canvas_bottom;   //画布
	var ctx_u, ctx_b;   //两个画笔
	var canWid, canHei;  //画布的宽高
	var gameStatus = 0;  //游戏状态 0：开始界面 1：fake 2：24 3：music 4：calculator
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
	var ifpause = 0;
	var nowKey = 0;
	var upkey = 1;
	var musicState = 0;
	var resultMusic = [];
	var resource = [];
	var song = 0;
	var helping = 0;
	var HELP = 0;
	var next = 0;

	// **********************************************************************************全局函数、初始化、判断等*******
	// *****************************************************************************************************************
	window.cal = {};
	// *************************************************************************初始化、下层画布绘制*******
	cal.StartDraw = function(){
		canvas_up = document.getElementById('canvas_up');
		ctx_u = canvas_up.getContext('2d');  //上面的canvas
		canvas_bottom = document.getElementById('canvas_bottom');
		ctx_b = canvas_bottom.getContext('2d');   //下面的canvas
		canvas_up.addEventListener('mousedown', cal.mousedown, false);
		canvas_up.addEventListener('mouseup', cal.mouseup, false);

		canWid = canvas_up.width;
		canHei = canvas_up.height;

		cal.initStartButton();
		canBApp.drawBackgorund();
		canUApp.drawStartButton();
	}

	cal.initStartButton = function(){
		ctx_u.fillStyle = 'white';
		ctx_u.font = '20px 微软雅黑';

		ctx_b.shadowBlur = 0;
		ctx_b.shadowColor = "black";

		startButton11Ob = new buttonObject(1, 1, 236, 119, 166);
		startButton11Ob.init(3, 3);
		startButton11Ob.text[0] = "HELP";
		startButton12Ob = new buttonObject(1, 2, 226, 188, 28);
		startButton12Ob.init(3, 3);
		startButton12Ob.text[0] = "CAL";
		startButton13Ob = new buttonObject(1, 3, 255, 255, 255);
		startButton13Ob.init(3, 3);
		startButton13Ob.text[0] = "$";
		startButton21Ob = new buttonObject(2, 1, 36, 161, 156);
		startButton21Ob.init(3, 3);
		startButton21Ob.text[0] = "24";
		startButton22Ob = new buttonObject(2, 2, 69, 73, 76);
		startButton22Ob.init(3, 3);
		startButton22Ob.text[0] = "FAKE";
		startButton23Ob = new buttonObject(2, 3, 198, 46, 46);
		startButton23Ob.init(3, 3);
		startButton23Ob.text[0] = "MUSIC";
		startButton31Ob = new buttonObject(3, 1, 255, 255, 255);
		startButton31Ob.init(3, 3);
		startButton31Ob.text[0] = "$";
		startButton32Ob = new buttonObject(3, 2, 255, 255, 255);
		startButton32Ob.init(3, 3);
		startButton32Ob.text[0] = "$";
		startButton33Ob = new buttonObject(3, 3, 236, 108, 22);
		startButton33Ob.init(3, 3);
		startButton33Ob.text[0] = "NEXT";

		startButton = [startButton11Ob, startButton12Ob, startButton13Ob, startButton21Ob,
			startButton22Ob, startButton23Ob, startButton31Ob, startButton32Ob, startButton33Ob]

		for(var i = 0; i < 9; i++){
			Button33Y[i] = startButton[i].y;
		}
	}

	cal.initGameButton = function(){
		gameButton11Ob = new buttonObject(1, 1, 236, 119, 166);
		gameButton11Ob.init(3, 3);
		gameButton11Ob.text[0] = "$";
		gameButton11Ob.text[31] = "<-";
		gameButton12Ob = new buttonObject(1, 2, 226, 188, 28);
		gameButton12Ob.init(3, 3);
		gameButton12Ob.text = ["$","+2","+4","+2","$","/5","x2","+4","1","1","0",
		"+5","12","1","+6","1","+9","/2","/3","+6","-1","-1","+3","6","x3","-5","+9","10","x3","-9","+6","$"];
		gameButton13Ob = new buttonObject(1, 3, 0, 171, 231);
		gameButton13Ob.init(3, 3);
		gameButton13Ob.text[0] = "$";
		gameButton13Ob.text[31] = "$";
		gameButton21Ob = new buttonObject(2, 1, 36, 161, 156);
		gameButton21Ob.init(3, 3);
		gameButton21Ob.text[0] = "$";
		gameButton21Ob.text[31] = "$";
		gameButton22Ob = new buttonObject(2, 2, 69, 73, 76);
		gameButton22Ob.init(3, 3);
		gameButton22Ob.text = ["$","+3","x4","x4","$","x3","-9","x9","0","+5","+2",
		"+5","$","$","x7","2","x2","+3","1","5","-2","2","-7","+5","-9","+8","x5","x4","1","x3","-3","$"];
		gameButton23Ob = new buttonObject(2, 3, 198, 46, 46);
		gameButton23Ob.init(3, 3);
		gameButton23Ob.text = ["$","$","$","$",">>",">>",">>",">>","$","$","$",
		"2",">>","1->2","6->9","1->2","8->4","1->2","4->5","$","^2","^2","+/-","+/-","+/-","+/-","REVERSE","REVERSE","REVERSE","+/-","REVERSE","$"];
		gameButton31Ob = new buttonObject(3, 1, 0, 99, 145);
		gameButton31Ob.init(3, 3);
		gameButton31Ob.text[0] = "$";
		gameButton31Ob.text[31] = "RETURN";
		gameButton32Ob = new buttonObject(3, 2, 82, 181, 91);
		gameButton32Ob.init(3, 3);
		gameButton32Ob.text = ["$","$","/4","$","$","$","$","$","$","$","/5",
		"5","$","$","$","$","$","$","x2","-7","$","$","$","/8","$","/7","$","+5","/5","+4","$","$"];
		gameButton33Ob = new buttonObject(3, 3, 236, 108, 22);
		gameButton33Ob.init(3, 3);
		gameButton33Ob.text = ["OK","$","$","$","$","$","$","$","$","$","$",
		"$","$","$","$","2->3","$","2->9","$","$","$","$","$","$",">>","$","$","$","$","REVERSE",">>","$"];

		for(var i = 1; i <= 30; i++){
			gameButton11Ob.text[i] = "<-";
			gameButton13Ob.text[i] = "CLR";
			gameButton21Ob.text[i] = "->";
			gameButton31Ob.text[i] = "RETURN";
		}

		gameButton = [gameButton11Ob, gameButton12Ob, gameButton13Ob, gameButton21Ob,
			gameButton22Ob, gameButton23Ob, gameButton31Ob, gameButton32Ob, gameButton33Ob];

	}

	cal.init24Button = function(){
		gameButton11Ob = new buttonObject(1, 1, 236, 119, 166);
		gameButton11Ob.init(3, 3);
		gameButton11Ob.text = ["$", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", 
									"1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "4", "5", "5", "7", "5","$"];
		gameButton12Ob = new buttonObject(1, 2, 226, 188, 28);
		gameButton12Ob.init(3, 3);
		gameButton12Ob.text = ["$", "1", "1", "1", "1", "1", "1", "1", "1", "1", "2", "2", "2", "2", "2", "2", 
									"2", "2", "2", "2", "3", "3", "3", "4", "4", "5", "7", "5", "5", "8", "8","$"];
		gameButton13Ob = new buttonObject(1, 3, 0, 171, 231);
		gameButton13Ob.init(3, 3);
		gameButton13Ob.text = ["$"];
		gameButton21Ob = new buttonObject(2, 1, 36, 161, 156);
		gameButton21Ob.init(3, 3);
		gameButton21Ob.text = ["$", "3", "3", "4", "4", "4", "5", "6", "7", "8", "2", "2", "3", "3", "3", "4", 
									"4", "4", "5", "6", "5", "7", "8", "4", "8", "9", "8", "6", "8", "10", "8","$"];
		gameButton22Ob = new buttonObject(2, 2, 69, 73, 76);
		gameButton22Ob.init(3, 3);
		gameButton22Ob.text = ["START", "6", "7", "4", "5", "10", "5", "9", "10", "8", "8", "9", "7", "8", "9", "5", 
									"7", "10", "7", "10", "9", "9", "10", "7", "8", "9", "8", "8", "10", "10", "10","$"];
		gameButton23Ob = new buttonObject(2, 3, 198, 46, 46);
		gameButton23Ob.init(3, 3);
		gameButton23Ob.text = ["$"]; 
		gameButton31Ob = new buttonObject(3, 1, 0, 99, 145);
		gameButton31Ob.init(3, 3);
		gameButton31Ob.text = ["RETURN"];
		gameButton32Ob = new buttonObject(3, 2, 82, 181, 91);
		gameButton32Ob.init(3, 3);
		gameButton32Ob.text = ["$"];
		gameButton33Ob = new buttonObject(3, 3, 236, 108, 22);
		gameButton33Ob.init(3, 3);
		gameButton33Ob.text = ["$"];
		
		for(var i = 1; i <= 30; i++){
			gameButton31Ob.text[i] = "RETURN";
			gameButton13Ob.text[i] = "+";
			gameButton23Ob.text[i] = "-";
			gameButton33Ob.text[i] = "x";
			gameButton32Ob.text[i] = "/";
		}

		gameButton = [gameButton11Ob, gameButton12Ob, gameButton13Ob, gameButton21Ob,
			gameButton22Ob, gameButton23Ob, gameButton31Ob, gameButton32Ob, gameButton33Ob];
	}

	cal.initMusicButton = function() {
        musicButton11Ob = new buttonObject(1, 1, 0, 117, 63);
		musicButton11Ob.init(5,3);
		musicButton11Ob.text = ["5", "5"];

        musicButton12Ob = new buttonObject(1,2,0,99,145);
		musicButton12Ob.init(5,3);
		musicButton12Ob.text = ["6", "6"];
		
        musicButton13Ob = new buttonObject(1,3,176,123,179);
		musicButton13Ob.init(5,3);
		musicButton13Ob.text = ["7", "7"];
	
        musicButton21Ob = new buttonObject(2,1,144,203,149);
		musicButton21Ob.init(5,3);
		musicButton21Ob.text = ["2", "2"];
		
        musicButton22Ob = new buttonObject(2,2,69,116,186);
		musicButton22Ob.init(5,3);
		musicButton22Ob.text = ["3", "3"];
		
        musicButton23Ob = new buttonObject(2,3,236,119,166);
		musicButton23Ob.init(5,3);
		musicButton23Ob.text = ["4", "4"];
		
        musicButton31Ob = new buttonObject(3,1,226,188,28);
		musicButton31Ob.init(5,3);
		musicButton31Ob.text = ["-", "-"];
	
        musicButton32Ob = new buttonObject(3,2,0,171,231);
		musicButton32Ob.init(5,3);
		musicButton32Ob.text = ["1", "1"];
	
        musicButton33Ob = new buttonObject(3,3,36,161,156);
		musicButton33Ob.init(5,3);
		musicButton33Ob.text = ["+", "+"];
		
        musicButton41Ob = new buttonObject(4,1,69,73,76);
		musicButton41Ob.init(5,3);
		musicButton41Ob.text = ["DELETE", "DELETE"];
		
        musicButton42Ob = new buttonObject(4,2,198,46,46);
		musicButton42Ob.init(5,3);
		musicButton42Ob.text = ["0", "0"];
		
        musicButton43Ob = new buttonObject(4,3,0,99,145);
		musicButton43Ob.init(5,3);
		musicButton43Ob.text = ["PLAY", "PAUSE"];
	
        musicButton51Ob = new buttonObject(5,1,82,181,91);
		musicButton51Ob.init(5,3);
		musicButton51Ob.text = ["RETURN", "RETURN"];

		musicButton52Ob = false;

        musicButton53Ob = new buttonObject(5,3,236,108,22);
		musicButton53Ob.init(5,3);
		musicButton53Ob.text = ["ALT", "ALT"];

		musicButton = [musicButton11Ob, musicButton12Ob, musicButton13Ob, musicButton21Ob, musicButton22Ob,
					musicButton23Ob, musicButton31Ob, musicButton32Ob, musicButton33Ob, musicButton41Ob,
					musicButton42Ob, musicButton43Ob, musicButton51Ob, musicButton52Ob, musicButton53Ob];
		
		for(var i = 0; i < 15; i++){
			if(i != 13){
				Button53Y[i] = musicButton[i].y;
			}
			else{
				Button53Y[i] = musicButton[i].y;
			}
		}
		
	}

	cal.initMusic = function(){
		bgMusic = new Audio();
		bgMusic.src = 'sound/bg.m4a';
		bgMusic.load();
		bgMusic1 = new Audio();
		bgMusic1.src = 'sound/d1.wav';
		bgMusic1.load();
		bgMusic2 = new Audio();
		bgMusic2.src = 'sound/d2.wav';
		bgMusic2.load();
		bgMusic3 = new Audio();
		bgMusic3.src = 'sound/d3.wav';
		bgMusic3.load();
		bgMusic4 = new Audio();
		bgMusic4.src = 'sound/d4.wav';
		bgMusic4.load();
		bgMusic5 = new Audio();
		bgMusic5.src = 'sound/d5.wav';
		bgMusic5.load();
		bgMusic6 = new Audio();
		bgMusic6.src = 'sound/d6.wav';
		bgMusic6.load();
		bgMusic7 = new Audio();
		bgMusic7.src = 'sound/d7.wav';
		bgMusic7.load();
		bgMusic8 = new Audio();
		bgMusic8.src = 'sound/1.wav';
		bgMusic8.load();
		bgMusic9 = new Audio();
		bgMusic9.src = 'sound/2.wav';
		bgMusic9.load();
		bgMusic10 = new Audio();
		bgMusic10.src = 'sound/3.wav';
		bgMusic10.load();
		bgMusic11 = new Audio();
		bgMusic11.src = 'sound/4.wav';
		bgMusic11.load();
		bgMusic12 = new Audio();
		bgMusic12.src = 'sound/5.wav';
		bgMusic12.load();
		bgMusic13 = new Audio();
		bgMusic13.src = 'sound/6.wav';
		bgMusic13.load();
		bgMusic14 = new Audio();
		bgMusic14.src = 'sound/7.wav';
		bgMusic14.load();
		bgMusic15 = new Audio();
		bgMusic15.src = 'sound/g1.wav';
		bgMusic15.load();
		bgMusic16 = new Audio();
		bgMusic16.src = 'sound/g2.wav';
		bgMusic16.load();
		bgMusic17 = new Audio();
		bgMusic17.src = 'sound/g3.wav';
		bgMusic17.load();
		bgMusic18 = new Audio();
		bgMusic18.src = 'sound/g4.wav';
		bgMusic18.load();
		bgMusic19 = new Audio();
		bgMusic19.src = 'sound/g5.wav';
		bgMusic19.load();
		bgMusic20 = new Audio();
		bgMusic20.src = 'sound/g6.wav';
		bgMusic20.load();
		bgMusic21 = new Audio();
		bgMusic21.src = 'sound/g7.wav';
		bgMusic21.load();

		
        resource=[bgMusic,bgMusic1,bgMusic2,bgMusic3,bgMusic4,bgMusic5,bgMusic6,
                    bgMusic7,bgMusic8,bgMusic9,bgMusic10,bgMusic11,bgMusic12,bgMusic13,
                    bgMusic14,bgMusic15,bgMusic16,bgMusic17,bgMusic18,bgMusic19,bgMusic20,bgMusic21];
	}

	cal.initCalButton = function(){
		calButton11Ob = new buttonObject(1, 1, 160, 128, 36);
		calButton11Ob.init(5, 4);
		calButton11Ob.text[0] = "7";
		calButton12Ob = new buttonObject(1, 2, 0, 117, 63); 
		calButton12Ob.init(5, 4);
		calButton12Ob.text[0] = "8";
		calButton13Ob = new buttonObject(1, 3, 0, 99, 145);
		calButton13Ob.init(5, 4);
		calButton13Ob.text[0] = "9";
		calButton14Ob = new buttonObject(1, 4, 236, 108, 22);
		calButton14Ob.init(5, 4);
		calButton14Ob.text[0] = "+";
		calButton21Ob = new buttonObject(2, 1, 200, 191, 0);
		calButton21Ob.init(5, 4);
		calButton21Ob.text[0] = "4";
		calButton22Ob = new buttonObject(2, 2, 82, 181, 91);
		calButton22Ob.init(5, 4);
		calButton22Ob.text[0] = "5";
		calButton23Ob = new buttonObject(2, 3, 69, 116, 186);
		calButton23Ob.init(5, 4);
		calButton23Ob.text[0] = "6";
		calButton24Ob = new buttonObject(2, 4, 236, 108, 22);
		calButton24Ob.init(5, 4);
		calButton24Ob.text[0] = "-";
		calButton31Ob = new buttonObject(3, 1, 254, 214, 0);
		calButton31Ob.init(5, 4);
		calButton31Ob.text[0] = "1";
		calButton32Ob = new buttonObject(3, 2, 36, 161, 156);
		calButton32Ob.init(5, 4);
		calButton32Ob.text[0] = "2";
		calButton33Ob = new buttonObject(3, 3, 0, 171, 231);
		calButton33Ob.init(5, 4);
		calButton33Ob.text[0] = "3";
		calButton34Ob = new buttonObject(3, 4, 236, 108, 22);
		calButton34Ob.init(5, 4);
		calButton34Ob.text[0] = "x";
		calButton41Ob = new buttonObject(4, 1, 234, 161, 0);
		calButton41Ob.init(5, 4);
		calButton41Ob.text[0] = ".";
		calButton42Ob = new buttonObject(4, 2, 98, 193, 189);
		calButton42Ob.init(5, 4);
		calButton42Ob.text[0] = "0";
		calButton43Ob = new buttonObject(4, 3, 176, 123, 179);
		calButton43Ob.init(5, 4);
		calButton43Ob.text[0] = "ALT";
		calButton44Ob = new buttonObject(4, 4, 236, 108, 22);
		calButton44Ob.init(5, 4);
		calButton44Ob.text[0] = "/";
		calButton51Ob = new buttonObject(5, 1, 69, 73, 76);
		calButton51Ob.init(5, 4);
		calButton51Ob.text[0] = "BACK";
		calButton52Ob = new buttonObject(5, 2, 144, 203, 149);
		calButton52Ob.init(5, 4);
		calButton52Ob.text[0] = "PAINT";
		calButton53Ob = new buttonObject(5, 3, 236, 119, 166);
		calButton53Ob.init(5, 4);
		calButton53Ob.text[0] = "AC";
		calButton54Ob = new buttonObject(5, 4, 198, 46, 46);
		calButton54Ob.init(5, 4);
		calButton54Ob.text[0] = "=";

		calButton = [calButton11Ob,calButton12Ob,calButton13Ob,calButton14Ob,calButton21Ob,
					calButton22Ob,calButton23Ob,calButton24Ob,calButton31Ob,calButton32Ob,
					calButton33Ob,calButton34Ob,calButton41Ob,calButton42Ob,calButton43Ob,
					calButton44Ob,calButton51Ob,calButton52Ob,calButton53Ob,calButton54Ob];

		for(var i = 0; i < 20; i++){
			Button54Y[i] = calButton[i].y;
		}
	}

	cal.playKey = function() {
		resource[nowKey].play();
	}

	cal.getnowButton = function(e) {
        var point = canvas_up.getBoundingClientRect();
        var mx = e.clientX - point.left * (canvas_up.width / point.width);
		var my = e.clientY - point.top * (canvas_up.height / point.height);
		if(gameStatus == 0 || gameStatus == 1 || gameStatus == 2){
			for(var i = 0; i < 9; i++) {
				if(ifClick(mx, my, startButton[i].x, startButton[i].y, startButton[i].w, startButton[i].h)) {
					return i;
				}
			}
		}
		else if(gameStatus == 3) {
        	for(var i = 0; i < 15; i++) {
				if(i != 13){
					if(ifClick(mx, my, musicButton[i].x, musicButton[i].y, musicButton[i].w, musicButton[i].h)) {
						return i;
					}
				}
			}
		}
		else if(gameStatus == 4){
			for(var i = 0; i < 20; i++) {
				if(ifClick(mx, my, calButton[i].x, calButton[i].y, calButton[i].w, calButton[i].h)) {
					return i;
				}
			}
		}
	}

	cal.mousedown = function(e){
		var nowButton = cal.getnowButton(e);
	 	if(gameStatus == 0){
			if(startButton[nowButton].text[0] != "$"){  
				Button33Y[nowButton] += 10;
				ctx_u.clearRect(0, 0, canWid, canHei); 
				canUApp.drawStartButton();
			}
		}
		else if(gameStatus == 1){
			if((gameButton[nowButton].text[level] != "$" && helping == 0) || (nowButton == 8 && helping == 1)){
				ctx_u.clearRect(0, 0, canWid, canHei);   
				Button33Y[nowButton] += 10;
				canUApp.drawGameButton();
			}
		}
		else if(gameStatus == 2) {
			if(gameButton[nowButton].y == Button33Y[nowButton] && gameButton[nowButton].text[level] != "$"
			&&(result != "24Points In 60s" || (result == "24Points In 60s" && nowButton==4))) {
			    Button33Y[nowButton] += 10;
			    ctx_u.clearRect(0, 0, canWid, canHei); 
			    canUApp.drawGameButton();
			}
		}
		else if(gameStatus == 3) {
			if(musicButton[nowButton].y == Button53Y[nowButton]) {
			    Button53Y[nowButton] += 10;
			    ctx_u.clearRect(0, 0, canWid, canHei); 
			    canUApp.drawMusicButton();
		    }
		}
		else if(gameStatus == 4){
			ctx_u.clearRect(0, 0, canWid, canHei);   
			Button54Y[nowButton] += 10;
			canUApp.drawCalButton();
		}
	}

	cal.mouseup = function(e){
	 	if(gameStatus == 0){
			var nowButton = cal.getnowButton(e);
			if(startButton[nowButton].text[0] != "$"){
				ctx_u.clearRect(0, 0, canWid, canHei);  
				Button33Y[nowButton] -= 10;
				if(nowButton == 0){
					HELP = 1;
					canUApp.drawStartButton();
					HELP = 0;
					next = 0;
				}
				else if(nowButton == 1){
					gameStatus = 4;
					result = 0;
					numshow = "0";
					prenum = 0;
					quit = 1;
					mode = 1;
					calcul = 0;
					operate = 0;
					HELP = 0;
					next = 0;
					cal.initCalButton();
					canUApp.drawCalButton();
				}
				else if(nowButton == 4){
					if(level == (maxlevel + 1)){
						level = 1;
					}
					gameStatus = 1;
					result = begin[level];
					moves = constmoves[level];
					HELP = 0;
					next = 0;
					helping = 0;
					cal.initGameButton();
					canUApp.drawGameButton();
				}
				else if(nowButton == 3){
					gameStatus = 2;
					level = 1;
					result = "24Points In 60s";
					time = 60;
					nowaction = 4;
					num = 0;
					HELP = 0;
					next = 0;
					cal.init24Button();
					canUApp.drawGameButton();
				}
				else if(nowButton == 5){
					gameStatus = 3;
					HELP = 0;
					next = 0;
					cal.initMusicButton();
					cal.initMusic();
					canUApp.drawMusicButton();
				}
				else if(nowButton == 8){
					next++;
					HELP = 0;
					if(next > 4){
						next = 0;
					}
					canUApp.drawStartButton();
				}
			}
		}
		else if(gameStatus == 1){
			var nowButton = cal.getnowButton(e);
			if((gameButton[nowButton].text[level] != "$" && helping == 0) || (helping == 1 && nowButton == 8)) {
			    ctx_u.clearRect(0, 0, canWid, canHei);  		
			    Button33Y[nowButton] -= 10;
				switch(nowButton){
					case 0:
						if(level > 1) {
							level--;
						}
						result = begin[level];
						moves = constmoves[level]; 
						break;
					case 2:
						if(gameButton[nowButton].text[level] == "CLR"){
							moves = constmoves[level];
							result = begin[level];  
						}
						else if(gameButton[nowButton].text[level] == "OK") {
							gameButton[nowButton].text[level] = "CLR";
							if(level < maxlevel){
								level++;
								if(level == 4 || level == 8 || level == 13 || level == 22 || level == 26){
									helping = 1;
								}
								moves = constmoves[level];
								result = begin[level];    
							}
							else{
								level++;
								result = "CLEAR!";
							}
						}             
						break;
					case 3:
						level++;
						if(level > maxlevel){
							result = "CLEAR!";
						}
						else{
							if(level == 4 || level == 8 || level == 13 || level == 22 || level == 26){
								helping = 1;
							}
						    result = begin[level];
							moves = constmoves[level];
						}
						break;
					case 6:
						result = 0;
						helping = 0;
						gameStatus = 0;
						break;
					case 8:
						if(helping == 1){
							helping = 0;
						}
						else{
							if(result != "WIN" && result != "WRONG") {
								operations.Fakecalculate(nowButton);
							}
						}
						break;
					default:
						if(result != "WIN" && result != "WRONG") {
							operations.Fakecalculate(nowButton);
						}
						break;
				}
				if(nowButton == 6){
					canUApp.drawStartButton(); 
				}
				else{
					canUApp.drawGameButton();
				}
		    }
		}
		else if(gameStatus == 2){
			var nowButton = cal.getnowButton(e);
			if(gameButton[nowButton].text[num] != "$"){
				ctx_u.clearRect(0, 0, canWid, canHei);  		
				switch(nowButton){
					case 2:
						Button33Y[nowButton] -= 10;
						nowaction = 0;
						break;
					case 4:
						if(num == 0){
							loopID = window.setInterval(tip,1000); //设置定时器，每1s跳一次 
							num = 1 + Math.round(Math.random() * 29);
							time = 60;
							result = 0;
							level = 1;
							Button33Y[nowButton] -= 10;
						}
						else{
							if(gameButton[nowButton].used == false){
								gameButton[nowButton].used = true;
								operations.Game24calculate(nowButton);
							}
						}
						break;
					case 5:
						Button33Y[nowButton] -= 10;
						nowaction = 1;
						break;
					case 6:
						window.clearInterval(loopID);
						for(var i = 0; i < 9; i++) {
							if(gameButton[i].y != Button33Y[i]) {
								Button33Y[i] -=10;
							}
						}
						time = 60;
						result = 0;
						level = 1;
						helping = 0;
						gameStatus = 0;
						break;
					case 7:
						Button33Y[nowButton] -= 10;
						nowaction = 3;
						break
					case 8:
						Button33Y[nowButton] -= 10;
						nowaction = 2;
						break;
					default:
						if(gameButton[nowButton].used == false){
							gameButton[nowButton].used = true;
							operations.Game24calculate(nowButton);
						}
						break;
				}
				if(nowButton == 6){
					canUApp.drawStartButton(); 
				}
				else{
					canUApp.drawGameButton();
				}
			}
		}
		else if(gameStatus == 3) {
			var nowButton = cal.getnowButton(e);
			if(musicButton[nowButton].text[1] != "$"){
				ctx_u.clearRect(0, 0, canWid, canHei);
				Button53Y[nowButton] -= 10;
				switch(nowButton){
					case 6:  //-
						if(upkey > 0 && upkey <= 2) {
							upkey--;
						}
						break;
					case 8:  //+
						if(upkey >= 0 && upkey < 2) {
							upkey++;
						}
						break;
					case 9:  //delete
						if(musicState == 1 && resultMusic.length >= 1) {
							resultMusic.pop();
						}
						break;
					case 11:
						if(musicState == 1) {
							if(ifpause == 0) {
								ifpause = 1;
								musicID = window.setInterval(playSong,1000);
							}
							else {
								window.clearInterval(musicID);
								ifpause = 0;
							}
						}
						break;
					case 12:  //return
						nowaction = 4;
						gameStatus = 0;
						result = 0;
						level = 1;
						musicState = 0;
						ifpause = 0;
						resultMusic = [];
						nowKey = 0;
						song = 0;
						next = 0;
						HELP = 0;
						window.clearInterval(musicID);
						break;
					case 14:   //alt
						if(musicState == 0) {
							musicState = 1;
							resultMusic = [];
						}
						else {
							musicState = 0;
							nowKey = 0;
						}
						window.clearInterval(musicID);
						upkey = 1;
						song = 0;
						ifpause = 0;
						break;
					default:
						operations.Musiccalculate(nowButton);
						break;
				}
				if(nowButton == 12){
					canUApp.drawStartButton(); 
				}
				else{
					canUApp.drawMusicButton();
				}
			}
		}
		else if(gameStatus == 4){
			var nowButton = cal.getnowButton(e);
			if(calButton[nowButton].text[0] != "$"){
				ctx_u.clearRect(0, 0, canWid, canHei);  		
				switch(nowButton){
					case 3:    //+
						operations.CALcalculate();
						operate = 1;
						calcul = 1;
						break;
					case 7:    //-
						operations.CALcalculate();
						operate = 1;
						calcul = 2;
						break;
					case 11:    //*
						operations.CALcalculate();
						operate = 1;
						calcul = 3;
						break;
					case 12:    // .
						if(numshow == "0" || operate == 1){   
							numshow = "0";
						}
						var flag = false;
						for(var i = 0; i <= numshow.length; i++){
							if(numshow[i] == '.'){
								flag = true;
								break;
							}
						}
						if(flag == false){
							numshow += ".";
						}
						operate = 0;
						break;
					case 14:    // ALT
						numshow = "a fake ALT";
						break;
					case 15:    // /
						operations.CALcalculate();
						operate = 1;
						calcul = 4;
						break;
					case 16:   //back
						result = 0;
						gameStatus = 0;
						next = 0;
						HELP = 0;
						break;
					case 17:    //paint
						numshow = "a fake PAINT";
						break
					case 18:    // ac
						result = 0;
						prenum = 0;
						numshow = "0";
						break;
					case 19:    // =
						operations.CALcalculate();
						operate = 1;
						result = 0;
						prenum = 0;
						break;
					default:   //number
						if(numshow == "0" || operate == 1 || numshow == "a fake ALT" || numshow == "a fake PAINT"){ 
							numshow = [];
						}
						numshow += calButton[nowButton].text[0];
						operate = 0; //重置输入状态
						quit = 0;    //重置防止重复按键的标志
						break;
				}
				Button54Y[nowButton] -= 10;
				if(nowButton == 16){
					canUApp.drawStartButton(); 
				}
				else{
					canUApp.drawCalButton();
				}
			}
		}
	}

	cal.roudedRec = function(x, y, w, h, r, ctx, R, G, B){
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

	// *******************************************************运算操作**********************
	window.operations = {};
	// ***********************************************************************************************
	operations.Fakecalculate = function(nowButton){	
		var buttonText = gameButton[nowButton].text[level];
		var len = buttonText.length;
		if(len == 1){
			result = 10 * result + parseInt(buttonText[0]);
		}
		else if(len == 2){
			if(buttonText[0] == ">"){
				result = parseInt(result / 10);
			}
			else if(buttonText[0] == "^"){
				result = result * result;
			}
			else{
				var temp = parseInt(buttonText[1]);
				switch(buttonText[0]){
					case "+":
						result += temp;
						break;
					case "-":
						result -= temp;
						break;
					case "x":
						result *= temp;
						break;
					case "/":
						result /= temp;
						break;
				}
			}
		}
		else if(len == 3){
			result *= -1;
		}
		else if(len == 4){
			var a = parseInt(buttonText[0]);
			var b = parseInt(buttonText[3]);
			result = operations.replace(result, a, b);
		}
		else{
			result = operations.reverse(result);
		}
		moves--;
		if(moves == 0) {
			if(result == goal[level]){
				result = "WIN";
				gameButton13Ob.text[level] = "OK";
			}
			else{
				result = "WRONG";
			}
		}
	}
	
	operations.reverse = function(result){
		var temp = [], i = 0;  //reverse
		while(result != 0){
			temp[i++] = result % 10;
			result = parseInt(result /10);
		}
		for(var j = 0; j < i; j++){
			result = 10 * result + temp[j];
		}
		return result;
	}

	operations.replace = function(result, a, b){
		var temp = [], i = 0;  
		while(result != 0){
			temp[i++] = result % 10;
			result = parseInt(result /10);
		}
		for(var j = 0; j < i; j++){
			if(temp[j] == a){
				temp[j] = b;
			}
			result = 10 * result + temp[j];
		}
		return operations.reverse(result);
	}

	operations.Musiccalculate = function(nowButton){
		var key = Number(musicButton[nowButton].text[0]);
		if(musicState == 0) {
			if(key){
				nowKey = key + upkey * 7;
			}
			else{
				nowKey = 0;
			}
			cal.playKey();
		}
		else {
			if(key){
				resultMusic[resultMusic.length] = key + upkey * 7;
			}
			else{
				resultMusic[resultMusic.length] = 0;
			}
		}
	}

    operations.Game24calculate = function(nowButton) {
    	var nownum = parseInt(gameButton[nowButton].text[num]);
        if(nowaction == 0) {
        	result = result + nownum;
        }
        else if(nowaction == 1) {
        	result = result - nownum;
        }
        else if(nowaction == 2) {
        	result = result * nownum;
        }
        else if(nowaction == 3) {
        	result = parseInt(result/nownum);
        }
        else if(nowaction == 4) {
        	result = nownum;
        }
		if(gameButton11Ob.used == true && gameButton12Ob.used == true
		&& gameButton21Ob.used == true && gameButton22Ob.used == true){

			if(result == 24){
				var nownum = num;
				while(num == nownum){
					num = 1 + Math.round(Math.random() * 29);
				}
                level++;
			}
			result = 0;
            nowaction = 4;
			Button33Y[0] -= 10;
			Button33Y[1] -= 10;
			Button33Y[3] -= 10;
			Button33Y[4] -= 10;
			gameButton11Ob.used = false;
			gameButton12Ob.used = false;
			gameButton21Ob.used = false;
			gameButton22Ob.used = false;
		}
	}

	operations.CALcalculate = function() {
		if(numshow == "a fake ALT" || numshow == "a fake PAINT"){
			return;
		}
		numshow = Number(numshow);
    	if(quit != 1 && prenum != 0){ 
			switch(calcul){ //判断要输入状态
				case 1:
					result = prenum + numshow;
					break; 
				case 2:
					result = prenum - numshow;
					break; 
				case 3:
					result = prenum * numshow;
					break;
				case 4:
					if(numshow != 0){
						result = prenum / numshow;
					}
					else{
						numshow = prenum;
					} 
					break;
			} 
		} 
		else{ 
			result = numshow; 
		} 
		quit = 1;   //避免重复按键
		numshow = String(result); 
		prenum = result;    //存储当前值 
    }
	
	// *******************************************************底层画布上绘制东西**********************
	window.canBApp = {};
	// *************************************************************画背景****************************************
	canBApp.drawBackgorund = function(){
		cal.roudedRec(areaX, areaY, areaW, areaH, 30, ctx_b, 255, 235, 205);
		cal.roudedRec(screenX, screenY, screenW, screenH, 10, ctx_b, 55, 60, 64);
		cal.roudedRec(shadowX, shadowY, shadowW, shadowH, 10, ctx_b, 106, 116, 107);
		cal.roudedRec(inner_screenX, inner_screenY, inner_screenW, inner_screenH, 10, ctx_b, 165, 183, 162);
		cal.roudedRec(movesX, movesY, movesW, movesH, 5, ctx_b, 78, 81, 78);
		cal.roudedRec(goalX, goalY, goalW, goalH, 5, ctx_b, 78, 81, 78);
		ctx_b.font = "23px verdana";
		ctx_b.fillStyle = "rgba(78, 81, 78)";
		ctx_b.fillText("(●ﾟωﾟ●)",logoX, logoY);
		cal.roudedRec(batteryX, batteryY, batteryW, batteryH, 5, ctx_b, 0, 0, 0);
		cal.roudedRec(shadow_batteryX, shadow_batteryY, shadow_batteryW, shadow_batteryH, 4, ctx_b, 73, 50, 48);
		cal.roudedRec(inner_batteryX, inner_batteryY, inner_batteryW, inner_batteryH, 4, ctx_b, 101, 57, 51);

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
			cal.roudedRec(this.x, this.y, this.w, this.h, 10, ctx_u, 203, 196, 185);
			cal.roudedRec(this.x, this.y + 3, this.w, this.h - 6, 10, ctx_u, 180, 174, 164);
		}
		else{
			cal.roudedRec(this.x, this.y, this.w, this.h, 10, ctx_u, this.r + 15, this.g - 35, this.b - 35);
			cal.roudedRec(this.x, posY - 10, this.w, this.h, 10, ctx_u, this.r, this.g, this.b);
			ctx_u.font = '20px verdana';
			ctx_u.textAlign = 'center';
			ctx_u.fillStyle="rgba(255, 235, 205, 1)";
			ctx_u.fillText(text, this.x + this.w / 2, posY+ (this.h + 20) / 2 - 10);
			ctx_u.textAlign = 'left';
		}
	}
})();
