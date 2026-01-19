export class ApiResponse<T> {
    public success: boolean;
    public message?: string;
    public data?: T;

    constructor(success: boolean, data?: T, message?: string) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    static success<T>(data: T, message?: string): ApiResponse<T> {
        return new ApiResponse(true, data, message);
    }

    static error<T>(message: string, data?: T): ApiResponse<T> {
        return new ApiResponse(false, data, message);
    }
}
