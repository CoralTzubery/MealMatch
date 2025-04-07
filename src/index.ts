import "dotenv/config";

import { createServer } from "http";
import mongoose from "mongoose";
import { app } from "./app";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhose:${PORT}`);
});

// const server = createServer(app);
// const port = process.env.PORT || 8090;

// async function init() {
//     await mongoose.connect(process.env.CONNECTION_STRING!, {
//         dbName: process.env.DB_NAME,
//     });

//     server.listen(port, () => console.log(`Server listening on port ${port}`));
// }

// init();
