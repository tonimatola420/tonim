import { notification } from 'antd';

import codeMessage from './codeMessage';

const successHandler = (data: any, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  // const { data } = response;
  if (data && data.success === true) {
    const message = data && data.message;
    const successText = message || codeMessage[data.status];

    if (options.notifyOnSuccess) {
      notification.config({
        duration: 5,
      });
      notification.success({
        message: `Request success`,
        description: successText,
      });
    }
  } else {
    const message = data && data.message;
    const errorText = message || codeMessage[data.status];
    const { status } = data;
    if (options.notifyOnFailed) {
      notification.config({
        duration: 5,
      });
      notification.error({
        message: `Request error ${status}`,
        description: errorText,
      });
    }
  }
};

export default successHandler;
