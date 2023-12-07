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
exports.CategoryGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const category_service_1 = require("./category.service");
const socket_io_1 = require("socket.io");
let CategoryGateway = exports.CategoryGateway = class CategoryGateway {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    handleNewCategory(category) {
        this.server.emit('newCategory', category);
    }
    handleChangeCategory() {
        this.server.emit('changeCategory', this.categoryService.findAll());
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CategoryGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newCategory'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryGateway.prototype, "handleNewCategory", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('changeCategory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryGateway.prototype, "handleChangeCategory", null);
exports.CategoryGateway = CategoryGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryGateway);
//# sourceMappingURL=category.gateway.js.map