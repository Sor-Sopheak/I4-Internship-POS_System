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
exports.AdditionalProductRelationController = void 0;
const common_1 = require("@nestjs/common");
const additional_product_relation_service_1 = require("./additional-product-relation.service");
const createAdditionalRelation_dto_1 = require("./dto/createAdditionalRelation.dto");
const role_decorator_1 = require("../auth/middlewares/role.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
let AdditionalProductRelationController = exports.AdditionalProductRelationController = class AdditionalProductRelationController {
    constructor(relationService) {
        this.relationService = relationService;
    }
    async create(relationDto) {
        const newRelation = this.relationService.createRelation(relationDto);
        return newRelation;
    }
    async deleteRelation(param) {
        const data = await this.relationService.deleteRelation(param.id);
        return data;
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAdditionalRelation_dto_1.CreateAdditionalRelationDto]),
    __metadata("design:returntype", Promise)
], AdditionalProductRelationController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdditionalProductRelationController.prototype, "deleteRelation", null);
exports.AdditionalProductRelationController = AdditionalProductRelationController = __decorate([
    (0, common_1.Controller)('additional-product-relation'),
    __metadata("design:paramtypes", [additional_product_relation_service_1.AdditionalProductRelationService])
], AdditionalProductRelationController);
//# sourceMappingURL=additional-product-relation.controller.js.map