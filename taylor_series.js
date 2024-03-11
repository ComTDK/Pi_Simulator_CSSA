const taylor_canvas = document.getElementById("taylor");
const taylor_ctx = taylor_canvas.getContext("2d");

let y = [];
let x = [];
let piLine = [];
let taylor = 0;
let n = -1;

let myTaylor = new Chart("taylor", {
  type: "line",
  data: {
    labels: [], // initialize with an empty array
    datasets: [
      {
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
      },
    ],
  },
  options: {
    // pointStyle : {'triangle'},
    legend: { display: false },
    title: {
      display: true,
      text: "PI",
      fontSize: 16,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Approximated PI",
            fontSize: 16,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "#Points",
            fontSize: 16,
          },
        },
      ],
    },
  },
});

function draw() {
  function drawGraph() {
    if (n >= 100) {
      taylor_ctx.clearRect(0, 0, taylor_canvas.width, taylor_canvas.height);
      n = -1;
      taylor = 0;
      y = [];
      x = [];
      piLine = [];
    }

    n++;

    if (n % 2 == 0) taylor += 1 / (2 * n + 1);
    else taylor -= 1 / (2 * n + 1);
    let prob = taylor * 4;
    y.push(prob);
    x.push(n);
    piLine.push(Math.PI);

    myTaylor.data.labels = x;
    myTaylor.data.datasets[0].data = y;
    myTaylor.data.datasets[1].data = piLine;
    myTaylor.update();

    //Output the message + showing the number of points and the current approximated pi
    document.getElementById("taylor_n").innerHTML = "N = " + n;
    document.getElementById("taylor_Pi").innerHTML = "Pi = " + prob;
  }

  setInterval(drawGraph, 250);
}

draw();
