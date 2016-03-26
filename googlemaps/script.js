
var mapStyle = [{
  'featureType': 'all',
  'elementType': 'all',
  'stylers': [{'visibility': 'off'}]
}, {
  'featureType': 'landscape',
  'elementType': 'geometry',
  'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
}, {
  'featureType': 'water',
  'elementType': 'labels',
  'stylers': [{'visibility': 'off'}]
}, {
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': [{'visibility': 'on'}, {'hue': '#5f94ff'}, {'lightness': 60}]
}];

var map;

var criteriaMax = -Number.MAX_VALUE;
var criteriaMin = Number.MAX_VALUE;

google.maps.event.addDomListener(window,'load', function(){
	//load map
	map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(50.1167, 8.6833),
		zoom: 11,
		styles: mapStyle
	})

	map.data.setStyle(styleFeature);	
	map.data.addListener('mouseover', mouseInToRegion);
	map.data.addListener('mouseout', mouseOutOfRegion);

	var selectBox = document.getElementById('criteria-variable');
	google.maps.event.addDomListener(selectBox, 'change', function(){
		clearData();
		loadData(selectBox.options[selectBox.selectedIndex].value);
	});
	loadMapShapes();
});

/** Loads FFM district polygons*/
function loadMapShapes(){
	//loads FFM geojson file
	map.data.loadGeoJson('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/frankfurt-main.geojson');
	
	google.maps.event.addListenerOnce(map.data, 'addfeature', function(){
		google.maps.event.trigger(document.getElementById('criteria-variable'), 'change');
	});
}


/** Loads data from open data resource*/
function loadData(jsonfilename){
    var request = new XMLHttpRequest();
    request.open("get", "https://raw.githubusercontent.com/codeforffm/district_finder/master/visualizer/data/" + jsonfilename+".json", false);
    
	request.onload =function(){
    var json = JSON.parse(request.responseText);
	
	for (var i in json.data) {
		var criteriaVariable = parseFloat(json.data[i].value);
		var district = json.data[i].district;
	

	  // keep track of min and max values
      if (criteriaVariable < criteriaMin) {
        criteriaMin = criteriaVariable;
      }
      if (criteriaVariable > criteriaMax) {
        criteriaMax = criteriaVariable;
      }

	  map.data.forEach(function(feature){
		  if (feature.getProperty('name') == district)
		  {
			  feature.setProperty('criteria-variable', criteriaVariable);
		  }
	  });

	}

    // update and display the legend
    document.getElementById('criteria-min').textContent =
        criteriaMin.toLocaleString();
    document.getElementById('criteria-max').textContent =
        criteriaMax.toLocaleString();
	}
	request.send();
}


/** Clear data*/
function clearData(){
	criteriaMax = -Number.MAX_VALUE;
	criteriaMin = Number.MAX_VALUE;
	
	  map.data.forEach(function(feature){
		  feature.setProperty('criteria-variable', undefined);
	  });

	document.getElementById('data-box').style.display = 'none';
	document.getElementById('data-caret').style.display ='none';
}

/**
 * Applies a gradient style based on the 'criteria-variable'.
 * This is the callback passed to data.setStyle() and is called for each feature in
 * the data set.  Check out the docs for Data.StylingFunction.
 *
 * @param {google.maps.Data.Feature} feature
 */
// [START snippet-stylefeature]
function styleFeature(feature) {
  var high = [5, 69, 54];  // color of smallest datum
  var low = [151, 83, 34];   // color of largest datum

  // delta represents where the value sits between the min and max
  var delta = (feature.getProperty('criteria-variable') - criteriaMin) /
      (criteriaMax - criteriaMin);

  var color = [];
  for (var i = 0; i < 3; i++) {
    // calculate an integer color based on the delta
    color[i] = (high[i] - low[i]) * delta + low[i];
  }

  // determine whether to show this shape or not
  var showRow = true;
  if (feature.getProperty('criteria-variable') == null || 
      isNaN(feature.getProperty('criteria-variable'))) {
    showRow = false;
  }

  var outlineWeight = 0.5, zIndex = 1;
  if (feature.getProperty('district') === 'hover') {
    outlineWeight = zIndex = 2;
  }

  return {
    strokeWeight: outlineWeight,
    strokeColor: '#fff',
    zIndex: zIndex,
    fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
    fillOpacity: 0.75,
    visible: showRow
  };
}
// [END snippet-stylefeature]

// [START snippet-mouseevents]
/**
 * Responds to the mouse-in event on a map shape (district).
 *
 * @param {?google.maps.MouseEvent} e
 */
function mouseInToRegion(e) {
  // set the hover district so the setStyle function can change the border
  e.feature.setProperty('district', 'hover');

  var percent = (e.feature.getProperty('criteria-variable') - criteriaMin) /
      (criteriaMax - criteriaMin) * 100;

  // update the label
  document.getElementById('data-label').textContent =
      e.feature.getProperty('name');
  document.getElementById('data-value').textContent =
      e.feature.getProperty('criteria-variable').toLocaleString();
  document.getElementById('data-box').style.display = 'block';
  document.getElementById('data-caret').style.display = 'block';
  document.getElementById('data-caret').style.paddingLeft = percent + '%';
}

/**
 * Responds to the mouse-out event on a map shape (district).
 *
 * @param {?google.maps.MouseEvent} e
 */
function mouseOutOfRegion(e) {
  // reset the hover district, returning the border to normal
  e.feature.setProperty('district', 'normal');
}
// [END snippet-mouseevents]
