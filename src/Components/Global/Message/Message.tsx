const { notification } = require("antd");

export const openNotificationWithIcon = (type: string | number, message: any, description: any) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
