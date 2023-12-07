"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalProductModule = void 0;
const common_1 = require("@nestjs/common");
const additional_product_service_1 = require("./additional-product.service");
const additional_product_controller_1 = require("./additional-product.controller");
const mongoose_1 = require("@nestjs/mongoose");
const additional_product_schema_1 = require("./schema/additional-product.schema");
const upload_file_service_1 = require("../upload-file/upload-file.service");
let AdditionalProductModule = exports.AdditionalProductModule = class AdditionalProductModule {
};
exports.AdditionalProductModule = AdditionalProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: additional_product_schema_1.AdditionalProduct.name, schema: additional_product_schema_1.AdditionalProductSchema }]),
        ],
        controllers: [additional_product_controller_1.AdditionalProductController],
        providers: [additional_product_service_1.AdditionalProductService, upload_file_service_1.UploadFileService],
    })
], AdditionalProductModule);
//# sourceMappingURL=additional-product.module.js.map