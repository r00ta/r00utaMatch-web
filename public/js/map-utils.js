class Coordinate{
  constructor(lat, lon){
    this.lat = lat;
    this.lon = lon;
  }

  get_list_lat_lon(){
    return ([this.lat, this.lon]);
  }
}

class Way{
  constructor(start, stop){
    this.start = start;
    this.stop = stop;
  }
}

class Graph{
  constructor(){
    this.nodes = [];
    this.edges = [];
  }

  add_node(node){
    this.nodes.push(node);
  }

  add_edge(edge){
    this.edges.push(edge);
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


buildGraph = function(graphJson, map){
  var obj = JSON.parse(graphJson);
  var graph = new Graph();
  for (var node of obj['nodes']){
    graph.add_node(new Coordinate(node['lat'], node['lon']));
  }
  for (var edge of obj['edges']){
    let start = edge['start'];
    let stop = edge['stop'];
    let startCoord = new Coordinate(start['lat'], start['lon']);
    let stopCoord = new Coordinate(stop['lat'], stop['lon']);
    graph.add_edge(new Way(startCoord, stopCoord));
  }
  return graph;
}

displayCoordinatesOnMap = function(coordinates, map){
  for(var point of coordinates){
    L.circle([point.lat, point.lon],  {radius: 10}).addTo(map);
  }
}

displayEdgesOnMap = function(edges, map){
  for(var way of edges){
    let toPlot = [way.start.get_list_lat_lon(), way.stop.get_list_lat_lon()];
    L.polyline(toPlot, {color: 'red'}).addTo(map);
  }
}
