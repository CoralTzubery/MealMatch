import "dotenv/config";

import { createServer } from "http";
import mongoose from "mongoose";
import { app } from "./app";


const server = createServer(app);
const port = process.env.PORT || 3000;

async function init() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING!, {
            dbName: process.env.DB_NAME,
        });

        console.log("Connected to MongoDB");
        server.listen(port, () => console.log(`Server listening on port ${port}`));
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

init();
