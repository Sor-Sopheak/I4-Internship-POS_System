import { AdditionalProductService } from './additional-product.service';
import { CreateAdditionalDto } from './dto/createAdditinal.dto';
import { AdditionalProduct } from './schema/additional-product.schema';
import { UpdateAdditionalDto } from './dto/updateAdditional.dto';
export declare class AdditionalProductController {
    private additionalService;
    constructor(additionalService: AdditionalProductService);
    create(img: any, additional: CreateAdditionalDto): Promise<AdditionalProduct>;
    getAll(sortField: string, sortOrder: string): Promise<AdditionalProduct[]>;
    deleteAdditional(param: any): Promise<any>;
    updateAdditional(image: any, additional: UpdateAdditionalDto): Promise<AdditionalProduct>;
    searchAdditionals(query: string, sortField: string, sortOrder: string): Promise<AdditionalProduct[]>;
}
