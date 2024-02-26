class UserDto {
    email;

    id;

    isActivatedEmail;

    username;

    roles;

    constructor(data) {
        this.id = data._id;
        this.email = data.email;
        this.isActivatedEmail = data.isActivatedEmail;
        this.username = data.username;
        this.roles = data.roles;
    }
}

module.exports = UserDto;
