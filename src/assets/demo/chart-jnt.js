$(document).ready(function () {
    getJntrecords();
});

function setValetochart(dates, data) {
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    //minMax
    dataInt = data.map(a => +a);
    min = Math.min.apply(Math, dataInt)
    max = Math.max.apply(Math, dataInt)
    chartMax = 0;
    mulValue = 1;

    while (true) {
        if ((500 * mulValue) > max) {
            chartMax = 500 * mulValue;
            break;
        }
        mulValue++;
    }

    // Area Chart Example
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            // labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
            labels: dates,
            datasets: [{
                label: "Sessions",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                // data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
                data: data,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 50
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: chartMax,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });
}

function getJntrecords() {
    fetch("./assets/json/jnt.json", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
    })
        .then((res) => {
            if (res.status == 401) {
                window.location.href = "pages-login.html";
            }
            return res.json();
        })
        .then((data) => {
            records = data.data;
            dates = records.map(a => new Date(a.D * 1000).toISOString().split('T')[0]);
            data = records.map(a => a.TT.toFixed(2));
            setValetochart(dates, data);

            console.log(records);
            var t = $('#tbljnt').DataTable();
            records.forEach(x => {
                t.row.add([
                    // new Date(x.D * 1000).toISOString().split('T')[0] + ` - (${weekday[new Date(x.D * 1000).getDay()]})`,
                    new Date(x.D * 1000).toISOString().split('T')[0],
                    x.DF,
                    x.WI,
                    x.PC.toFixed(2),
                    x.PP.toFixed(2),
                    x.BW.toFixed(2),
                    x.TRSF.toFixed(2),
                    x.BI.toFixed(2),
                    x.CC.toFixed(2),
                    x.VPP.toFixed(2),
                    x.VCC.toFixed(2),
                    x.TT.toFixed(2)
                ]
                ).draw(false);
            });
        });
}

function clearDataTable(tableNames) {

    tableNames.forEach(function (item) {
        $(`#${item}`).DataTable().clear().draw();
    });
}