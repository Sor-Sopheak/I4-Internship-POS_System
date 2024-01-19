"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path_1 = require("path");
const fs_1 = require("fs");
let UploadFileService = exports.UploadFileService = class UploadFileService {
    saveImage(file, path) {
        if (!file) {
            throw new Error('No file uploaded');
        }
        const { originalname, buffer } = file;
        if (!buffer || buffer.length === 0) {
            throw new Error('Empty file buffer');
        }
        const fileName = (0, path_1.parse)(originalname).name.replace(/\s/g, '_') + "_" + Date.now() + (0, path_1.extname)(file.originalname);
        const filePath = `${path}/${fileName}`;
        if (!(0, fs_1.existsSync)(`./${path}`)) {
            (0, fs_1.mkdirSync)(`./${path}`);
        }
        const fileStream = (0, fs_1.createWriteStream)(filePath);
        fileStream.on('error', (error) => {
            throw error;
        });
        fileStream.write(buffer);
        fileStream.end();
        return filePath;
    }
    deleteFile(path) {
        try {
            fs.unlinkSync(path);
        }
        catch (err) {
            console.error(err);
        }
    }
    deleteAndAdd(oldFilePath, newFile, newPath) {
        this.deleteFile(oldFilePath);
        return this.saveImage(newFile, newPath);
    }
};
exports.UploadFileService = UploadFileService = __decorate([
    (0, common_1.Injectable)()
], UploadFileService);
//# sourceMappingURL=upload-file.service.js.map