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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const order_service_1 = require("../order/order.service");
const mongoose_1 = require("@nestjs/mongoose");
const payment_schema_1 = require("./schema/payment.schema");
const order_schema_1 = require("../order/schema/order.schema");
let PaymentService = exports.PaymentService = class PaymentService {
    constructor(orderService, orderModel, paymentModel) {
        this.orderService = orderService;
        this.orderModel = orderModel;
        this.paymentModel = paymentModel;
        this.stripe = new stripe_1.default('sk_test_51NndwhGMYeKzAkCMUW4LtN3Q88KUrSaJIp7VNk3cs8Zb1whCHWxL6xYOeBBldRKmd89G4SsSuTM9OkCKJF0yM2Rq00uJprY441', { apiVersion: '2023-08-16' });
    }
    async createPayment(createPaymentDto) {
        try {
            let items = [];
            const order = await this.orderService.findById(createPaymentDto.orderId);
            order[0].orderLines.forEach((orderLine) => {
                let products = orderLine.product.name;
                if (orderLine.additionals) {
                    products += ` with ${orderLine.additionals}`;
                }
                items.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: products,
                            images: [
                                'http://137.184.220.73:3001/static/get' +
                                    orderLine.product.image.substring(1),
                            ],
                        },
                        unit_amount: Math.ceil(((orderLine.totalPrice / orderLine.quantity) * 100) / 4000),
                    },
                    quantity: orderLine.quantity,
                });
            });
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: items,
                mode: 'payment',
                payment_intent_data: {
                    setup_future_usage: 'on_session',
                },
                success_url: `http://137.184.220.73:3001/payment/success?orderId=${createPaymentDto.orderId}`,
                cancel_url: `http://137.184.220.73:3001/payment/error?orderId=${createPaymentDto.orderId}`,
                metadata: {
                    orderId: createPaymentDto.orderId,
                },
            });
            const payment = await this.paymentModel.create({
                orderId: createPaymentDto.orderId,
                payment_status: session.payment_status,
                payment_intent_id: session.payment_intent,
            });
            return {
                payment,
                session
            };
        }
        catch (error) {
            console.error('Stripe Error:', error);
            throw error;
        }
    }
    async paymentRefund(orderId, amount) {
        try {
            const foundPayment = await this.paymentModel.findOne({ orderId });
            if (foundPayment?.payment_status == 'paid') {
                const refund = await this.stripe.refunds.create({
                    payment_intent: foundPayment.payment_intent_id,
                    amount: amount * 100,
                });
                return refund;
            }
            else {
                throw new common_1.BadRequestException('This payment is not paid yet.');
            }
        }
        catch (error) {
            console.error('Stripe Error:', error);
            throw error;
        }
    }
    async StatusSession(sessionId) {
        try {
            const session = await this.stripe.checkout.sessions.retrieve(sessionId);
            const orderId = session.metadata.orderId;
            if (session.payment_status === 'paid') {
                return {
                    message: 'Payment succeeded',
                    orderId: orderId,
                    session,
                };
            }
            else if (session.payment_status === 'unpaid') {
                return {
                    message: 'Payment failed unpaid',
                    orderId: orderId,
                    session,
                };
            }
            else {
                return {
                    message: 'No payment required',
                    orderId: orderId,
                    session,
                };
            }
        }
        catch (error) {
            console.error('Stripe Error: ', error);
            throw error;
        }
    }
    async updateOrderPaymentSuccessStatus(data) {
        try {
            const metaData = data['metadata'];
            const intendId = data['payment_intent'];
            const orderId = metaData.orderId;
            const payment = await this.paymentModel.findOneAndUpdate({ orderId: orderId }, { payment_status: 'paid', payment_intent_id: intendId }, { new: true });
            return payment;
        }
        catch (error) {
            console.log({ error });
        }
    }
    async updateOrderPaymentFailStatus(data) {
        const metaData = data['metadata'];
        const orderId = metaData.orderId;
        const payment = await this.paymentModel.findOneAndUpdate({ orderId: orderId }, { payment_status: 'unpaid' }, { new: true });
        return payment;
    }
};
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(2, (0, mongoose_1.InjectModel)(payment_schema_1.Payment.name)),
    __metadata("design:paramtypes", [order_service_1.OrderService, Object, Object])
], PaymentService);
//# sourceMappingURL=payment.service.js.map