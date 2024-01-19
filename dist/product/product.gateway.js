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
exports.ProductGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const product_service_1 = require("./product.service");
const http_1 = require("http");
let ProductGateway = exports.ProductGateway = class ProductGateway {
    constructor(productService) {
        this.productService = productService;
    }
    handleNewProduct(product) {
        this.server.emit('newProduct', product);
    }
    async handleChangeProduct() {
        this.server.emit('changeProduct', await this.productService.showVisible());
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", http_1.Server)
], ProductGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newProduct'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductGateway.prototype, "handleNewProduct", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('changeProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductGateway.prototype, "handleChangeProduct", null);
exports.ProductGateway = ProductGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductGateway);
//# sourceMappingURL=product.gateway.js.map