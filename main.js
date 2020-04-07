(() => {
  async function getData() {
    return await fetch(
      `https://covid19.th-stat.com/api/open/today`
    ).then((res) => res.json());
  }

  async function getSummary() {
    return await fetch(
      `https://covid19.th-stat.com/api/open/cases/sum`
    ).then((res) => res.json());
  }

  function initialTable(data) {
    let table = $("#tableSummary").DataTable({
      buttons: ["excel", "pdf"],
      data: data,
      lengthChange: false,
      columns: [{ data: "label" }, { data: "value" }]
      
    });
  
    table.buttons().container()
        .appendTo( '#tableSummary_wrapper .col-md-6:eq(0)' );

     // console.log()
  }

  function run() {
    getData().then((data) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];

          if (key != "DevBy" && key != "SeverBy") {
            document.getElementById(key).innerHTML = element;
          }
        }
      }
    });

    getSummary().then((res) => {
      let dataSourceSummary = [];
      for (const key in res.Province) {
        if (res.Province.hasOwnProperty(key)) {
          const labelProvince = key;
          const valueProvince = res.Province[key];
          dataSourceSummary.push({
            label: labelProvince,
            value: valueProvince,
          });
        }
      }
      console.log("dataSourceSummary  ", dataSourceSummary);
      initialTable(dataSourceSummary);
      console.log("dataSummary ",  $("#tableSummary_wrapper").children().last());
    });
    //console.log("dataSummary ", dataSummary);
  }
  run();
})();
