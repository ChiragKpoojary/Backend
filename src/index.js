import dotenv from "dotenv";
import  connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});


connectDB()
.then(
app.listen(process.env.PORT || 3000,() => {
 console.log("server is on at port ", process.env.PORT);
 app.on("error", (error) =>{
console.log("server error: ", error);
throw error;
 })   
})    
)
.catch((error)=>{
    console.error("mongo failed to connect", error);
})

