import { AdditionalProductRelation } from './schema/additional-product-relation.schema';
import { CreateAdditionalRelationDto } from './dto/createAdditionalRelation.dto';
export declare class AdditionalProductRelationService {
    private additionalRelationModel;
    private productModel;
    private additionalModel;
    constructor(additionalRelationModel: any, productModel: any, additionalModel: any);
    createRelation(createRelationDto: CreateAdditionalRelationDto): Promise<AdditionalProductRelation>;
    deleteRelation(id: string): Promise<any>;
}
