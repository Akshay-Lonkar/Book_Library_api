import { CurrentUser } from './current.user';
import { RequestDto } from './request.dto';

export interface ResponseDto {
    Status: string;
    Message: string;
    HttpCode: number;
    Data?: any;
    Trace?: string[];
    User: CurrentUser;
    Context: string;
    Request?: RequestDto;
    ClientIps: string[];
    APIVersion: string;
    ServiceVersion: string;
}
