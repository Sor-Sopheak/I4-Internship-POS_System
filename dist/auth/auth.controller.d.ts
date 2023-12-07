import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private authService;
    private jwtService;
    private userService;
    constructor(authService: AuthService, jwtService: JwtService, userService: UserService);
    signIn(signInDto: SignInDto, req: Request, session: Record<string, any>): Promise<{
        user: User;
    }>;
    signOut(req: any): Promise<{
        message: string;
    } | {
        error: any;
    }>;
    getMe(req: any): Promise<any>;
}
