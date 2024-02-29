const priceCurrent = [999, 1199, 1899];
const pricePrevious = [1199, 1399, 1999];

const memory = ['256 ГБ', '512 ГБ', '1 ТБ'];

const images = [
    '/products/pc/macbook-14-black.png',
    '/products/pc/macbook-14-silver.png',
    '/products/pc/macbook-14-space-gray.png',
];

const colors = ['black', 'silver', 'spaceGray'];

const generate = () => {
    const array = [];
    images.forEach((image, imgIndex) => ({
        ...Array(3)
            .fill(0)
            .map((_, index) => {
                const item = {
                    title: 'Apple Macbook 14',
                    category: 'pc',
                    color: colors[imgIndex],
                    imageSrc: images[imgIndex],
                    memory: memory[index],
                    price: {
                        current: priceCurrent[index],
                        previous: pricePrevious[index],
                    },
                };
                array.push(item);
            }),
    }));

    return array;
};
module.exports = {
    async up(db, client) {
        return db.collection('products').insertMany(generate());
    },
};
