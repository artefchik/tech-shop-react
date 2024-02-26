class CommentDto {
    articleId;

    text;

    id;

    constructor(data) {
        this.id = data._id;
        this.articleId = data.articleId;
        this.text = data.text;
    }
}

module.exports = CommentDto;
