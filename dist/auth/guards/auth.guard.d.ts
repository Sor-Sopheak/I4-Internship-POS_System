import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private userService;
    constructor(jwtService: JwtService, reflector: Reflector, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
