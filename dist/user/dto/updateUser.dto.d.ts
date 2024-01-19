export declare class UpdateUserDto {
    readonly _id: string;
    readonly username: string;
    password: string;
    readonly gender: string;
    readonly role: string;
    readonly image: any;
    readonly repeat_password: string;
    validatePassword(): void;
    hashPassword(): Promise<void>;
}
