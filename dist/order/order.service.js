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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_schema_1 = require("./schema/order.schema");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("../product/schema/product.schema");
const price_schema_1 = require("../price/schema/price.schema");
const mongodb_1 = require("mongodb");
const order_line_schema_1 = require("../order-line/schema/order-line.schema");
let OrderService = exports.OrderService = class OrderService {
    constructor(orderModel, productModel, priceModel, orderLineModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.priceModel = priceModel;
        this.orderLineModel = orderLineModel;
    }
    async createOrder(createOrderDto) {
        try {
            const count = await this.orderModel.countDocuments().exec();
            const lastTwoDigits = count % 100;
            return await this.orderModel.create({
                type: createOrderDto.type,
                totalPrice: createOrderDto.totlaPrice,
                status: 'waiting',
                orderNumber: lastTwoDigits + 1
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async findAll(sortField, sortOrder) {
        try {
            const pipeline = [
                {
                    $lookup: {
                        from: 'orderlines',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'orderLines',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'orderLines.productId',
                        foreignField: '_id',
                        as: 'orderLines.product',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines.product',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'prices',
                        localField: 'orderLines.priceId',
                        foreignField: '_id',
                        as: 'orderLines.price',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines.price',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'payments',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'payments'
                    },
                },
                {
                    $unwind: {
                        path: '$payments',
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        totalPrice: { $first: '$totalPrice' },
                        type: { $first: '$type' },
                        status: { $first: '$status' },
                        orderNumber: { $first: '$orderNumber' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        orderLines: { $push: '$orderLines' },
                        payments: { $push: '$payments' },
                    },
                },
                {
                    $sort: {
                        [sortField]: sortOrder === 'asc' ? 1 : -1,
                    },
                },
            ];
            const takeoutOrdersWithOrderLines = await this.orderModel.aggregate(pipeline);
            return takeoutOrdersWithOrderLines;
        }
        catch (error) {
            throw error;
        }
    }
    async findDineIn(sortField, sortOrder) {
        try {
            const pipeline = [
                {
                    $match: { type: 'ញាំក្នុងហាង' },
                },
                {
                    $lookup: {
                        from: 'orderlines',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'orderLines',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'orderLines.productId',
                        foreignField: '_id',
                        as: 'orderLines.product',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines.product',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'prices',
                        localField: 'orderLines.priceId',
                        foreignField: '_id',
                        as: 'orderLines.price',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines.price',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'payments',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'payments'
                    },
                },
                {
                    $unwind: {
                        path: '$payments',
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        totalPrice: { $first: '$totalPrice' },
                        type: { $first: '$type' },
                        status: { $first: '$status' },
                        orderNumber: { $first: '$orderNumber' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        orderLines: { $push: '$orderLines' },
                        payments: { $push: '$payments' },
                    },
                },
                {
                    $sort: {
                        [sortField]: sortOrder === 'asc' ? 1 : -1,
                    },
                },
            ];
            const takeoutOrdersWithOrderLines = await this.orderModel.aggregate(pipeline);
            return takeoutOrdersWithOrderLines;
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            const pipeline = await this.orderModel.aggregate([
                {
                    $match: { _id: new mongodb_1.ObjectId(id) },
                },
                {
                    $lookup: {
                        from: 'orderlines',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'orderLines',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'orderLines.productId',
                        foreignField: '_id',
                        as: 'orderLines.product',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines.product',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'prices',
                        localField: 'orderLines.priceId',
                        foreignField: '_id',
                        as: 'orderLines.price',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines.price',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'payments',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'payments'
                    },
                },
                {
                    $unwind: {
                        path: '$payments',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        totalPrice: { $first: '$totalPrice' },
                        type: { $first: '$type' },
                        status: { $first: '$status' },
                        orderNumber: { $first: '$orderNumber' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        orderLines: { $push: '$orderLines' },
                        payments: { $push: '$payments' }
                    },
                },
            ]);
            return pipeline;
        }
        catch (error) {
            throw error;
        }
    }
    async findTakeOut(sortField, sortOrder) {
        try {
            const pipeline = [
                {
                    $match: { type: 'ខ្ចប់' },
                },
                {
                    $lookup: {
                        from: 'orderlines',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'orderLines',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'orderLines.productId',
                        foreignField: '_id',
                        as: 'orderLines.product',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines.product',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'prices',
                        localField: 'orderLines.priceId',
                        foreignField: '_id',
                        as: 'orderLines.price',
                    },
                },
                {
                    $unwind: {
                        path: '$orderLines.price',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'payments',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'payments'
                    },
                },
                {
                    $unwind: {
                        path: '$payments',
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        totalPrice: { $first: '$totalPrice' },
                        type: { $first: '$type' },
                        status: { $first: '$status' },
                        orderNumber: { $first: '$orderNumber' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        orderLines: { $push: '$orderLines' },
                        payments: { $push: '$payments' },
                    },
                },
                {
                    $sort: {
                        [sortField]: sortOrder === 'asc' ? 1 : -1,
                    },
                },
            ];
            const orders = await this.orderModel.aggregate(pipeline);
            const orderLinePromises = orders.map(async (order) => {
                await Promise.all(order.orderLines.map(async (orderLine) => {
                    orderLine.product = await this.productModel.findById(orderLine.productId);
                    orderLine.price = await this.priceModel.findById(orderLine.priceId);
                }));
            });
            await Promise.all(orderLinePromises);
            return orders;
        }
        catch (error) {
            throw error;
        }
    }
    async updateStatus(updatedStatus) {
        try {
            let order = await this.orderModel.findById(updatedStatus._id);
            order.status = updatedStatus.status;
            return await order.save();
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async findWaiting(sortField, sortOrder, amount) {
        const pipeline = [
            {
                $match: {
                    $and: [
                        { status: 'waiting' },
                        { paymentStatus: 'paid' },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'orderlines',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderLines',
                },
            },
            {
                $unwind: {
                    path: '$orderLines',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderLines.productId',
                    foreignField: '_id',
                    as: 'orderLines.product',
                },
            },
            {
                $unwind: {
                    path: '$orderLines.product',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: 'orderLines.priceId',
                    foreignField: '_id',
                    as: 'orderLines.price',
                },
            },
            {
                $unwind: {
                    path: '$orderLines.price',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: '$_id',
                    totalPrice: { $first: '$totalPrice' },
                    type: { $first: '$type' },
                    status: { $first: '$status' },
                    paymentStatus: { $first: '$paymentStatus' },
                    orderNumber: { $first: '$orderNumber' },
                    createdAt: { $first: '$createdAt' },
                    updatedAt: { $first: '$updatedAt' },
                    orderLines: { $push: '$orderLines' },
                },
            },
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ];
        if (amount !== undefined && amount > 0) {
            pipeline.push({
                $limit: amount,
            });
        }
        return this.orderModel.aggregate(pipeline).exec();
    }
    async findInProgress(sortField, sortOrder, amount) {
        const pipeline = [
            {
                $match: { status: 'in progress' },
            },
            {
                $lookup: {
                    from: 'orderlines',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderLines',
                },
            },
            {
                $unwind: {
                    path: '$orderLines',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderLines.productId',
                    foreignField: '_id',
                    as: 'orderLines.product',
                },
            },
            {
                $unwind: {
                    path: '$orderLines.product',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: 'orderLines.priceId',
                    foreignField: '_id',
                    as: 'orderLines.price',
                },
            },
            {
                $unwind: {
                    path: '$orderLines.price',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: '$_id',
                    totalPrice: { $first: '$totalPrice' },
                    type: { $first: '$type' },
                    status: { $first: '$status' },
                    orderNumber: { $first: '$orderNumber' },
                    createdAt: { $first: '$createdAt' },
                    updatedAt: { $first: '$updatedAt' },
                    orderLines: { $push: '$orderLines' },
                },
            },
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ];
        if (amount !== undefined && amount > 0) {
            pipeline.push({
                $limit: amount,
            });
        }
        return this.orderModel.aggregate(pipeline).exec();
    }
    async findDone(sortField, sortOrder, amount) {
        const pipeline = [
            {
                $match: { status: 'done' },
            },
            {
                $lookup: {
                    from: 'orderlines',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderLines',
                },
            },
            {
                $unwind: {
                    path: '$orderLines',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderLines.productId',
                    foreignField: '_id',
                    as: 'orderLines.product',
                },
            },
            {
                $unwind: {
                    path: '$orderLines.product',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: 'orderLines.priceId',
                    foreignField: '_id',
                    as: 'orderLines.price',
                },
            },
            {
                $unwind: {
                    path: '$orderLines.price',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: '$_id',
                    totalPrice: { $first: '$totalPrice' },
                    type: { $first: '$type' },
                    status: { $first: '$status' },
                    orderNumber: { $first: '$orderNumber' },
                    createdAt: { $first: '$createdAt' },
                    updatedAt: { $first: '$updatedAt' },
                    orderLines: { $push: '$orderLines' },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ];
        if (amount !== undefined && amount > 0) {
            pipeline.push({
                $limit: amount,
            });
        }
        return this.orderModel.aggregate(pipeline).exec();
    }
    async findOrder(id) {
        return await this.orderModel.findById(id);
    }
    async deleteOrder(id) {
        try {
            const deleteOrder = await this.orderModel.findById(id);
            this.orderLineModel.deleteMany({ orderId: deleteOrder._id }).exec();
            await deleteOrder.deleteOne();
            return {
                success: true,
                message: "Order was deleted"
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
};
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(price_schema_1.Price.name)),
    __param(3, (0, mongoose_1.InjectModel)(order_line_schema_1.OrderLine.name)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], OrderService);
//# sourceMappingURL=order.service.js.map