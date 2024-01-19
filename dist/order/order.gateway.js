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
exports.OrderGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const http_1 = require("http");
const order_service_1 = require("./order.service");
let OrderGateway = exports.OrderGateway = class OrderGateway {
    constructor(orderServise) {
        this.orderServise = orderServise;
    }
    async handleNewOrder() {
        const waitingOrders = await this.orderServise.findWaiting('_id', 'asc');
        this.server.emit('newOrder', waitingOrders);
    }
    async handleInProgressder() {
        const inProgressOrders = await this.orderServise.findInProgress('_id', 'asc');
        this.server.emit('inProgressOrder', inProgressOrders);
    }
    async handleDoneder() {
        const doneOrders = await this.orderServise.findDone('_id', 'asc', 15);
        this.server.emit('doneOrder', doneOrders);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", http_1.Server)
], OrderGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newOrder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderGateway.prototype, "handleNewOrder", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('inProgressOrder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderGateway.prototype, "handleInProgressder", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('doneOrder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderGateway.prototype, "handleDoneder", null);
exports.OrderGateway = OrderGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderGateway);
//# sourceMappingURL=order.gateway.js.map