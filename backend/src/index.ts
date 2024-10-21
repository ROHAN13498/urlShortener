import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import UserRoutes from "./routes/userRoutes"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true 
}));
app.use(express.json()); 
app.use(cookieParser()); 


app.use("/api/auth", authRoutes);
app.use("/api/user",UserRoutes);
app.listen(port, () => {
    console.log("Server running on port", port);
});
