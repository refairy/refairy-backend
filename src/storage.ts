import mongoose from 'mongoose';
import getEnv from './utils/getEnv';
const db = mongoose.connection
mongoose.connect(getEnv('DB'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
db.on('error', () => {
    console.log('😢 Something wrong connecting DB.. Cannot start server');
    process.exit(1);
})
db.on('open', () => {
    console.log('🎉 Connected to DB')
})
export default db