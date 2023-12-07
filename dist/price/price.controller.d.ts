import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/createPrice.dto';
import { Price } from './schema/price.schema';
import { UpdatePriceDto } from './dto/updatePrice.dto';
export declare class PriceController {
    private priceService;
    constructor(priceService: PriceService);
    createPrice(price: CreatePriceDto): Promise<Price>;
    updatePrice(price: UpdatePriceDto): Promise<Price>;
    deletePrice(param: any): Promise<any>;
}
