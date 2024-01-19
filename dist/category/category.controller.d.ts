import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CategoryGateway } from './category.gateway';
export declare class CategoryController {
    private categoryService;
    private categoryGateway;
    constructor(categoryService: CategoryService, categoryGateway: CategoryGateway);
    create(img: any, category: CreateCategoryDto): Promise<Category>;
    getAll(sortField: string, sortOrder: string): Promise<Category[]>;
    deleteCategory(param: any): Promise<any>;
    updateCategory(image: any, category: UpdateCategoryDto): Promise<Category>;
    searchCategories(query: string, sortField: string, sortOrder: string): Promise<Category[]>;
    orderLine(): Promise<Category[]>;
}
