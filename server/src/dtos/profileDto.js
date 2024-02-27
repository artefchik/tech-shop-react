class ProfileDto {
    id;

    firstname;

    lastname;

    age;

    constructor(data) {
        this.id = data._id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.age = data.age;
    }
}
module.exports = ProfileDto;
