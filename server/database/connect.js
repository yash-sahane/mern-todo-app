import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'todo-app',
    }).then((c) => {
        console.log(`database connected with ${c.connection.host}`);
    }).catch(err => { console.log(err) })
}   