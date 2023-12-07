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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const createOrder_dto_1 = require("./dto/createOrder.dto");
const updateStatus_dto_1 = require("./dto/updateStatus.dto");
const role_decorator_1 = require("../auth/middlewares/role.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const order_gateway_1 = require("./order.gateway");
let OrderController = exports.OrderController = class OrderController {
    constructor(orderService, orderGateway) {
        this.orderService = orderService;
        this.orderGateway = orderGateway;
    }
    async create(order) {
        const newOrder = await this.orderService.createOrder(order);
        return newOrder;
    }
    async emitNewOrder() {
        this.orderGateway.handleNewOrder();
        return "New order emitted";
    }
    async getOrderById(id) {
        const order = await this.orderService.findById(id);
        if (!order) {
            throw new common_1.NotFoundException(`Order not found for id: ${id}`);
        }
        return order;
    }
    async findAll(sortField, sortOrder) {
        return this.orderService.findAll(sortField, sortOrder);
    }
    async findDineIn(sortField, sortOrder) {
        return this.orderService.findDineIn(sortField, sortOrder);
    }
    async findTakeOut(sortField, sortOrder) {
        return this.orderService.findTakeOut(sortField, sortOrder);
    }
    async updateStatus(updatedStatus) {
        const updatedOrder = this.orderService.updateStatus(updatedStatus);
        if ((await updatedOrder).status == 'done') {
            this.orderGateway.handleInProgressder();
            this.orderGateway.handleDoneder();
        }
        return updatedOrder;
    }
    async findWaiting(sortField, sortOrder, amount) {
        return this.orderService.findWaiting(sortField, sortOrder, amount);
    }
    async findInProgress(sortField, sortOrder, amount) {
        return this.orderService.findInProgress(sortField, sortOrder, amount);
    }
    async findDone(sortField, sortOrder, amount) {
        return this.orderService.findDone(sortField, sortOrder, amount);
    }
    async findOrderNumber(orderId) {
        let order = await this.orderService.findOrder(orderId);
        return order.orderNumber;
    }
    async deleteOrder(param) {
        const data = await this.orderService.deleteOrder(param.id);
        return data;
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createOrder_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('emit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "emitNewOrder", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dine-in'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findDineIn", null);
__decorate([
    (0, common_1.Get)('take-out'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findTakeOut", null);
__decorate([
    (0, common_1.Put)('status'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.User),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateStatus_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('status/waiting'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __param(2, (0, common_1.Query)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findWaiting", null);
__decorate([
    (0, common_1.Get)('status/in-progress'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __param(2, (0, common_1.Query)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findInProgress", null);
__decorate([
    (0, common_1.Get)('status/done'),
    __param(0, (0, common_1.Query)('sortField')),
    __param(1, (0, common_1.Query)('sortOrder')),
    __param(2, (0, common_1.Query)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findDone", null);
__decorate([
    (0, common_1.Get)('number'),
    __param(0, (0, common_1.Query)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOrderNumber", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.User),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService, order_gateway_1.OrderGateway])
], OrderController);
//# sourceMappingURL=order.controller.js.map