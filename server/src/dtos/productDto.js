class ProductDto {
    id;

    title;

    category;

    color;

    imageSrc;

    memory;

    price;

    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.category = data.category;
        this.color = data.color;
        this.imageSrc = data.imageSrc;
        this.memory = data.memory;
        this.price = data.price;
    }
}

module.exports = ProductDto;
