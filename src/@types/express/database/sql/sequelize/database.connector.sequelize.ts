import { Logger } from 'common/logger';
import { IDatabaseConnector } from "../database.connector.interface";
import { DbConfig } from "./database.config";
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize'
import { ConfigurationManager } from 'config/configuration.manager';
import { PostgresqlClient } from './dilect.clients/postgresql.client';

export class DatabaseConnector_Sequelize implements IDatabaseConnector{
    private _sequelize: Sequelize = null;
   

    private getDialect = ():  Dialect => {
        let dialect: Dialect = 'postgres';
        const flavour = ConfigurationManager.DatabaseFlavour();

        if (flavour === 'MySQL') {
            dialect = 'mysql';
        }
        if (flavour === 'PostGreSQL') {
            dialect = 'postgres';
        }

        return dialect;
    };

    
    connect = async ():  Promise<boolean> => {
        try{
            const config = DbConfig.config;
            const dialect: Dialect = this.getDialect();
            const modelsPath = [__dirname + '/models'];

            const options = {
                host    : config.host,
                dialect : dialect,
                models  : modelsPath,
                pool    : {
                    max     : config.pool.max,
                    min     : config.pool.min,
                    acquire : config.pool.acquire,
                    idle    : config.pool.idle,
                },
                logging : false, //TODO: Please provide a function here to handle logging...
            };

            this._sequelize = new Sequelize(config.database, config.username, config.password, options);

            Logger.instance().log(`Connecting to database '${config.database}' ...`);
            Logger.instance().log(`Database flavour: ${config.dialect}`);
            Logger.instance().log(`Database host: ${config.host}`);

            await this.createDatabase();
            await this._sequelize.authenticate();
            await this._sequelize.sync({ alter: true });

            return true;
        }catch(err){
            Logger.instance().log(err.message);
            return false;
        }

    };
    sync(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private getClient = () => {
        const flavour = ConfigurationManager.DatabaseFlavour();
    
         if (flavour === 'PostGreSQL') {
            return PostgresqlClient;
        }
        // return PostgresqlClient;
        throw new Error("Only PostGreSQL is supported for now!");
    
    };

    createDatabase = async (): Promise<boolean> => {
        try{
            const client = this.getClient();
            await client.createDb();
            return true;
        }catch(err){
        Logger.instance().log(err.message);
        // throw new Error("Method not implemented.");
    }
  }
    dropDatabase(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    executeQuery(query: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    migrate(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}