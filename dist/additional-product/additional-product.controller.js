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
exports.AdditionalProductController = void 0;
const common_1 = require("@nestjs/common");
const additional_product_service_1 = require("./additional-product.service");
const platform_express_1 = require("@nestjs/platform-express");
const createAdditinal_dto_1 = require("./dto/createAdditinal.dto");
const updateAdditional_dto_1 = require("./dto/updateAdditional.dto");
const role_decorator_1 = require("../auth/middlewares/role.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
let AdditionalProductController = exports.AdditionalProductController = class AdditionalProductController {
    constructor(additionalService) {
        this.additionalService = additionalService;
    }
    async create(img, additional) {
        const newAdditional = await this.additionalService.createAdditional(additional, img);
        return newAdditional;
    }
    async getAll(sortField, sortOrder) {
        return await this.additionalService.findAll(sortField, sortOrder);
    }
    async deleteAdditional(param) {
        const data = await this.additionalService.deleteAdditional(param.id);
        return data;
    }
    async updateAdditional(image, additional) {
        if (image) {
            const updatedAdditional = await this.additionalService.updateAdditional(additional, image);
            return updatedAdditional;
        }
        else {
            const updatedAdditional = await this.additionalService.updateAdditional(additional);
            return updatedAdditional;
        }
    }
    searchAdditionals(query, sortField, sortOrder) {
        return this.additionalService.searchAdditionals(query, sortField, sortOrder);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createAdditinal_dto_1.CreateAdditionalDto]),
    __metadata("design:returntype", Promise)
], AdditionalProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdditionalProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdditionalProductController.prototype, "deleteAdditional", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateAdditional_dto_1.UpdateAdditionalDto]),
    __metadata("design:returntype", Promise)
], AdditionalProductController.prototype, "updateAdditional", null);
__decorate([
    (0, common_1.Get)('search/:query'),
    __param(0, (0, common_1.Param)('query')),
    __param(1, (0, common_1.Query)('sortField')),
    __param(2, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdditionalProductController.prototype, "searchAdditionals", null);
exports.AdditionalProductController = AdditionalProductController = __decorate([
    (0, common_1.Controller)('additional-product'),
    __metadata("design:paramtypes", [additional_product_service_1.AdditionalProductService])
], AdditionalProductController);
//# sourceMappingURL=additional-product.controller.js.map