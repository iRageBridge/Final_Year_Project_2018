export class Post{

static fromJsonList(array): Post[]{
    return array.map(Post.fromArray);
}

static fromArray({$key, bench, bodyweight, w_class, comp, deadlift, gender, id, location, name, place, raw_eq, squat, total, weight_class, wilks, year}):Post{
    return new Post($key, bench, bodyweight, w_class, comp, deadlift, gender, id, location, name, place, raw_eq, squat, total, weight_class, wilks, year);
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
        public weight_class: string,
        public wilks: string,
        public year: string,
    ){}
}