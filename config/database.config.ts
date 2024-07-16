import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb+srv://lmxnam592002:7712ieDaLakOp0UD@learningmongodb.u7f3w3c.mongodb.net/task-management");
    console.log("connect success!");
  } catch (error) {
    console.log("connect error!");
  }
}