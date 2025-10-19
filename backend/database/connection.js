import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/biblioteca"; 

export async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado!");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}
