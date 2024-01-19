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
exports.AdditionalProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const additional_product_schema_1 = require("./schema/additional-product.schema");
const upload_file_service_1 = require("../upload-file/upload-file.service");
let AdditionalProductService = exports.AdditionalProductService = class AdditionalProductService {
    constructor(additionalModel, imageService) {
        this.additionalModel = additionalModel;
        this.imageService = imageService;
    }
    async createAdditional(createAdditionalDto, imageFile) {
        try {
            const image = this.imageService.saveImage(imageFile, './asset/image/additionals');
            return await this.additionalModel.create({
                name: createAdditionalDto.name,
                price: createAdditionalDto.price,
                image: image
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async findAll(sortField, sortOrder) {
        return this.additionalModel.aggregate([
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ]).exec();
    }
    async deleteAdditional(id) {
        try {
            const deleteAdditional = await this.additionalModel.findById(id);
            this.imageService.deleteFile(deleteAdditional.image);
            await deleteAdditional.deleteOne();
            return {
                success: true,
                message: "Additional was deleted"
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async updateAdditional(additionalUpdate, imageFile) {
        try {
            let additional = await this.additionalModel.findById(additionalUpdate._id);
            if (additionalUpdate.name) {
                additional.name = additionalUpdate.name;
            }
            if (additionalUpdate.price) {
                additional.price = additionalUpdate.price;
            }
            if (imageFile) {
                this.imageService.deleteFile(additional.image);
                additional.image = this.imageService.saveImage(imageFile, './asset/image/additionals');
            }
            return await additional.save();
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async searchAdditionals(query, sortField, sortOrder) {
        return this.additionalModel.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: query } },
                        { price: { $regex: query } },
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
};
exports.AdditionalProductService = AdditionalProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(additional_product_schema_1.AdditionalProduct.name)),
    __metadata("design:paramtypes", [Object, upload_file_service_1.UploadFileService])
], AdditionalProductService);
//# sourceMappingURL=additional-product.service.js.map