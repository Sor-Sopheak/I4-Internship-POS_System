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
exports.AdditionalProductRelationSchema = exports.AdditionalProductRelation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const additional_product_schema_1 = require("../../additional-product/schema/additional-product.schema");
const product_schema_1 = require("../../product/schema/product.schema");
let AdditionalProductRelation = exports.AdditionalProductRelation = class AdditionalProductRelation {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: product_schema_1.Product.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AdditionalProductRelation.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: additional_product_schema_1.AdditionalProduct.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AdditionalProductRelation.prototype, "additionalProductId", void 0);
exports.AdditionalProductRelation = AdditionalProductRelation = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: false
    })
], AdditionalProductRelation);
exports.AdditionalProductRelationSchema = mongoose_1.SchemaFactory.createForClass(AdditionalProductRelation);
//# sourceMappingURL=additional-product-relation.schema.js.map