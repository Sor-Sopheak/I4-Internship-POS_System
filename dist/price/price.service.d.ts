import { Price } from './schema/price.schema';
import { CreatePriceDto } from './dto/createPrice.dto';
import { UpdatePriceDto } from './dto/updatePrice.dto';
export declare class PriceService {
    private priceModel;
    private productModel;
    constructor(priceModel: any, productModel: any);
    createPrice(createPriceDto: CreatePriceDto): Promise<Price>;
    deletePrice(id: string): Promise<any>;
    updatePrice(priceUpdate: UpdatePriceDto): Promise<Price>;
}
