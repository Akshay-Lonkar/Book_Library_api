import { Logger } from "common/logger";
import { DbConfig } from "../database.config";
import { Client } from "pg";

export class PostgresqlClient {
        
            static async executeQuery(query: string) {
            try{
                const config = DbConfig.config;
                const client = new Client({
                    user     : config.username,
                    host     : config.host,
                    password : config.password,
                    port     : 5432,
                });
                await client.connect();
                await client.query(query);
                await client.end();
            }
            catch(err){
                Logger.instance().log(err.message);
            }
    }
   
        public static createDb = async () => {
            try {
                const config = DbConfig.config;
                const query = `CREATE DATABASE ${config.database}`;
                await PostgresqlClient.executeQuery(query);
            } catch (error) {
                Logger.instance().log(error.message);
            }
    }
}