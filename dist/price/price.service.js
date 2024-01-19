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
exports.PriceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const price_schema_1 = require("./schema/price.schema");
const product_schema_1 = require("../product/schema/product.schema");
let PriceService = exports.PriceService = class PriceService {
    constructor(priceModel, productModel) {
        this.priceModel = priceModel;
        this.productModel = productModel;
    }
    async createPrice(createPriceDto) {
        let product = await this.productModel.findById(createPriceDto.productId);
        if (product == null) {
            throw new common_1.HttpException({ success: false, message: "Input productId does not exist" }, common_1.HttpStatus.NOT_FOUND);
        }
        try {
            return await this.priceModel.create({
                name: createPriceDto.name,
                productId: createPriceDto.productId,
                price: createPriceDto.price
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async deletePrice(id) {
        try {
            const deletePrice = await this.priceModel.findById(id);
            await deletePrice.deleteOne();
            return {
                success: true,
                message: "Price was deleted"
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async updatePrice(priceUpdate) {
        try {
            let price = await this.priceModel.findById(priceUpdate._id);
            if (priceUpdate.name) {
                price.name = priceUpdate.name;
            }
            if (priceUpdate.productId) {
                let product = await this.productModel.findById(priceUpdate.productId);
                if (product == null) {
                    throw new common_1.HttpException({ success: false, message: "Input productId does not exist" }, common_1.HttpStatus.NOT_FOUND);
                }
                price.categoryId = priceUpdate.productId;
            }
            if (priceUpdate.price) {
                price.price = priceUpdate.price;
            }
            return await price.save();
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
};
exports.PriceService = PriceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(price_schema_1.Price.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [Object, Object])
], PriceService);
//# sourceMappingURL=price.service.js.map