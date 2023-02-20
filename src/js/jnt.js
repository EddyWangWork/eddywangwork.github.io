$(document).ready(function () {
    getJntrecords();
});

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
            const weekday = ["S", "M", "T", "W", "T", "F", "S"];

            records = data.data;
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