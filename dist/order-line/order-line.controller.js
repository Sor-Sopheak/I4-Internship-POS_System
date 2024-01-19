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
exports.OrderLineController = void 0;
const common_1 = require("@nestjs/common");
const order_line_service_1 = require("./order-line.service");
const createOrderLine_dto_1 = require("./dto/createOrderLine.dto");
let OrderLineController = exports.OrderLineController = class OrderLineController {
    constructor(orderLineService) {
        this.orderLineService = orderLineService;
    }
    async create(orderLine) {
        const newOrderLine = await this.orderLineService.createOrderLine(orderLine);
        return newOrderLine;
    }
    async deleteByOrder(param) {
        return this.orderLineService.deleteOrderLinesByOrder(param.orderId);
    }
    async deleteOrderLine(param) {
        return this.orderLineService.deleteOrderLine(param.id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createOrderLine_dto_1.CreateOrderLineDto]),
    __metadata("design:returntype", Promise)
], OrderLineController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('order/:orderId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderLineController.prototype, "deleteByOrder", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderLineController.prototype, "deleteOrderLine", null);
exports.OrderLineController = OrderLineController = __decorate([
    (0, common_1.Controller)('order-line'),
    __metadata("design:paramtypes", [order_line_service_1.OrderLineService])
], OrderLineController);
//# sourceMappingURL=order-line.controller.js.map