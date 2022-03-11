import { IAuthenticator } from 'auth/authenticator.interface';
import { Logger } from 'common/logger';
import { AuthenticationResult } from 'domain.types/auth/auth.domain.types';
import { CurrentUser } from 'domain.types/miscellaneous/current.user';
import express from 'express';
import jwt from 'jsonwebtoken';

//////////////////////////////////////////////////////////////

export class CustomAuthenticator implements IAuthenticator {
    public authenticateUser = async (request: express.Request): Promise<AuthenticationResult> => {
        try {
            var res: AuthenticationResult = {
                Result: true,
                Message: 'Authenticated',
                HttpErrorCode: 200,
            };

            const authHeader = request.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (token == null) {
                res = {
                    Result: false,
                    Message: 'Unauthorized user access',
                    HttpErrorCode: 401,
                };
                return res;
            }

            jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (error, user) => {
                if (error) {
                    res = {
                        Result: false,
                        Message: 'Forebidden user access',
                        HttpErrorCode: 403,
                    };
                    return res;
                }
                request.currentUser = user as CurrentUser;
            });
        } catch (err) {
            Logger.instance().log(JSON.stringify(err, null, 2));
            res = {
                Result: false,
                Message: 'Error authenticating user',
                HttpErrorCode: 401,
            };
        }
        return res;
    };
}
