
function toInstance(jsonfilename) {
    var request = new XMLHttpRequest();
    request.open("get", "https://raw.githubusercontent.com/codeforffm/district_finder/master/visualizer/data/" + jsonfilename, false);
    request.send();
    var obj = JSON.parse(request.responseText);
    return obj;
}

// e.g. "rentPrices.json"
function GetDataForHeatMap(jsonFileName) {
    var positions = toInstance("districtCenters.json");
    var json = toInstance(jsonFileName);
    var max = getMax(json.data);

    var result = new Array();
    for (var i = 0; i < json.data.length; i++) {
        for (var y = 0; y < positions.districts.length; y++) {
            if (positions.districts[y].district == json.data[i].district) {
                var item = [parseFloat(positions.districts[y].x), parseFloat(positions.districts[y].y), parseFloat(parseFloat(json.data[i].value) / parseFloat(max))];
                result.push(item);
                break;
            }
        }
    }
    return result;
}

function getMax(data) {
    var max;
    max = 0.0000001;
    data.forEach(function(element) {
        if (max < parseFloat(element.value))
            max = element.value;
    });
    return max;
}
