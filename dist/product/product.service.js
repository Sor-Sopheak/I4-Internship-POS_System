"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schema/product.schema");
const upload_file_service_1 = require("../upload-file/upload-file.service");
const category_schema_1 = require("../category/schema/category.schema");
const mongoose_2 = require("mongoose");
const additional_product_relation_schema_1 = require("../additional-product-relation/schema/additional-product-relation.schema");
const price_schema_1 = require("../price/schema/price.schema");
let ProductService = exports.ProductService = class ProductService {
    constructor(productModel, categoryModel, relationModel, priceModel, imageService) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
        this.relationModel = relationModel;
        this.priceModel = priceModel;
        this.imageService = imageService;
    }
    async createProduct(createProductDto, imageFile) {
        let category = await this.categoryModel.findById(createProductDto.categoryId);
        if (category == null) {
            throw new common_1.HttpException({ success: false, message: "Input categoryId does not exist" }, common_1.HttpStatus.NOT_FOUND);
        }
        try {
            let image = null;
            if (imageFile) {
                image = this.imageService.saveImage(imageFile, './asset/image/products');
            }
            let newProduct = await this.productModel.create({
                name: createProductDto.name,
                price: createProductDto.price,
                categoryId: createProductDto.categoryId,
                image: image,
                show: 'true'
            });
            await this.priceModel.create({
                name: "តូច",
                productId: newProduct._id,
                price: newProduct.price
            });
            return newProduct;
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    async deleteProduct(id) {
        try {
            const deleteProduct = await this.productModel.findById(id);
            this.relationModel.deleteMany({ productId: deleteProduct._id });
            this.priceModel.deleteMany({ productId: deleteProduct._id });
            if (deleteProduct.image) {
                this.imageService.deleteFile(deleteProduct.image);
            }
            await deleteProduct.deleteOne();
            return {
                success: true,
                message: "Product was deleted"
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async updateProduct(productUpdate, imageFile) {
        try {
            let product = await this.productModel.findById(productUpdate._id);
            if (productUpdate.name) {
                product.name = productUpdate.name;
            }
            if (productUpdate.categoryId) {
                let category = await this.categoryModel.findById(productUpdate.categoryId);
                if (category == null) {
                    throw new common_1.HttpException({ success: false, message: "Input categoryId does not exist" }, common_1.HttpStatus.NOT_FOUND);
                }
                product.categoryId = productUpdate.categoryId;
            }
            if (productUpdate.show) {
                product.show = productUpdate.show;
            }
            if (productUpdate.price) {
                product.price = productUpdate.price;
            }
            if (imageFile) {
                this.imageService.deleteFile(product.image);
                product.image = this.imageService.saveImage(imageFile, './asset/image/products');
            }
            return await product.save();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, 400);
        }
    }
    async findAll(sortField, sortOrder) {
        return this.productModel
            .aggregate([
            {
                $lookup: {
                    from: 'additionalproductrelations',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'relations',
                },
            },
            {
                $lookup: {
                    from: 'additionalproducts',
                    localField: 'relations.additionalProductId',
                    foreignField: '_id',
                    as: 'additionalProducts',
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'prices',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    show: 1,
                    categoryId: 1,
                    price: 1,
                    additionalProducts: {
                        $map: {
                            input: "$additionalProducts",
                            as: "additionalProduct",
                            in: {
                                $mergeObjects: [
                                    "$$additionalProduct",
                                    {
                                        relation: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$relations",
                                                        as: "relation",
                                                        cond: {
                                                            $eq: ["$$relation.additionalProductId", "$$additionalProduct._id"]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    prices: 1,
                },
            },
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ])
            .exec();
    }
    async findOne(productId) {
        const productObjectId = new mongoose_2.Types.ObjectId(productId);
        return await this.productModel.aggregate([
            {
                $match: {
                    _id: productObjectId,
                },
            },
            {
                $lookup: {
                    from: 'additionalproductrelations',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'relations',
                },
            },
            {
                $lookup: {
                    from: 'additionalproducts',
                    localField: 'relations.additionalProductId',
                    foreignField: '_id',
                    as: 'additionalProducts',
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'prices',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    show: 1,
                    price: 1,
                    additionalProducts: 1,
                    prices: 1,
                },
            },
        ]).then(products => products[0]);
    }
    async searchProducts(query, sortField, sortOrder) {
        const searchRegex = new RegExp(query, 'i');
        return this.productModel.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: searchRegex } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'additionalproductrelations',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'relations',
                },
            },
            {
                $lookup: {
                    from: 'additionalproducts',
                    localField: 'relations.additionalProductId',
                    foreignField: '_id',
                    as: 'additionalProducts',
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'prices',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    show: 1,
                    categoryId: 1,
                    price: 1,
                    additionalProducts: {
                        $map: {
                            input: "$additionalProducts",
                            as: "additionalProduct",
                            in: {
                                $mergeObjects: [
                                    "$$additionalProduct",
                                    {
                                        relation: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$relations",
                                                        as: "relation",
                                                        cond: {
                                                            $eq: ["$$relation.additionalProductId", "$$additionalProduct._id"]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    prices: 1,
                },
            },
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ])
            .exec();
    }
    async showVisible(sortField, sortOrder) {
        return this.productModel
            .aggregate([
            {
                $match: { show: 'true' },
            },
            {
                $lookup: {
                    from: 'additionalproductrelations',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'relations',
                },
            },
            {
                $lookup: {
                    from: 'additionalproducts',
                    localField: 'relations.additionalProductId',
                    foreignField: '_id',
                    as: 'additionalProducts',
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'prices',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    show: 1,
                    categoryId: 1,
                    price: 1,
                    additionalProducts: {
                        $map: {
                            input: "$additionalProducts",
                            as: "additionalProduct",
                            in: {
                                $mergeObjects: [
                                    "$$additionalProduct",
                                    {
                                        relation: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$relations",
                                                        as: "relation",
                                                        cond: {
                                                            $eq: ["$$relation.additionalProductId", "$$additionalProduct._id"]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    prices: 1,
                },
            },
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ])
            .exec();
    }
    async showInvisible(sortField, sortOrder) {
        return this.productModel
            .aggregate([
            {
                $match: { show: 'false' },
            },
            {
                $lookup: {
                    from: 'additionalproductrelations',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'relations',
                },
            },
            {
                $lookup: {
                    from: 'additionalproducts',
                    localField: 'relations.additionalProductId',
                    foreignField: '_id',
                    as: 'additionalProducts',
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'prices',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    show: 1,
                    categoryId: 1,
                    price: 1,
                    additionalProducts: {
                        $map: {
                            input: "$additionalProducts",
                            as: "additionalProduct",
                            in: {
                                $mergeObjects: [
                                    "$$additionalProduct",
                                    {
                                        relation: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$relations",
                                                        as: "relation",
                                                        cond: {
                                                            $eq: ["$$relation.additionalProductId", "$$additionalProduct._id"]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    prices: 1,
                },
            },
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ])
            .exec();
    }
    async getCategory(categoryId, sortField, sortOrder) {
        const categoryObjectId = new mongoose_2.Types.ObjectId(categoryId);
        return this.productModel.aggregate([
            {
                $match: {
                    $and: [
                        { categoryId: categoryObjectId },
                        { show: 'true' }
                    ],
                },
            },
            {
                $lookup: {
                    from: 'additionalproductrelations',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'relations',
                },
            },
            {
                $lookup: {
                    from: 'additionalproducts',
                    localField: 'relations.additionalProductId',
                    foreignField: '_id',
                    as: 'additionalProducts',
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'prices',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    show: 1,
                    categoryId: 1,
                    price: 1,
                    additionalProducts: {
                        $map: {
                            input: "$additionalProducts",
                            as: "additionalProduct",
                            in: {
                                $mergeObjects: [
                                    "$$additionalProduct",
                                    {
                                        relation: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$relations",
                                                        as: "relation",
                                                        cond: {
                                                            $eq: ["$$relation.additionalProductId", "$$additionalProduct._id"]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    prices: 1,
                },
            },
            {
                $sort: {
                    [sortField]: sortOrder === 'asc' ? 1 : -1,
                },
            },
        ])
            .exec();
    }
    async getAllProductsWithOrderLines() {
        const productsWithOrderLines = await this.productModel.aggregate([
            {
                $lookup: {
                    from: 'orderlines',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'orderLines',
                },
            },
        ]);
        productsWithOrderLines.forEach(product => {
            let orderAmount = 0;
            product.orderLines.forEach(orderLine => {
                orderAmount = orderAmount + orderLine.quantity;
            });
            product.orderAmount = orderAmount;
        });
        productsWithOrderLines.sort((a, b) => b.orderAmount - a.orderAmount);
        return productsWithOrderLines;
    }
    async getCategoryProductsWithOrderLines(categoryId) {
        const categoryObjectId = new mongoose_2.Types.ObjectId(categoryId);
        const productsWithOrderLines = await this.productModel.aggregate([
            {
                $match: {
                    categoryId: categoryObjectId,
                },
            },
            {
                $lookup: {
                    from: 'orderlines',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'orderLines',
                },
            },
        ]);
        productsWithOrderLines.forEach(product => {
            let orderAmount = 0;
            product.orderLines.forEach(orderLine => {
                orderAmount = orderAmount + orderLine.quantity;
            });
            product.orderAmount = orderAmount;
        });
        productsWithOrderLines.sort((a, b) => b.orderAmount - a.orderAmount);
        return productsWithOrderLines;
    }
    async getAllProductsWithAdditionalProductsAndPrices() {
        return this.productModel.aggregate([
            {
                $lookup: {
                    from: 'additionalproductrelations',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'relations',
                },
            },
            {
                $lookup: {
                    from: 'additionalproducts',
                    localField: 'relations.additionalProductId',
                    foreignField: '_id',
                    as: 'additionalProducts',
                },
            },
            {
                $lookup: {
                    from: 'prices',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'price',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    show: 1,
                    additionalProducts: 1,
                    price: 1,
                    relations: 1
                },
            },
        ]);
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(2, (0, mongoose_1.InjectModel)(additional_product_relation_schema_1.AdditionalProductRelation.name)),
    __param(3, (0, mongoose_1.InjectModel)(price_schema_1.Price.name)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, upload_file_service_1.UploadFileService])
], ProductService);
//# sourceMappingURL=product.service.js.map