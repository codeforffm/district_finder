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
    var SerializationHelper = (function () {
        function SerializationHelper() {
        }
        SerializationHelper.toInstance = function (obj, jsonfilename) {
            var fs = require('fs');
            var jsonObj = JSON.parse(fs.readFileSync('./data/' + jsonfilename).toString());
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
        SerializationHelper.RequestListener = function () {
        };
        return SerializationHelper;
    }());
    DistrictFinder.SerializationHelper = SerializationHelper;
})(DistrictFinder || (DistrictFinder = {}));
/// <reference path="Rentprices"/>
/// <reference path="SerializationHelper"/>
var DistrictFinder;
(function (DistrictFinder) {
    var t = DistrictFinder.SerializationHelper.toInstance(new DistrictFinder.Rentprices(), "rentPrices.json");
    t.prices.forEach(function (element) {
        console.log(element.district);
    });
})(DistrictFinder || (DistrictFinder = {}));
