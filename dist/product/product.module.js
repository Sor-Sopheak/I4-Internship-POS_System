"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schema/product.schema");
const category_schema_1 = require("../category/schema/category.schema");
const upload_file_service_1 = require("../upload-file/upload-file.service");
const product_gateway_1 = require("./product.gateway");
const additional_product_relation_schema_1 = require("../additional-product-relation/schema/additional-product-relation.schema");
const price_schema_1 = require("../price/schema/price.schema");
let ProductModule = exports.ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: price_schema_1.Price.name, schema: price_schema_1.PriceSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: additional_product_relation_schema_1.AdditionalProductRelation.name, schema: additional_product_relation_schema_1.AdditionalProductRelationSchema }]),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, upload_file_service_1.UploadFileService, product_gateway_1.ProductGateway]
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map