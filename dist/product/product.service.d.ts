import { Product } from './schema/product.schema';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
export declare class ProductService {
    private productModel;
    private categoryModel;
    private relationModel;
    private priceModel;
    private imageService;
    constructor(productModel: any, categoryModel: any, relationModel: any, priceModel: any, imageService: UploadFileService);
    createProduct(createProductDto: CreateProductDto, imageFile?: any): Promise<Product>;
    deleteProduct(id: string): Promise<any>;
    updateProduct(productUpdate: UpdateProductDto, imageFile?: any): Promise<Product>;
    findAll(sortField?: string, sortOrder?: string): Promise<Product[]>;
    findOne(productId: string): Promise<any>;
    searchProducts(query: string, sortField?: string, sortOrder?: string): Promise<Product[]>;
    showVisible(sortField?: string, sortOrder?: string): Promise<Product[]>;
    showInvisible(sortField?: string, sortOrder?: string): Promise<Product[]>;
    getCategory(categoryId: string, sortField?: string, sortOrder?: string): Promise<any>;
    getAllProductsWithOrderLines(): Promise<Product[]>;
    getCategoryProductsWithOrderLines(categoryId: string): Promise<Product[]>;
    getAllProductsWithAdditionalProductsAndPrices(): Promise<Product[]>;
}
