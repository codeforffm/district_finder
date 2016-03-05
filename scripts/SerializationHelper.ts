module DistrictFinder{

    export class SerializationHelper{
        static responseText : string;
        
        static toInstance<T>(obj: T, jsonfilename: string) : T {
            var fs = require('fs');
            var jsonObj = JSON.parse(fs.readFileSync('./data/' + jsonfilename).toString());

            if (typeof obj["fromJSON"] === "function") {
                obj["fromJSON"](jsonObj);
            }
            else {
                for (var propName in jsonObj) {
                    obj[propName] = jsonObj[propName]
                }
            }

            return obj;
        }
        
        static RequestListener(){
            
        }
    }
}