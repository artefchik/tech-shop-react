const uuid = require('uuid');
const { ObjectId } = require('mongodb');

const titles = [
    'Мобильная разработка за неделю',
    'Модульный ноутбук MNT Pocket Reform поступает в продажу. Что за девайс и почему столько задержек?',
    'DIY — USB Jig для восстановления окирпиченных Android девайсов',
    'Использование теории игр для повышения прозрачности моделей машинного обучения',
    'Figma закрыла Dev Mode: пути обхода и их краткий обзор',
    'Наземные лазеры смогут разгонять космические аппараты на пути к другим звёздам',
    'Войти в ИТ после 45-ти: личный опыт смены профессии',
    'Гибкие магниты: что это и с чем их готовят?',
    '[Обсудим] Выбираю новый ноутбук для UX/UI-дизайна, офисной работы и путешествий',
    'Биометрические системы Apple и их безопасность',
    'КОМПАС-3D и работа с файлами других САПР.',
];

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const imgScr = [
    '/articles/img-1.png',
    '/articles/img-2.png',
    '/articles/img-3.png',
    '/articles/img-4.png',
    '/articles/img-5.png',
];

const textBlock = () => ({
    id: new ObjectId(),
    type: 'TEXT',
    title: 'Заголовок',
    paragraph:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
});
const imageBlock = () => ({
    id: new ObjectId(),
    type: 'IMAGE',
    title: 'Рисунок',
    src: imgScr[randomNumber(0, 5)],
});

const types = ['IT', 'Politics', 'Science', 'Pc'];

module.exports = {
    async up(db, client) {
        return db.collection('articles').insertMany([
            ...Array(titles.length)
                .fill(0)
                .map((_, index) => ({
                    title: titles[index],
                    img: imgScr[randomNumber(0, 5)],
                    views: randomNumber(0, 100),
                    userId: new ObjectId('65da53e1bff621c64bead455'),
                    createdAt: new Date(),
                    isUpdate: false,
                    types: [types[randomNumber(0, 4)]],
                    blocks: [textBlock(), imageBlock(), textBlock()],
                })),
        ]);
    },

    async down(db, client) {
        // TODO write the statements to rollback your migration (if possible)
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    },
};
