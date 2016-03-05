var DistrictFinder;
(function (DistrictFinder) {
    var Rentprice = (function () {
        function Rentprice() {
        }
        return Rentprice;
    }());
    DistrictFinder.Rentprice = Rentprice;
    var Rentprices = (function () {
        function Rentprices() {
        }
        return Rentprices;
    }());
    DistrictFinder.Rentprices = Rentprices;
})(DistrictFinder || (DistrictFinder = {}));
var DistrictFinder;
(function (DistrictFinder) {
    var DistrictCenter = (function () {
        function DistrictCenter() {
        }
        return DistrictCenter;
    }());
    DistrictFinder.DistrictCenter = DistrictCenter;
    var DistrictCenters = (function () {
        function DistrictCenters() {
        }
        return DistrictCenters;
    }());
    DistrictFinder.DistrictCenters = DistrictCenters;
})(DistrictFinder || (DistrictFinder = {}));
var DistrictFinder;
(function (DistrictFinder) {
    var SerializationHelper = (function () {
        function SerializationHelper() {
        }
        SerializationHelper.toInstance = function (obj, jsonfilename) {
            var request = new XMLHttpRequest();
            request.open("get", "https://raw.githubusercontent.com/codeforffm/district_finder/master/data/" + jsonfilename, false);
            request.send();
            var jsonObj = JSON.parse(request.responseText);
            if (typeof obj["fromJSON"] === "function") {
                obj["fromJSON"](jsonObj);
            }
            else {
                for (var propName in jsonObj) {
                    obj[propName] = jsonObj[propName];
                }
            }
            return obj;
        };
        return SerializationHelper;
    }());
    DistrictFinder.SerializationHelper = SerializationHelper;
})(DistrictFinder || (DistrictFinder = {}));
/// <reference path="Rentprices"/>
/// <reference path="DistrictCenters"/>
/// <reference path="SerializationHelper"/>
function GetPrices() {
    var prices = DistrictFinder.SerializationHelper.toInstance(new DistrictFinder.Rentprices(), "rentPrices.json");
    //var positions = DistrictFinder.SerializationHelper.toInstance(new DistrictFinder.DistrictCenters(), "districtCenters.json");
    var data;
    data = new Array();
    var highest;
    highest = 0.001;
    prices.prices.forEach(function (element) {
        if (parseFloat(highest) < parseFloat(element.prices))
            highest = element.prices;
    });
    for (var i = 0; i < prices.prices.length; i++) {
        var item = [8.669173, 50.106046, parseFloat(parseFloat(prices.prices[i].prices) / parseFloat(highest))];
        data.push(item);
    }
    return data;
}
