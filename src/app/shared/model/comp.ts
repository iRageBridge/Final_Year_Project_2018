export class Comp{

    static fromJsonList(array): Comp[]{
        return array.map(Comp.fromArray);
    }
    
    static fromArray({$key, comp, location, year, date, compId}):Comp{
        return new Comp($key, comp, location, year, date, compId);
    }
    
        constructor(
            public $key: string,
            public comp:string,
            public location:string,
            public year: number,
            public date: Date,
            public compId:Number
        ){}
    }