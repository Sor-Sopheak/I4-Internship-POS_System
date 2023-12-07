import { CategoryService } from './category.service';
import { Server } from 'socket.io';
export declare class CategoryGateway {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    server: Server;
    handleNewCategory(category: any): void;
    handleChangeCategory(): void;
}
