// General API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T; // This will hold different types of data based on the request
  details?: any; // Used for error details
}