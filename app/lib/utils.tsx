import mongoose, { Connection } from "mongoose"

interface ConnectionType {
  isConnected?: number;
}


const handleError = (error: any) => {
  console.error('Failed to connect to MongoDB:', error);
};

const connection: ConnectionType = {};

export const connectToDB = async () => {

  if (connection.isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO as string, {
    });

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected) {
      console.log('Successfully connected to MongoDB');
    }
  } catch (error) {
    handleError(error);
  }
};