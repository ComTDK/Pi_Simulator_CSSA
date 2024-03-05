let point = [];
let numPoints = 0;
let areaCircle = 0;
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;


function picture()
{
	ctx.beginPath();
	

	//Draw rectangle
	ctx.fillStyle = "rgb(153 153 255)";
	ctx.strokeStyle = "rgb(51 0 0)";
	ctx.rect(50, 50, 400, 400);
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle = "rgb(255 0 0 / 50%)";
	drawCircle(250, 250, 200, 0, 2*Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(250, 250);
	ctx.lineTo(250, 50);

	ctx.moveTo(250, 250);
	ctx.lineTo(50, 250);

	ctx.moveTo(250, 250);
	ctx.lineTo(450, 250);

	ctx.moveTo(250, 250);
	ctx.lineTo(250, 450);

	ctx.stroke();

}

function drawCircle(x, y, r, sAngle, eAngle) 
{
    ctx.arc(x, y, r, sAngle, eAngle);
}

function draw() 
{



	 
	
	picture();


	for(let i = 0; i < 1000; ++i)
	{
		point.push([]);
	}
	let n = 1;
	let pointInCircle = 1;
	function drawPoint()
	{
		if(n >= 100)
		{
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			picture();
			n = 0;
			pointInCircle = 0;
		}
		for(let i = 0; i < n; ++i)
		{
			ctx.beginPath();
			drawCircle(point[i][0], point[i][1], 1, 0, 2*Math.PI);
			ctx.stroke();
		}
		document.getElementById("numberPoints").innerHTML = ("Number of Points = " + n);
		prob = pointInCircle/n*4;
		document.getElementById("Pi").innerHTML = ("Pi = " + prob);
		n++;

		let x1 = 50 + Math.random()*400;
		let y1 = 50 + Math.random()*400;
		let r = 1;

		//distance from the generated point to the centre of the circle with r = 200
		if((x1 - 250)*(x1 - 250) + (y1 - 250)*(y1 - 250) <= 200*200)
			pointInCircle++;
		point[n] = [x1, y1, r];
	}

	setInterval(drawPoint, 200);
	
}
draw();






