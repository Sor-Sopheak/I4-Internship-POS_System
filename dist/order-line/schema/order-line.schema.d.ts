/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Types } from "mongoose";
export declare class OrderLine {
    productId: Types.ObjectId;
    categoryId: Types.ObjectId;
    orderId: Types.ObjectId;
    priceId: Types.ObjectId;
    additionals: string;
    note: string;
    quantity: number;
    totalPrice: number;
}
export declare const OrderLineSchema: import("mongoose").Schema<OrderLine, import("mongoose").Model<OrderLine, any, any, any, import("mongoose").Document<unknown, any, OrderLine> & OrderLine & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderLine, import("mongoose").Document<unknown, {}, OrderLine> & OrderLine & {
    _id: Types.ObjectId;
}>;
