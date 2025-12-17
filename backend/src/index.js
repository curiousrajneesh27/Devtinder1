import { server } from "./app.js";
import { PORT } from "./config/config.js";
import { connectMongoDB } from "./utils/mongodb.js";

// Connecting to mongodb
connectMongoDB()
    .then(() => {
        // console.log("MongoDB connected"); 
        // Connecting to server
        server.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error while connecting to MongoDB:", err.message);
    });