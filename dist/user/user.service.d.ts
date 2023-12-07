import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class UserService {
    private userModel;
    private imageService;
    constructor(userModel: Model<User>, imageService: UploadFileService);
    onApplicationBootstrap(): Promise<void>;
    createUser(createUserDto: CreateUserDto, imageFile?: any): Promise<any>;
    findAll(sortField?: string, sortOrder?: string): Promise<User[]>;
    deleteUser(id: string): Promise<any>;
    updateUser(userUpdate: UpdateUserDto, imageFile?: any): Promise<any>;
    searchUsers(query?: string, sortField?: string, sortOrder?: string): Promise<User[]>;
    findOne(username: string): Promise<User | null>;
    findOneById(id: string): Promise<User | null>;
    seedUser(): Promise<{
        created: boolean;
        message: string;
        error?: undefined;
    } | {
        error: any;
        created?: undefined;
        message?: undefined;
    }>;
}
