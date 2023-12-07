"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("./schema/order.schema");
const product_schema_1 = require("../product/schema/product.schema");
const price_schema_1 = require("../price/schema/price.schema");
const order_gateway_1 = require("./order.gateway");
const order_line_schema_1 = require("../order-line/schema/order-line.schema");
let OrderModule = exports.OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: price_schema_1.Price.name, schema: product_schema_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: order_line_schema_1.OrderLine.name, schema: order_line_schema_1.OrderLineSchema }]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, order_gateway_1.OrderGateway],
        exports: [order_service_1.OrderService, order_gateway_1.OrderGateway]
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map