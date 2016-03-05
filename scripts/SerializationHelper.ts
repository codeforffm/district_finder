module DistrictFinder{

    export class SerializationHelper{
        static responseText : string;
        
        static toInstance<T>(obj: T, jsonfilename: string) : T {
            var request = new XMLHttpRequest();
            request.open("get", "https://raw.githubusercontent.com/codeforffm/district_finder/master/data/" + jsonfilename, false);
            request.send();

            var jsonObj = JSON.parse(request.responseText);

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
    }
}