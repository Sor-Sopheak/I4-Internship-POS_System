"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLineModule = void 0;
const common_1 = require("@nestjs/common");
const order_line_controller_1 = require("./order-line.controller");
const order_line_service_1 = require("./order-line.service");
const mongoose_1 = require("@nestjs/mongoose");
const order_line_schema_1 = require("./schema/order-line.schema");
const product_schema_1 = require("../product/schema/product.schema");
const order_schema_1 = require("../order/schema/order.schema");
let OrderLineModule = exports.OrderLineModule = class OrderLineModule {
};
exports.OrderLineModule = OrderLineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: order_line_schema_1.OrderLine.name, schema: order_line_schema_1.OrderLineSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema }]),
        ],
        controllers: [order_line_controller_1.OrderLineController],
        providers: [order_line_service_1.OrderLineService],
        exports: [order_line_service_1.OrderLineService]
    })
], OrderLineModule);
//# sourceMappingURL=order-line.module.js.map