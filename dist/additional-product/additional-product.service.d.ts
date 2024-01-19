import { AdditionalProduct } from './schema/additional-product.schema';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { CreateAdditionalDto } from './dto/createAdditinal.dto';
import { UpdateAdditionalDto } from './dto/updateAdditional.dto';
export declare class AdditionalProductService {
    private additionalModel;
    private imageService;
    constructor(additionalModel: any, imageService: UploadFileService);
    createAdditional(createAdditionalDto: CreateAdditionalDto, imageFile?: AdditionalProduct): Promise<any>;
    findAll(sortField?: string, sortOrder?: string): Promise<AdditionalProduct[]>;
    deleteAdditional(id: string): Promise<any>;
    updateAdditional(additionalUpdate: UpdateAdditionalDto, imageFile?: any): Promise<AdditionalProduct>;
    searchAdditionals(query: string, sortField?: string, sortOrder?: string): Promise<AdditionalProduct[]>;
}
