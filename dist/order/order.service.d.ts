import { Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderStatusDto } from './dto/updateStatus.dto';
export declare class OrderService {
    private orderModel;
    private productModel;
    private priceModel;
    private orderLineModel;
    constructor(orderModel: any, productModel: any, priceModel: any, orderLineModel: any);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(sortField?: string, sortOrder?: string): Promise<Order[]>;
    findDineIn(sortField?: string, sortOrder?: string): Promise<Order[]>;
    findById(id: string): Promise<any>;
    findTakeOut(sortField?: string, sortOrder?: string): Promise<Order[]>;
    updateStatus(updatedStatus: UpdateOrderStatusDto): Promise<Order>;
    findWaiting(sortField?: string, sortOrder?: string, amount?: number): Promise<Order[]>;
    findInProgress(sortField?: string, sortOrder?: string, amount?: number): Promise<Order[]>;
    findDone(sortField?: string, sortOrder?: string, amount?: number): Promise<Order[]>;
    findOrder(id: string): Promise<any>;
    deleteOrder(id: string): Promise<{
        success: boolean;
        message: any;
    }>;
}
