/// <reference types="node" />
import { ProductService } from './product.service';
import { Server } from 'http';
export declare class ProductGateway {
    private readonly productService;
    constructor(productService: ProductService);
    server: Server;
    handleNewProduct(product: any): void;
    handleChangeProduct(): Promise<void>;
}
