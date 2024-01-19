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
exports.AdditionalProductRelationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const additional_product_relation_schema_1 = require("./schema/additional-product-relation.schema");
const product_schema_1 = require("../product/schema/product.schema");
const additional_product_schema_1 = require("../additional-product/schema/additional-product.schema");
let AdditionalProductRelationService = exports.AdditionalProductRelationService = class AdditionalProductRelationService {
    constructor(additionalRelationModel, productModel, additionalModel) {
        this.additionalRelationModel = additionalRelationModel;
        this.productModel = productModel;
        this.additionalModel = additionalModel;
    }
    async createRelation(createRelationDto) {
        let product = await this.productModel.findById(createRelationDto.productId);
        if (product == null) {
            throw new common_1.HttpException({ success: false, message: "Input productId does not exist" }, common_1.HttpStatus.NOT_FOUND);
        }
        let additional = await this.additionalModel.findById(createRelationDto.additionalProductId);
        if (product == null) {
            throw new common_1.HttpException({ success: false, message: "Input additionalId does not exist" }, common_1.HttpStatus.NOT_FOUND);
        }
        try {
            return await this.additionalRelationModel.create({
                productId: createRelationDto.productId,
                additionalProductId: createRelationDto.additionalProductId
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async deleteRelation(id) {
        try {
            const deleteRelation = await this.additionalRelationModel.findById(id);
            await deleteRelation.deleteOne();
            return {
                success: true,
                message: "Additional product relation was deleted"
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
};
exports.AdditionalProductRelationService = AdditionalProductRelationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(additional_product_relation_schema_1.AdditionalProductRelation.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(additional_product_schema_1.AdditionalProduct.name)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AdditionalProductRelationService);
//# sourceMappingURL=additional-product-relation.service.js.map