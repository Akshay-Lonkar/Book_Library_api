import { AuthenticationType, AuthorizationType, Configurations, DatabaseFlavour, DatabaseORM, DatabaseType } from './configuration.types';
import * as Configuration from '../app.config.json';
import { config } from 'dotenv';

export class ConfigurationManager {
    static DatabaseFlavour() {
        throw new Error('Method not implemented.');
    }
    static _config: Configurations = null;

    public static loadConfigurations = (): void => {
        ConfigurationManager._config = {
            BaseUrl: process.env.BASE_URL,
            SystemIdentifier: '',
            MaxUploadFileSize: 0,
            Auth: {
                Authentication: Configuration.Auth.Authentication as AuthenticationType,
                Authorization: Configuration.Auth.Authorization as AuthorizationType,
            },

            Database : {
                Type    : Configuration.Database.Type as DatabaseType,
                ORM     : Configuration.Database.ORM as DatabaseORM,
                Flavour : Configuration.Database.Flavour as DatabaseFlavour,
            },
        };

    };

    public static Authentication = (): AuthenticationType => {
        return ConfigurationManager._config.Auth.Authentication;
    };

    public static Authorization = (): AuthorizationType => {
        return ConfigurationManager._config.Auth.Authorization;
    };

    public static MaxUploadFileSize = (): number => {
        return ConfigurationManager._config.MaxUploadFileSize;
    };
}
