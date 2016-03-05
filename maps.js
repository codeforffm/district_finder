function buildMap(target, coord, layers) {
  var map = new ol.Map({
    target: target,
    layers: layers,
    view: new ol.View({
      center: ol.proj.fromLonLat(coord),
      zoom: 10
    })
  });
  return map;
}

function osmMapLayer() {
  var layer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });
  return layer;
}

function districtLayer() {
  var districtsLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
    url: 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/frankfurt-main.geojson',
    format: new ol.format.GeoJSON({
      defaultDataProjection :'EPSG:4326', 
      projection: 'EPSG:3857'
    })
   })
  });
  return districtsLayer;
}

function heatmapLayer(values) {
  var data = new ol.source.Vector();

  for (var i = 0; i< values.length; i++) {
    var v = values[i];
    var coord = ol.proj.transform([v[0], v[1]],'EPSG:4326', 'EPSG:3857');
    var lonLat = new ol.geom.Point(coord);
    var pointFeature = new ol.Feature({
      geometry: lonLat,
      weight:v[2]
    });

    data.addFeature(pointFeature);
  }
  
  //building the heatmap layer
  var heatmapLayer = new ol.layer.Heatmap({
    source:data,
    radius:20,
    opacity:0.9
  });

  return heatmapLayer;
}