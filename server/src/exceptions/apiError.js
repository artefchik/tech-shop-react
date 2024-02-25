class ApiError extends Error {
    status;

    constructor(status, message) {
        super(message);

        this.status = status;
        this.message = message;
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

    static Unauthorized(message) {
        return new ApiError(401, 'пользователь не авторизован');
    }
}

module.exports = ApiError;
