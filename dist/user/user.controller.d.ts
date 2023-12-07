import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    createUser(img: any, user: CreateUserDto): Promise<User>;
    getAll(sortField: string, sortOrder: string): Promise<User[]>;
    deleteUser(param: any): Promise<any>;
    updateUser(image: any, user: UpdateUserDto): Promise<any>;
    searchUsers(query: string, sortField: string, sortOrder: string): Promise<User[]>;
}
