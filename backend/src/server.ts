import dotenv from "dotenv";
import http from "http";
import app from "./app.js";

dotenv.config();

let server: http.Server;

export async function startServer(): Promise<void> {
    const PORT = process.env.PORT || 3000;
    server = app.listen(PORT, () => {
    console.log(`Backend Running on Port ${PORT}`);
  });
}

export async function stopServer(): Promise<void>{
    if(!server) return;
    await server.close(()=>{
        console.log("Server shutdown gracefully");
    });
}
