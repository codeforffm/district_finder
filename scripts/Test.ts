/// <reference path="Rentprices"/>
/// <reference path="DistrictCenters"/>
/// <reference path="SerializationHelper"/>

function GetPrices() {
    var prices = DistrictFinder.SerializationHelper.toInstance(new DistrictFinder.Rentprices(), "rentPrices.json");
    //var positions = DistrictFinder.SerializationHelper.toInstance(new DistrictFinder.DistrictCenters(), "districtCenters.json");

    var data : Array<number>[];  
    data = new Array();
    var highest : number;
    highest = 0.001;
    
    prices.prices.forEach(element => {
        if(parseFloat(highest) < parseFloat(element.prices))
            highest = element.prices;
    });
        
    for (var i = 0; i < prices.prices.length; i++) {
        var item = [8.669173, 50.106046, parseFloat(parseFloat(prices.prices[i].prices) / parseFloat(highest))];
        data.push(item);
    }
    
    return data;
}

