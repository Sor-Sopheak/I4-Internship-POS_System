export declare class UploadFileService {
    saveImage(file: any, path: string): string;
    deleteFile(path: string): void;
    deleteAndAdd(oldFilePath: string, newFile: any, newPath: string): string;
}
