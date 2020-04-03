async function getData() {
  let response = await fetch(`https://covid19.th-stat.com/api/open/today`);
  data = await response.json();
  return data;
}

getData().then(data => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];

      if (key != "DevBy" && key != "SeverBy") {
        document.getElementById(key).innerHTML = element;
      }
    }
  }
});
