export type ControllerResponse<T> = {
    data: T;
    message?: string;
    error?: string;
    statusCode?: number;
};