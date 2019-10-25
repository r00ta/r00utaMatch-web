class Coordinate{
  constructor(lat, lon){
    this.lat = lat;
    this.lon = lon;
  }
}

addMapCopyright = function(map){
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(map);
}

getListCoordinates = function(coordinates){
  let splitted = coordinates.split('\n');
  let coordinatesList = [];
  for (s of splitted){
    let ss = s.split(',').map(x => parseFloat(x));
    coordinatesList.push(new Coordinate(ss[0], ss[1]));
  }
  return coordinatesList;
}
