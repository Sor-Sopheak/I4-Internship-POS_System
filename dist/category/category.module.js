"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const upload_file_service_1 = require("../upload-file/upload-file.service");
const category_schema_1 = require("./schema/category.schema");
const mongoose_1 = require("@nestjs/mongoose");
const category_gateway_1 = require("./category.gateway");
const product_schema_1 = require("../product/schema/product.schema");
let CategoryModule = exports.CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }])
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService, upload_file_service_1.UploadFileService, category_gateway_1.CategoryGateway]
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map