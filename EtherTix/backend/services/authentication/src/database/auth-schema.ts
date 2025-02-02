require('dotenv').config();
import mongoose from "mongoose";

const AUTH_SERVICE_DB_URI = process.env.AUTH_SERVICE_DB_URI;

export const connectAuthSchema = async (): Promise<any> => {

    try {

        const conn = await mongoose.connect(AUTH_SERVICE_DB_URI as any)

            if(conn.connection) {
                return console.log(`Connected to authentication service database...`)
            }

            else {
                return console.log(`Could not connect to the authentication service database schema`)
            }
    } 
    
    catch(error: any) {
        
        if(error) {
            return console.error(error);
        }

    }
}