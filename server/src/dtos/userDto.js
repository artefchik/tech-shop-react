class UserDto {
    email;

    id;

    isActivatedEmail;

    constructor(data) {
        this.id = data._id;
        this.email = data.email;
        this.isActivatedEmail = data.isActivatedEmail;
    }
}

module.exports = UserDto;
