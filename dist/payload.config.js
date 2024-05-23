"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var config_1 = require("payload/config");
var path_1 = __importDefault(require("path"));
var Users_1 = require("./collections/Users");
var dotenv_1 = __importDefault(require("dotenv"));
var Products_1 = require("./collections/Products/Products");
var Media_1 = require("./collections/Media");
var ProductFile_1 = require("./collections/Products/ProductFile");
var Orders_1 = require("./collections/Orders");
var Admins_1 = require("./collections/Admins");
var Payments_1 = require("./collections/Payments");
var TransferTest_1 = require("./collections/TransferTest");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env')
});
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [
        Users_1.Users,
        Products_1.Productos,
        Media_1.Media,
        ProductFile_1.ProductFiles,
        Orders_1.Orders,
        Admins_1.Admins,
        Payments_1.Payments,
        TransferTest_1.TransferTest
    ],
    routes: {
        admin: '/sell'
    },
    admin: {
        user: 'admins',
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: '- Hadala',
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jpg'
        }
    },
    rateLimit: {
        max: 2000
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: process.env.MONGODB_URL
    }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, 'payload-types.ts')
    }
});
