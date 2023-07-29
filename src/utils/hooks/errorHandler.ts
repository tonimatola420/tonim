import { notification } from 'antd';
import { useRouter } from "next/router";
import codeMessage from './codeMessage';

const errorHandler = (error: any) => {
  
  const { response } = error;
  // const router = useRouter();
  // console.log('23JUN2023-19:05', response.status, JSON.stringify(response.data.message));

  if (response && response.status) {
    const message = response.data && response.data.message;

    const errorText = message || codeMessage[response.status];
    const { status } = response;
    notification.config({
      duration: 10,
    });
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
    if (response.data && response.data.jwtExpired) {      
      // router.push(`/logout`);
    }
    return response.data;
  } else {
    notification.config({
      duration: 5,
    });
    notification.error({
      message: 'No internet connection',
      description: 'Cannot connect to the server, Check your internet network',
    });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server, Check your internet network',
    };
  }
};

export default errorHandler;
