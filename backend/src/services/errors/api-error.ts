type ApiErrorProps = {
  statusCode: number;
  message: string;
  errors?: unknown;
};

export class ApiError extends Error {
  private props: ApiErrorProps;

  constructor(props: ApiErrorProps) {
    super(props.message);
    this.props = props;
  }

  get statusCode() {
    return this.props.statusCode;
  }

  get message() {
    return this.props.message;
  }

  get errors() {
    return this.props.errors;
  }
}
