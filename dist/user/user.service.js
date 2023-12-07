"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const createUser_dto_1 = require("./dto/createUser.dto");
const upload_file_service_1 = require("../upload-file/upload-file.service");
let UserService = exports.UserService = class UserService {
    constructor(userModel, imageService) {
        this.userModel = userModel;
        this.imageService = imageService;
    }
    async onApplicationBootstrap() {
        this.seedUser();
    }
    async createUser(createUserDto, imageFile) {
        try {
            const image = this.imageService.saveImage(imageFile, './asset/image/users');
            return await this.userModel.create({
                username: createUserDto.username,
                password: createUserDto.password,
                gender: createUserDto.gender,
                role: createUserDto.role,
                image: image,
            });
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async findAll(sortField, sortOrder) {
        return await this.userModel
            .aggregate([
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ])
            .exec();
    }
    async deleteUser(id) {
        try {
            const user = await this.userModel.findById(id);
            this.imageService.deleteFile(user.image);
            await user.deleteOne();
            return {
                success: true,
                message: 'User was deleted',
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async updateUser(userUpdate, imageFile) {
        try {
            let user = await this.userModel.findById(userUpdate._id);
            if (userUpdate.username) {
                user.username = userUpdate.username;
            }
            if (userUpdate.password) {
                user.password = userUpdate.password;
            }
            if (userUpdate.gender) {
                user.gender = userUpdate.gender;
            }
            if (imageFile) {
                this.imageService.deleteFile(user.image);
                user.image = this.imageService.saveImage(imageFile, './asset/image/users');
            }
            return await user.save();
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async searchUsers(query = "", sortField, sortOrder) {
        return this.userModel.aggregate([
            {
                $match: {
                    $or: [
                        { username: { $regex: query } },
                        { gender: { $regex: query } },
                        { role: { $regex: query } },
                    ],
                },
            },
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ]);
    }
    async findOne(username) {
        return await this.userModel
            .findOne({ username })
            .select('username password gender role image repeat_password')
            .exec();
    }
    async findOneById(id) {
        return await this.userModel
            .findById(id)
            .select('username password gender role image repeat_password')
            .exec();
    }
    async seedUser() {
        try {
            const existingUser = await this.userModel.findOne({ username: 'admin' });
            if (!existingUser) {
                const createUserDto = new createUser_dto_1.CreateUserDto();
                createUserDto.username = 'admin';
                createUserDto.gender = 'ប្រុុស';
                createUserDto.password = 'admin';
                createUserDto.repeat_password = 'admin';
                createUserDto.validatePassword();
                await createUserDto.hashPassword();
                const user = this.userModel.create({
                    username: createUserDto.username,
                    gender: createUserDto.gender,
                    password: createUserDto.password,
                    role: 'អ្នកគ្រប់គ្រងទិន្នន័យ',
                });
                await this.userModel.create(user);
                return { created: true, message: 'User seeded successfully' };
            }
            else {
                return { created: false, message: 'User with username "admin" already exists. Skipping seeding.' };
            }
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upload_file_service_1.UploadFileService])
], UserService);
//# sourceMappingURL=user.service.js.map