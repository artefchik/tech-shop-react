const color = ['blue', 'black', 'yellow', 'green', 'pink'];
const imagePhone = [
    './static/products/phone/iphone-15-blue.png',
    './static/products/phone/iphone-15-black.png',
    './static/products/phone/iphone-15-yellow.png',
    './static/products/phone/iphone-15-green.png',
    './static/products/phone/iphone-15-pink.png',
];

const memory = ['128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ'];

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const bool = [false, true];

const array = () =>
    memory.map((item) => ({
        memoryVariant: item,
        isInStock: bool[randomNumber(0, 1)],
    }));

module.exports = {
    async up(db, client) {
        return db.collection('products').insertMany([
            ...Array(5)
                .fill(0)
                .map((_, index) => ({
                    title: 'Apple iPhone 15',
                    category: 'phone',
                    color: color[index],
                    imageSrc: imagePhone[index],
                    memory: array(),
                    price: {
                        current: [599, 699, 799, 999],
                        previous: [699, 799, 899, 1099],
                    },
                })),
        ]);
    },

    async down(db, client) {
        // TODO write the statements to rollback your migration (if possible)
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    },
};
