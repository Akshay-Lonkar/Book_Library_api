import { CurrentUser } from 'domain.types/miscellaneous/current.user';

declare global {
    namespace Express {
        interface Request {
            currentUser: CurrentUser;
            context: string;
            resourceType: string;
            resourceId: string | number | null | undefined;
            resourceOwnerUserId: string;
        }
    }
}
