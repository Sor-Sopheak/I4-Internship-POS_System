import { OrderService } from './order.service';
import { Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderStatusDto } from './dto/updateStatus.dto';
import { OrderGateway } from './order.gateway';
export declare class OrderController {
    private orderService;
    private orderGateway;
    constructor(orderService: OrderService, orderGateway: OrderGateway);
    create(order: CreateOrderDto): Promise<Order>;
    emitNewOrder(): Promise<String>;
    getOrderById(id: string): Promise<Order>;
    findAll(sortField: string, sortOrder: string): Promise<Order[]>;
    findDineIn(sortField: string, sortOrder: string): Promise<Order[]>;
    findTakeOut(sortField: string, sortOrder: string): Promise<Order[]>;
    updateStatus(updatedStatus: UpdateOrderStatusDto): Promise<Order>;
    findWaiting(sortField: string, sortOrder: string, amount: number): Promise<Order[]>;
    findInProgress(sortField: string, sortOrder: string, amount: number): Promise<Order[]>;
    findDone(sortField: string, sortOrder: string, amount: number): Promise<Order[]>;
    findOrderNumber(orderId: string): Promise<Order[]>;
    deleteOrder(param: any): Promise<{
        success: boolean;
        message: any;
    }>;
}
