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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const createPayment_dto_1 = require("./dto/createPayment.dto");
const stripe_1 = require("stripe");
const order_gateway_1 = require("../order/order.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("../order/schema/order.schema");
let PaymentController = exports.PaymentController = class PaymentController {
    constructor(paymentService, orderGateway, orderModel) {
        this.paymentService = paymentService;
        this.orderGateway = orderGateway;
        this.orderModel = orderModel;
    }
    async createPayment(createPaymentDto) {
        try {
            const session = await this.paymentService.createPayment(createPaymentDto);
            return session;
        }
        catch (error) {
            console.error('Payment Error:', error);
            throw new common_1.NotFoundException(`Payment failed: ${error.message}`);
        }
    }
    async createPaymentRefund(orderId, amount) {
        try {
            const refund = await this.paymentService.paymentRefund(orderId, amount);
            return refund;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Payment failed: ${error.message}`);
        }
    }
    async handlePaymentSuccess(res, req) {
        const rawBody = req.rawBody;
        const stripe = new stripe_1.default('sk_test_51NndwhGMYeKzAkCMUW4LtN3Q88KUrSaJIp7VNk3cs8Zb1whCHWxL6xYOeBBldRKmd89G4SsSuTM9OkCKJF0yM2Rq00uJprY441', { apiVersion: '2023-08-16' });
        const endpointSecret = 'whsec_4Zy82bc32RzNub9Q0cHOms59nZIU6mkV';
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
        }
        catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        switch (event.type) {
            case 'payment_intent.payment_failed':
                this.paymentService.updateOrderPaymentFailStatus(event.data.object);
                break;
            case 'checkout.session.completed':
                this.paymentService.updateOrderPaymentSuccessStatus(event.data.object);
                break;
            case 'payment_intent.succeeded':
                this.paymentService.updateOrderPaymentSuccessStatus(event.data.object);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }
    async sucessPayment(orderId, response) {
        let order = await this.orderModel.findById(orderId);
        order.paymentStatus = 'paid';
        await order.save();
        this.orderGateway.handleNewOrder();
        response.sendFile('paymentSuccess.html', { root: './src' });
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPayment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Post)('refund'),
    __param(0, (0, common_1.Body)('orderId')),
    __param(1, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPaymentRefund", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handlePaymentSuccess", null);
__decorate([
    (0, common_1.Get)('success'),
    __param(0, (0, common_1.Query)('orderId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "sucessPayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __param(2, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [payment_service_1.PaymentService, order_gateway_1.OrderGateway, Object])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map