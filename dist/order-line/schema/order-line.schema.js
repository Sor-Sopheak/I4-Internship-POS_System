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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLineSchema = exports.OrderLine = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("../../category/schema/category.schema");
const order_schema_1 = require("../../order/schema/order.schema");
const price_schema_1 = require("../../price/schema/price.schema");
const product_schema_1 = require("../../product/schema/product.schema");
let OrderLine = exports.OrderLine = class OrderLine {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: product_schema_1.Product.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderLine.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: category_schema_1.Category.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderLine.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: order_schema_1.Order.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderLine.prototype, "orderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: price_schema_1.Price.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderLine.prototype, "priceId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderLine.prototype, "additionals", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderLine.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], OrderLine.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], OrderLine.prototype, "totalPrice", void 0);
exports.OrderLine = OrderLine = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: false
    })
], OrderLine);
exports.OrderLineSchema = mongoose_1.SchemaFactory.createForClass(OrderLine);
//# sourceMappingURL=order-line.schema.js.map