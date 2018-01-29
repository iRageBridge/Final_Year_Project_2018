export class Athlete{

    static fromJsonList(array): Athlete[]{
        return array.map(Athlete.fromArray);
    }
    
    static fromArray({$key, name}):Athlete{
        return new Athlete($key, name);
    }
    
        constructor(
            public $key: string,
            public name: string,
        ){}
    }