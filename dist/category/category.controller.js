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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const createCategory_dto_1 = require("./dto/createCategory.dto");
const category_service_1 = require("./category.service");
const updateCategory_dto_1 = require("./dto/updateCategory.dto");
const category_gateway_1 = require("./category.gateway");
const role_decorator_1 = require("../auth/middlewares/role.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
let CategoryController = exports.CategoryController = class CategoryController {
    constructor(categoryService, categoryGateway) {
        this.categoryService = categoryService;
        this.categoryGateway = categoryGateway;
    }
    async create(img, category) {
        const newCategory = await this.categoryService.createCategory(category, img);
        this.categoryGateway.handleNewCategory(newCategory);
        return newCategory;
    }
    async getAll(sortField, sortOrder) {
        return await this.categoryService.findAll(sortField, sortOrder);
    }
    async deleteCategory(param) {
        const data = await this.categoryService.deleteCategory(param.id);
        if (data.success) {
            this.categoryGateway.handleChangeCategory();
        }
        return data;
    }
    async updateCategory(image, category) {
        if (image) {
            const updatedCategory = await this.categoryService.updateCategory(category, image);
            this.categoryGateway.handleChangeCategory();
            return updatedCategory;
        }
        else {
            const updatedCategory = await this.categoryService.updateCategory(category);
            this.categoryGateway.handleChangeCategory();
            return updatedCategory;
        }
    }
    searchCategories(query, sortField, sortOrder) {
        return this.categoryService.searchCategories(query, sortField, sortOrder);
    }
    orderLine() {
        return this.categoryService.getAllCategoriesWithOrderLines();
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createCategory_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateCategory_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Get)('search/:query'),
    __param(0, (0, common_1.Param)('query')),
    __param(1, (0, common_1.Query)('sortField')),
    __param(2, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "searchCategories", null);
__decorate([
    (0, common_1.Get)('all/order-line'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "orderLine", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService, category_gateway_1.CategoryGateway])
], CategoryController);
//# sourceMappingURL=category.controller.js.map