"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalProductRelationModule = void 0;
const common_1 = require("@nestjs/common");
const additional_product_relation_controller_1 = require("./additional-product-relation.controller");
const additional_product_relation_service_1 = require("./additional-product-relation.service");
const mongoose_1 = require("@nestjs/mongoose");
const additional_product_relation_schema_1 = require("./schema/additional-product-relation.schema");
const product_schema_1 = require("../product/schema/product.schema");
const additional_product_schema_1 = require("../additional-product/schema/additional-product.schema");
let AdditionalProductRelationModule = exports.AdditionalProductRelationModule = class AdditionalProductRelationModule {
};
exports.AdditionalProductRelationModule = AdditionalProductRelationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: additional_product_relation_schema_1.AdditionalProductRelation.name, schema: additional_product_relation_schema_1.AdditionalProductRelationSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: additional_product_schema_1.AdditionalProduct.name, schema: additional_product_schema_1.AdditionalProductSchema }]),
        ],
        controllers: [additional_product_relation_controller_1.AdditionalProductRelationController],
        providers: [additional_product_relation_service_1.AdditionalProductRelationService]
    })
], AdditionalProductRelationModule);
//# sourceMappingURL=additional-product-relation.module.js.map