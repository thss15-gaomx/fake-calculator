(function(){
	// **********************************************************************全局函数、初始化、判断等*******
	// *****************************************************************************************************************
	window.cal = {};
	// *************************************************************************初始化*******
	cal.StartDraw = function(){
		canvas_up = document.getElementById('canvas_up');
		ctx_u = canvas_up.getContext('2d');  //上面的canvas
		canvas_bottom = document.getElementById('canvas_bottom');
		ctx_b = canvas_bottom.getContext('2d');   //下面的canvas
		canvas_up.addEventListener("mousedown",cal.DoMouseD,false);
        canvas_up.addEventListener("mouseup",cal.DoMouseU,false);
		canvas_up.addEventListener("touchstart",cal.DoTouchD,false);
        canvas_up.addEventListener("touchend",cal.DoTouchU,false);

		canWid = canvas_up.width;
		canHei = canvas_up.height;

		cal.initStartButton();
		canBApp.drawBackgorund();
		canUApp.drawStartButton();
        cal.initMusic();
	}

	cal.DoMouseD = function(e) {
        if(e.cancelable) {
            if(!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        var nowButton = cal.getnowButton(e); 
        cal.mousedown(nowButton);
    }
    cal.DoMouseU = function(e) {
        if(e.cancelable) {
            if(!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        var nowButton = cal.getnowButton(e);
        cal.mouseup(nowButton);
    }
    cal.DoTouchD = function(e) {
        if(e.cancelable) {
            if(!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        var nowButton = cal.getNowTouchDown(e);
        cal.mousedown(nowButton);
    }

    cal.DoTouchU = function(e) {
        if(e.cancelable) {
            if(!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        var nowButton = cal.getNowTouchUp(e);
        cal.mouseup(nowButton);
	}
	
	cal.getNowTouchDown = function(e) {
       my_element = document.getElementById("main");
       var mx = e.touches[0].pageX - my_element.offsetLeft;
       var my = e.touches[0].pageY - my_element.offsetTop;

       if(gameStatus == 0 || gameStatus == 1 || gameStatus == 2) {
            for(var i = 0; i < 9; i++){
				if(ifClick(mx, my, startButton[i].x, startButton[i].y, startButton[i].w, startButton[i].h)){
                    return i;
                }
            }
        }
        else if(gameStatus == 3) {
            for(var i = 0; i < 15; i++) {
			if(ifClick(mx, my, musicButton[i].x, musicButton[i].y, musicButton[i].w, musicButton[i].h)){
                	return i;
        		}
        	}
        }
        else if(gameStatus == 4) {
            for(var i = 0; i < 20; i++) {
				if(ifClick(mx, my, calButton[i].x, calButton[i].y, calButton[i].w, calButton[i].h)){
					return i;
				}
			}
        }
   }
   cal.getNowTouchUp = function(e) {
       my_element = document.getElementById("main");
       var mx = e.changedTouches[0].pageX - my_element.offsetLeft;
       var my = e.changedTouches[0].pageY - my_element.offsetTop;

       if(gameStatus == 0 || gameStatus == 1 || gameStatus == 2){
            for(var i = 0; i < 9; i++) {
				if(ifClick(mx, my, startButton[i].x, startButton[i].y, startButton[i].w, startButton[i].h)){
                    return i;
                }
            }
        }
        else if(gameStatus == 3) {
            for(var i = 0; i < 15; i++) {
				if(ifClick(mx, my, musicButton[i].x, musicButton[i].y, musicButton[i].w, musicButton[i].h)){
					return i;
				}
			}
        }
        else if(gameStatus == 4) {
            for(var i = 0; i < 20; i++) {
				if(ifClick(mx, my, calButton[i].x, calButton[i].y, calButton[i].w, calButton[i].h)){
					return i;
				}
       	 	}
        }
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

	cal.mousedown = function(nowButton){
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

	cal.mouseup = function(nowButton){
	 	if(gameStatus == 0){
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
})();
