import { app } from "./app.js";
import { connectDB } from "./database/connect.js";

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT} and mode is ${process.env.NODE_ENV}`);
})