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
exports.OrderLineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_line_schema_1 = require("./schema/order-line.schema");
const product_schema_1 = require("../product/schema/product.schema");
const order_schema_1 = require("../order/schema/order.schema");
let OrderLineService = exports.OrderLineService = class OrderLineService {
    constructor(orderLineModel, productModel, orderModel) {
        this.orderLineModel = orderLineModel;
        this.productModel = productModel;
        this.orderModel = orderModel;
    }
    async createOrderLine(orderDto) {
        try {
            let product = await this.productModel.findById(orderDto.productId);
            return this.orderLineModel.create({
                productId: orderDto.productId,
                priceId: orderDto.priceId,
                orderId: orderDto.orderId,
                categoryId: product.categoryId.toString(),
                additionals: orderDto.additionals,
                note: orderDto.note,
                quantity: orderDto.quantity,
                totalPrice: orderDto.totalPrice
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async deleteOrderLinesByOrder(orderId) {
        try {
            await this.orderLineModel.deleteMany({ orderId: orderId });
            return {
                success: true,
                message: "Order lines was deleted"
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async deleteOrderLine(id) {
        try {
            let orderLine = await this.orderLineModel.findById(id);
            let order = await this.orderModel.findById(orderLine.orderId);
            order.totalPrice = order.totalPrice - orderLine.totalPrice;
            await order.save();
            await orderLine.deleteOne();
            return {
                success: true,
                message: "Order lines was deleted"
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
};
exports.OrderLineService = OrderLineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_line_schema_1.OrderLine.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrderLineService);
//# sourceMappingURL=order-line.service.js.map