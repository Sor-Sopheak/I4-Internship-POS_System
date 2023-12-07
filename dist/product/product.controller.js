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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const createProduct_dto_1 = require("./dto/createProduct.dto");
const platform_express_1 = require("@nestjs/platform-express");
const updateProduct_dto_1 = require("./dto/updateProduct.dto");
const product_gateway_1 = require("./product.gateway");
const role_decorator_1 = require("../auth/middlewares/role.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
let ProductController = exports.ProductController = class ProductController {
    constructor(productService, productGateway) {
        this.productService = productService;
        this.productGateway = productGateway;
    }
    async create(img, product) {
        const newProduct = await this.productService.createProduct(product, img);
        this.productGateway.handleNewProduct(newProduct);
        return newProduct;
    }
    async deleteUser(param) {
        const data = await this.productService.deleteProduct(param.id);
        if (data.success) {
            await this.productGateway.handleChangeProduct();
        }
        return data;
    }
    async updateUser(image, product) {
        if (image) {
            const updatedProduct = await this.productService.updateProduct(product, image);
            this.productGateway.handleChangeProduct();
            return updatedProduct;
        }
        else {
            const updatedProduct = await this.productService.updateProduct(product);
            this.productGateway.handleChangeProduct();
            return updatedProduct;
        }
    }
    async getAll(sortField, sortOrder) {
        return await this.productService.findAll(sortField, sortOrder);
    }
    async getAllWithOrderLine() {
        return await this.productService.getAllProductsWithOrderLines();
    }
    async getVisible(sortField, sortOrder) {
        return await this.productService.showVisible(sortField, sortOrder);
    }
    async getInvisible(sortField, sortOrder) {
        return await this.productService.showInvisible(sortField, sortOrder);
    }
    async getCategory(param, sortField, sortOrder) {
        return await this.productService.getCategory(param.categoryId, sortField, sortOrder);
    }
    searchProducts(query, sortField, sortOrder) {
        return this.productService.searchProducts(query, sortField, sortOrder);
    }
    async getCategoryWithOrderLine(param) {
        return await this.productService.getCategoryProductsWithOrderLines(param.categoryId);
    }
    async getOne(param) {
        return await this.productService.findOne(param);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createProduct_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateProduct_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/all/order-line'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllWithOrderLine", null);
__decorate([
    (0, common_1.Get)('/visible'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getVisible", null);
__decorate([
    (0, common_1.Get)('/invisible'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getInvisible", null);
__decorate([
    (0, common_1.Get)('/category/:categoryId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)('sortField')),
    __param(2, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Get)('search/:query'),
    __param(0, (0, common_1.Param)('query')),
    __param(1, (0, common_1.Query)('sortField')),
    __param(2, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.Get)('/category/order-line/:categoryId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getCategoryWithOrderLine", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getOne", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService, product_gateway_1.ProductGateway])
], ProductController);
//# sourceMappingURL=product.controller.js.map