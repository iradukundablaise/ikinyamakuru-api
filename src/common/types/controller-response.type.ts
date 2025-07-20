export type ControllerResponse<T> =
  | {
    page?: number; 
    perPage?: number; 
    count?: number;
    statusCode: number; 
    data: T;
}
  | { 
    statusCode: number; 
    error: string 
};