"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceModule = void 0;
const common_1 = require("@nestjs/common");
const price_controller_1 = require("./price.controller");
const price_service_1 = require("./price.service");
const mongoose_1 = require("@nestjs/mongoose");
const price_schema_1 = require("./schema/price.schema");
const product_schema_1 = require("../product/schema/product.schema");
let PriceModule = exports.PriceModule = class PriceModule {
};
exports.PriceModule = PriceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: price_schema_1.Price.name, schema: price_schema_1.PriceSchema }]),
        ],
        controllers: [price_controller_1.PriceController],
        providers: [price_service_1.PriceService]
    })
], PriceModule);
//# sourceMappingURL=price.module.js.map