export class Result{

static fromJsonList(array): Result[]{
    return array.map(Result.fromArray);
}

static fromArray({$key, bench, bodyweight, comp, deadlift, gender, id, location, name, place, raw_eq, squat, total, w_class, wilks, year, nameLower, date, compId}):Result{
    return new Result($key, bench, bodyweight, comp, deadlift, gender, id, location, name, place, raw_eq, squat, total, w_class, wilks, year, nameLower, date, compId);
}

    constructor(
        public $key: string,
        public bench: string,
        public bodyweight: string,
        public w_class: string,
        public comp: string,
        public deadlift: string,
        public gender: string,
        public id: string,
        public location: string,
        public name: string,
        public place: string,
        public raw_eq: string,
        public squat: string,
        public total: string,
        public wilks: string,
        public year: string,
        public nameLower: string,
        public date:Date,
        public compId:Number
    ){}
}