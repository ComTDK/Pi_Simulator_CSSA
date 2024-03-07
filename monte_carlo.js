let point = [];
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var yValues = [];
var xValues = [];
var piValues = [];
var myChart = new Chart('myChart', {
  type: "line",
  data: {
    labels: [], // initialize with an empty array
    datasets: [{
    fill: false,
      pointRadius: 1,
      borderColor: "rgba(255,0,0,0.5)",
      data: [], // initialize with an empty array
},
	{
		fill: false,
      pointRadius: 1,
      borderColor: "rgba(51,0,0,0.5)",
      data: [Math.PI], // initialize with an empty array
	}

]},    
  options: {
  	// pointStyle : {'triangle'},
    legend: {display: false},
    title: {
      display: true,
      text: "PI",
      fontSize: 16
    },
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Approximated PI',
        fontSize: 16
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: '#Points',
        fontSize: 16
      }
    }]
  }     

}});

//Drawing the picture 
function picture()
{
	ctx.beginPath();
	

	//Draw rectangle
	ctx.fillStyle = "rgb(153 153 255)";
	ctx.strokeStyle = "rgb(51 0 0)";
	ctx.rect(50, 50, 400, 400);
	ctx.fill();
	ctx.stroke();
	
	//Drawing circle
	ctx.beginPath();
	ctx.fillStyle = "rgb(255 0 0 / 50%)";
	drawCircle(250, 250, 200, 0, 2*Math.PI);
	ctx.fill();
	ctx.stroke();

	//Drawing line start from the centre of the circle
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
	//Draw the whole picture
	picture();

	//Create the list storing number of points
	for(let i = 0; i < 1000; ++i)
	{
		point.push([]);
		// yValues.push({});
		// xValues.push({});
	}

	let n = 0; //number of current points 
	let pointInCircle = 0; //number of points inside the circle

	//Random the position of points and draw 
	function drawPoint()
	{
		//Number of points that are allowed to appear
		if(n >= 100)
		{
			//Clean the canvas every time number of current points(n) reaching the limit
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//Redraw + reset the variables
			picture(); 
			n = 0;
			pointInCircle = 0;
			yValues = [];
			xValues = [];
			piValues = [];
		}

		//Random to create new points
		let x1 = 50 + Math.random()*400;
		let y1 = 50 + Math.random()*400;
		let r = 1;
		n++;
		
		//distance from the generated point to the centre of the circle with r = 200
		if((x1 - 250)*(x1 - 250) + (y1 - 250)*(y1 - 250) <= 200*200)
			pointInCircle++;

		point[n - 1] = [x1, y1, r];

		//Drawing points
		ctx.beginPath();
		drawCircle(point[n - 1][0], point[n - 1][1], 1, 0, 2*Math.PI);
		ctx.stroke();
		

		//Output the message + showing the number of points and the current approximated pi
		document.getElementById("numberPoints").innerHTML = ("Number of Points = " + n);
		prob = pointInCircle/n*4;
		document.getElementById("Pi").innerHTML = ("Pi = " + prob);
		// document.getElementById("numberCirclePoints").innerHTML = ("Number of Points Inside the Circle = " + pointInCircle);

		yValues.push(prob);
		xValues.push(n);
		piValues.push(Math.PI);

		myChart.data.labels = xValues;
		myChart.data.datasets[0].data = yValues;
		myChart.data.datasets[1].data = piValues;
		// myChart.options.elements.point.pointStyle = [pointImage];
		myChart.update();
	}

	//Setting interval - drawing new points after every 200ms
	setInterval(drawPoint, 250);
	

	//Line graph
	ctx.beginPath();

	ctx.stroke();





}
draw();






