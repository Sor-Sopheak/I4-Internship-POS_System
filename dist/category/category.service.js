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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_schema_1 = require("./schema/category.schema");
const upload_file_service_1 = require("../upload-file/upload-file.service");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("../product/schema/product.schema");
let CategoryService = exports.CategoryService = class CategoryService {
    constructor(categoryModel, productModel, imageService) {
        this.categoryModel = categoryModel;
        this.productModel = productModel;
        this.imageService = imageService;
    }
    async createCategory(createCategoryDto, imageFile) {
        try {
            const image = this.imageService.saveImage(imageFile, './asset/image/categories');
            return await this.categoryModel.create({
                name: createCategoryDto.name,
                description: createCategoryDto.description,
                image: image
            });
        }
        catch (error) {
            return {
                error: error.message
            };
        }
    }
    async findAll(sortField, sortOrder) {
        return this.categoryModel.aggregate([
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ]).exec();
    }
    async deleteCategory(id) {
        try {
            const deleteCategory = await this.categoryModel.findById(id);
            await this.productModel.deleteMany({ categoryId: deleteCategory._id }).exec();
            this.imageService.deleteFile(deleteCategory.image);
            await deleteCategory.deleteOne();
            return {
                success: true,
                message: "Category was deleted"
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async updateCategory(categoryUpdate, imageFile) {
        try {
            let category = await this.categoryModel.findById(categoryUpdate._id);
            if (categoryUpdate.name) {
                category.name = categoryUpdate.name;
            }
            if (categoryUpdate.description) {
                category.description = categoryUpdate.description;
            }
            if (imageFile) {
                this.imageService.deleteFile(category.image);
                category.image = this.imageService.saveImage(imageFile, './asset/image/categories');
            }
            return await category.save();
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async searchCategories(query, sortField, sortOrder) {
        return this.categoryModel.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: query } },
                        { description: { $regex: query } },
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
    async getAllCategoriesWithOrderLines() {
        const categoriesWithOrderLines = await this.categoryModel.aggregate([
            {
                $lookup: {
                    from: 'orderlines',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'orderLines',
                },
            },
        ]);
        categoriesWithOrderLines.forEach(category => {
            let orderAmount = 0;
            category.orderLines.forEach(orderLine => {
                orderAmount = orderAmount + orderLine.quantity;
            });
            category.orderAmount = orderAmount;
        });
        return categoriesWithOrderLines;
    }
};
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [Object, Object, upload_file_service_1.UploadFileService])
], CategoryService);
//# sourceMappingURL=category.service.js.map