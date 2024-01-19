import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(username: string, password: string): Promise<any>;
    signOut(session: any): Promise<{
        message: string;
    } | {
        error: any;
    }>;
}
