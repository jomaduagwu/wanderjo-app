const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://jomaduagwu:ekojonwa23@cluster0.g6xtvyl.mongodb.net/?retryWrites=true&w=majority', {
    // 'mongodb://127.0.0.1:27017/wanderjo-travel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;
