import { RawBodyRequest } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { Request } from 'express';
import { OrderGateway } from 'src/order/order.gateway';
import { Response } from 'express';
export declare class PaymentController {
    private paymentService;
    private orderGateway;
    private orderModel;
    constructor(paymentService: PaymentService, orderGateway: OrderGateway, orderModel: any);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<any>;
    createPaymentRefund(orderId: string, amount: number): Promise<any>;
    handlePaymentSuccess(res: any, req: RawBodyRequest<Request>): Promise<any>;
    sucessPayment(orderId: string, response: Response): Promise<void>;
}
