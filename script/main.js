chartIt();
async function chartIt(){
const data = await getData();
var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                data: data.ys,
                fill:'false',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
         }]
        },
           
        options: {
            responsive: true,
            maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return  value + '°';
                            }
                        }
                    }]
                }
            }
    });
}

async function getData(){
    const xs = [];
    const ys = [];
    const response = await fetch('data/data-set.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);
    table.forEach(row => {
       const coloumns = row.split(',');
       const year = coloumns[0];
       xs.push(year);
       const temp = coloumns[1];
       ys.push(parseFloat(temp)+14);
    });
    return {xs,ys};
}
