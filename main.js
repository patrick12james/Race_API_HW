const getF1API = async function (series, season) {
  let response = await fetch(`https://ergast.com/api/f1/${season}/${series}/driverStandings.json`);
  let data = await response.json();
  return await data;
}

// const getF1API = async function(series, season){
//   let response = await fetch(`https://ergast.com/api/f1/${series}/${season}/driverStandings.json`);
//   let data = await response.json()
//   return await data
// }

function addToRaceData(f1data){
  let f1List = document.querySelector('#f1List');

  standings = f1data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

  for (driver of standings){
    let liEl = document.createElement('li');
    liEl.innerText = `position: ${driver.position} points: ${driver.points} wins: ${driver.wins} name: ${driver.Driver.givenName + " " + driver.Driver.familyName} nationality: ${driver.Driver.nationality}`
      f1List.append(liEl);
  }

}

const raceForm = document.getElementById('raceForm');

raceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let series = e.target.series.value;
  let season = e.target.season.value;
  // console.log(pokeFormName);
  let f1data = await getF1API(series, season);
  addToRaceData(f1data)
})
