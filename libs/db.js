import mongoose from "mongoose";
var isConnected = false;

const ConnectDB = async () => {
  try {
    if (isConnected) {
      console.log("Already Connected to DB");
    } else {
      await mongoose.connect(process.env.dbConnection);
      console.log("Connected to DB");
      isConnected = true;
    }
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
