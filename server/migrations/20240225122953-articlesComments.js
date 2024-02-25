const { ObjectId } = require('mongodb');

module.exports = {
    async up(db, client) {
        return db.collection('articlesComments').insertOne({
            articlesId: new ObjectId('65db10543ec1063f5604d118'),
            comments: [
                ...Array(4)
                    .fill(0)
                    .map((_, index) => ({
                        text: 'text',
                        userId: new ObjectId('65da53e1bff621c64bead455'),
                    })),
            ],
        });
    },

    async down(db, client) {
        // TODO write the statements to rollback your migration (if possible)
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    },
};
