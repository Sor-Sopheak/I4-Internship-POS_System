import { OrderLine } from './schema/order-line.schema';
import { CreateOrderLineDto } from './dto/createOrderLine.dto';
export declare class OrderLineService {
    private orderLineModel;
    private productModel;
    private orderModel;
    constructor(orderLineModel: any, productModel: any, orderModel: any);
    createOrderLine(orderDto: CreateOrderLineDto): Promise<OrderLine>;
    deleteOrderLinesByOrder(orderId: string): Promise<any>;
    deleteOrderLine(id: string): Promise<any>;
}
