// a callibrate func for change range of numbers
Math.getInRange=function (x, arr) {// arr = [x1,x2,y1,y2] // x is input and new y return
  return ((arr[3] - arr[2]) * (x - arr[0])) / (arr[1] - arr[0]) + arr[2];
}

$(function(){
	var canvas = $('#loading')[0],
		ctx = canvas.getContext("2d"),
		d2r = Math.PI/180,
		degshif = 90,
		currentDegree = 0,
		aniDue = 4000,
		lastDraw = 0,
		iv=0,
		saresh = 6*d2r,
		starArc = -1*degshif*d2r;

	var drawCircle = function (deg){
		ctx.clearRect(0,0,40,40);

		deg-=degshif;
		deg*=d2r;

		// sahdow
		ctx.lineWidth=7;
		ctx.globalAlpha=0.2;
		ctx.strokeStyle='hsl(60,20%,20%)';
		ctx.beginPath();
		ctx.arc(20,20,15,0,360*d2r);
		ctx.stroke();

		if(!deg) return;

		// body
		ctx.lineWidth=5;
		ctx.globalAlpha=0.8;
		//ctx.strokeStyle='hsl(60,10%,20%)';
		ctx.beginPath();
		ctx.arc(20,20,15,starArc,deg-saresh);
		ctx.stroke();

		// saresh
		ctx.beginPath();
		ctx.strokeStyle='hsl(60,5%,70%)';
		ctx.arc(20,20,15,deg-saresh,deg);
		ctx.stroke();

		//ctx.closePath();

	},

	circleAni = function(){
		var now = Date.now();
		currentDegree += Math.getInRange(now-lastDraw,[0,aniDue,0,360]);
		if(currentDegree>359){
			currentDegree%=360;
			console.log('nextSlide');
		}

		drawCircle(currentDegree);
		lastDraw = now;
	},

	startInt = function(){
		if(iv) return;
		lastDraw = Date.now();
		iv = setInterval(circleAni,1000/60);
	},

	stopInt = function(){
		clearInterval(iv);
		iv=0;
	}

	$('#draw').click(circleAni);
	$('#start').click(startInt);
	$('#stop').click(stopInt);
	startInt();
});