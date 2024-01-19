/// <reference types="node" />
import { Server } from 'http';
import { OrderService } from './order.service';
export declare class OrderGateway {
    private readonly orderServise;
    constructor(orderServise: OrderService);
    server: Server;
    handleNewOrder(): Promise<void>;
    handleInProgressder(): Promise<void>;
    handleDoneder(): Promise<void>;
}
