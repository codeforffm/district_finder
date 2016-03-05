module DistrictFinder{
    export class DistrictCenter  {
        district: string;
        x: number;
        y: number;
    }

    export class DistrictCenters  {
        districts: DistrictCenter[];    
        constructor(){
        }        
    }
}