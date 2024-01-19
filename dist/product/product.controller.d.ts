import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './schema/product.schema';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductGateway } from './product.gateway';
export declare class ProductController {
    private productService;
    private productGateway;
    constructor(productService: ProductService, productGateway: ProductGateway);
    create(img: any, product: CreateProductDto): Promise<Product>;
    deleteUser(param: any): Promise<any>;
    updateUser(image: any, product: UpdateProductDto): Promise<Product>;
    getAll(sortField: string, sortOrder: string): Promise<Product[]>;
    getAllWithOrderLine(): Promise<Product[]>;
    getVisible(sortField: string, sortOrder: string): Promise<Product[]>;
    getInvisible(sortField: string, sortOrder: string): Promise<Product[]>;
    getCategory(param: any, sortField: string, sortOrder: string): Promise<Product[]>;
    searchProducts(query: string, sortField: string, sortOrder: string): Promise<Product[]>;
    getCategoryWithOrderLine(param: any): Promise<Product[]>;
    getOne(param: any): Promise<any>;
}
