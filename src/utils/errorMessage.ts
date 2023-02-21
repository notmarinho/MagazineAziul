import {isAxiosError} from 'axios';

const errorMessage = (error: unknown) => {
  if (typeof error === 'string') {
    return error;
  }

  if (isAxiosError(error) || error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
};

export default errorMessage;
