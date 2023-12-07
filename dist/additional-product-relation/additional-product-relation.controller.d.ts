import { AdditionalProductRelationService } from './additional-product-relation.service';
import { CreateAdditionalRelationDto } from './dto/createAdditionalRelation.dto';
export declare class AdditionalProductRelationController {
    private relationService;
    constructor(relationService: AdditionalProductRelationService);
    create(relationDto: CreateAdditionalRelationDto): Promise<import("./schema/additional-product-relation.schema").AdditionalProductRelation>;
    deleteRelation(param: any): Promise<any>;
}
