export class Athlete{

static fromJsonList(array): Athlete[]{
    return array.map(Athlete.fromArray);
}

static fromArray({$key, bench, bodyweight, w_class, comp, compId, deadlift, gender, id, location, name, place, raw_eq, squat, total, weight_class, wilks, year, nameLower, date}):Athlete{
    return new Athlete($key, bench, bodyweight, w_class, comp, compId, deadlift, gender, id, location, name, place, raw_eq, squat, total, weight_class, wilks, year, nameLower, date);
}

    constructor(
        public $key: string,
        public bench: string,
        public bodyweight: string,
        public w_class: string,
        public comp: string,
        public compId:string,
        public deadlift: string,
        public gender: string,
        public id: string,
        public location: string,
        public name: string,
        public place: string,
        public raw_eq: string,
        public squat: string,
        public total: string,
        public weight_class: string,
        public wilks: string,
        public year: string,
        public nameLower: string,
        public date: Date
    ){}
}