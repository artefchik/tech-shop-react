class ArticleDto {
    id;

    title;

    img;

    views;

    createdAt;

    types;

    blocks;

    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.img = data.img;
        this.views = data.views;
        this.createdAt = data.createdAt;
        this.types = data.types;
        this.blocks = data.blocks;
    }
}

module.exports = ArticleDto;
