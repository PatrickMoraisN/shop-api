interface IAppError {
  statusCode: number;
  message: string;
  data?: string;
}

class AppError implements IAppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly data?: string;

  constructor(message: string, statusCode = 400, data: string) {
    this.message = message;
    this.statusCode = statusCode;
    if (this.data) {
      this.data = data;
    }
  }
}

export { AppError };
