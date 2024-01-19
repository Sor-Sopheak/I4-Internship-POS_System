export declare class CreateUserDto {
    username: string;
    password: string;
    gender: string;
    readonly role: string;
    readonly image: any;
    repeat_password: string;
    validatePassword(): void;
    hashPassword(): Promise<void>;
}
