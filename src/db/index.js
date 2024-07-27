import mongoose  from  "mongoose";

import { DB_NAME} from "../constants.js";

const connectDB = async ()=>{
try{
  const Connectioninstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
 console.log(`\n mongodb connected !! DB Host: ${Connectioninstance.connection.host}`);
}catch(e){
    console.log("mongodb connection error ",e);
    process.exit(1);
}
}

export default connectDB;