class UserDto {
    email;

    id;

    isActivatedEmail;

    username;

    roles;

    avatar;

    constructor(data) {
        this.id = data._id;
        this.email = data.email;
        this.isActivatedEmail = data.isActivatedEmail;
        this.username = data.username;
        this.roles = data.roles;
        this.avatar = data.avatar;
    }
}

module.exports = UserDto;
