 export interface CustomError extends Error{
    error_code?: string;
    error_description?: string;
    statusCode?: number;
  }