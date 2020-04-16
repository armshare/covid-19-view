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

  async function getCase() {
    return await fetch(
      `https://covid19.th-stat.com/api/open/cases`
    ).then((res) => res.json());
  }

  function initialTable(data) {
    console.log(data);
    let table = $("#tableSummary").DataTable({
      buttons: ["excel", "pdf"],
      data: data,
      lengthChange: false,
      columns: [{ data: "label" }, { data: "value" }],
      pagingType: "numbers",
    });

    table
      .buttons()
      .container()
      .appendTo("#tableSummary_wrapper .col-md-6:eq(0)");

    // console.log()
  }

  function initialTableCase(data) {
    console.log("initialTableCase ", data);
    let table = $("#tableCase").DataTable({
      buttons: ["excel", "pdf"],
      data: data,
      lengthChange: false,
      columns: [
        { data: "ConfirmDate" },
        { data: "Gender" },
        { data: "Age" },
        { data: "GenderEn" },
        { data: "Nation" },
        { data: "NationEn" },
        { data: "Province" },
        { data: "ProvinceEn" },
        { data: "District" },
        { data: "Detail" }
      ],
      pagingType: "numbers",
    });

    table
      .buttons()
      .container()
      .appendTo("#tableCase_wrapper .col-md-6:eq(0)");

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

    getCase().then((res) => {
      let dataSourceCase = [];
      
      for (const i in res.Data) {
       
        dataSourceCase.push(res.Data[i]);
      }
      initialTableCase(dataSourceCase);
     
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

      console.log("dataSummary ", $("#tableSummary_wrapper").children().last());
    });
    //console.log("dataSummary ", dataSummary);
  }
  run();
})();
