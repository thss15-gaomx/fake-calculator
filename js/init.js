// *******************************************************初始化**********************
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