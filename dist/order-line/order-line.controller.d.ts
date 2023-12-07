import { OrderLineService } from './order-line.service';
import { CreateOrderLineDto } from './dto/createOrderLine.dto';
import { OrderLine } from './schema/order-line.schema';
export declare class OrderLineController {
    private orderLineService;
    constructor(orderLineService: OrderLineService);
    create(orderLine: CreateOrderLineDto): Promise<OrderLine>;
    deleteByOrder(param: any): Promise<any>;
    deleteOrderLine(param: any): Promise<any>;
}
