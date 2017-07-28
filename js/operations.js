// *******************************************************运算操作**********************
window.operations = {};
// ***********************************************************************************************
operations.Fakecalculate = function(nowButton){	
	var buttonText = gameButton[nowButton].text[level];
	var len = buttonText.length;
	if(len == 1){
        result = String(result);
        result += buttonText[0];
        result = Number(result);
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
                default:
                    result = String(result);
                    result += (buttonText[0] + result += buttonText[1]);
                    result = Number(result);
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
		playKey();
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
	
