import { container, DependencyContainer } from 'tsyringe';
import { Authenticator } from 'auth/authenticator';
import { Logger } from '../common/logger';
import { Authorizer } from 'auth/authorizer';
import { DatabaseConnector } from 'database/database.connector';

export class Loader {
    private static _container: DependencyContainer = container;

    public static get container() {
        return Loader._container;
    }

    private static _authorizer: Authorizer = null;

    public static get authorizer() {
        return Loader._authorizer;
    }

    private static _authenticator: Authenticator = null;

    public static get authenticator() {
        return Loader._authenticator;
    }

    public static _databaseConnector: DatabaseConnector = null;

    public static get databaseConnector() {
        return Loader._databaseConnector;
    }

    public static init = async (): Promise<boolean> => {
        try {
            //Register injections here...
            Loader._databaseConnector = container.resolve(DatabaseConnector);

            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            return false;
        }
    };
}
