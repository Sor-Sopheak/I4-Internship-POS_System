"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const category_module_1 = require("./category/category.module");
const product_module_1 = require("./product/product.module");
const price_module_1 = require("./price/price.module");
const additional_product_module_1 = require("./additional-product/additional-product.module");
const additional_product_relation_module_1 = require("./additional-product-relation/additional-product-relation.module");
const order_module_1 = require("./order/order.module");
const order_line_module_1 = require("./order-line/order-line.module");
const upload_file_module_1 = require("./upload-file/upload-file.module");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth/auth.module");
const guards_1 = require("./auth/guards");
const payment_module_1 = require("./payment/payment.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DB_URI),
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            price_module_1.PriceModule,
            additional_product_module_1.AdditionalProductModule,
            additional_product_relation_module_1.AdditionalProductRelationModule,
            order_module_1.OrderModule,
            order_line_module_1.OrderLineModule,
            upload_file_module_1.UploadFileModule,
            auth_module_1.AuthModule,
            payment_module_1.PaymentModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', './paymentSuccess.html'),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    transform: true,
                }),
            },
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.RolesGuard
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map