import { CreatePaymentDto } from './dto/createPayment.dto';
import { OrderService } from 'src/order/order.service';
export declare class PaymentService {
    private orderService;
    private orderModel;
    private paymentModel;
    private stripe;
    constructor(orderService: OrderService, orderModel: any, paymentModel: any);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<any>;
    paymentRefund(orderId: string, amount: number): Promise<any>;
    StatusSession(sessionId: string): Promise<any>;
    updateOrderPaymentSuccessStatus(data: any): Promise<any>;
    updateOrderPaymentFailStatus(data: any): Promise<any>;
}
