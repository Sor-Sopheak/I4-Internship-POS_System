import { Category } from './schema/category.schema';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
export declare class CategoryService {
    private categoryModel;
    private productModel;
    private imageService;
    constructor(categoryModel: any, productModel: any, imageService: UploadFileService);
    createCategory(createCategoryDto: CreateCategoryDto, imageFile?: any): Promise<any>;
    findAll(sortField?: string, sortOrder?: string): Promise<Category[]>;
    deleteCategory(id: string): Promise<any>;
    updateCategory(categoryUpdate: UpdateCategoryDto, imageFile?: any): Promise<Category>;
    searchCategories(query: string, sortField?: string, sortOrder?: string): Promise<Category[]>;
    getAllCategoriesWithOrderLines(): Promise<Category[]>;
}
