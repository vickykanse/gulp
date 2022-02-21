var ctx = document.getElementById('myChart').getContext('2d');
let draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line.prototype.draw = function() {
    let chart = this.chart;
    let ctx = chart.ctx;
    let _stroke = ctx.stroke;
    ctx.stroke = function() {
        ctx.save();
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 3;
        _stroke.apply(this, arguments);
        ctx.restore();
    };
    draw.apply(this, arguments);
    ctx.stroke = _stroke;
};
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line', // also try bar or other graph types

    // The data for our dataset
    data: {
        labels: ["Jun 2016", "Jul 2016", "Aug 2016", "Sep 2016", "Oct 2016", "Nov 2016", "Dec 2016"],
        // Information about the dataset
        datasets: [{
            backgroundColor: 'transparent',
            borderColor: '#9470b7',
            data: [40, 80, 20, 90, 30, 80, 40],
            borderWidth: 2,
            stepSize: 20
        }]
    },
    // Configuration options
    options: {
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: -10
            }
        },
        // layout: {
        //     padding: 10,
        // },
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        scales: {

            yAxes: [{
                angleLines: {
                    display: false
                },
                ticks: {
                    display: false,
                    stepSize: 20,
                    beginAtZero: true,
                },
                gridLines: {
                    display: true,
                    drawBorder: false,

                },
                scaleLabel: {
                    display: false,
                    labelString: 'Precipitation in mm'
                }
            }],
            xAxes: [{
                angleLines: {
                    display: false
                },
                ticks: {
                    display: false,
                    stepSize: 20,
                    beginAtZero: true,

                },
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
                scaleLabel: {
                    display: false,
                }
            }]
        }
    }
});


/*dchart js start here*/
var ctx = document.getElementById("dChart").getContext('2d');

var dChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Completed", "Pending"],
        datasets: [{
            data: [500, 120], // Specify the data values array

            // borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'], // Add custom color border 
            backgroundColor: ['#64329c', '#ced4da'], // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        }]
    },
    options: {

        datasetRadiusBuffer: 25,
        cutoutPercentage: 75,
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
        legend: {
            position: 'bottom',

            labels: {
                boxWidth: 20,
            }
        },
    }
});
/*dchart js end here*/

$(".search").on('click', function() {
    $(".search-box").toggleClass('active');
    $('.search-box input').focus();
});
$(".side-menu-toggle").on('click', function() {
    $("body").toggleClass('menu-close');
});
$('.count-number').each(function() {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 3000,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        }
    });
});