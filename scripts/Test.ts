/// <reference path="Rentprices"/>
/// <reference path="SerializationHelper"/>
module DistrictFinder{

    var t = SerializationHelper.toInstance(new Rentprices(), "rentPrices.json");
    
    t.prices.forEach(element => {
        console.log(element.district);
    });
}
