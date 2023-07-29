// import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
// import  dayjsGenerateConfig from 'antd/node_modules/rc-picker/lib/generate/dayjs';
// import dayjsGenerateConfig from "antd/node_modules/rc-picker/es/generate/dayjs";
import dayjsGenerateConfig from "node_modules/.pnpm/rc-picker@3.7.6_dayjs@1.11.7_react-dom@18.2.0_react@18.2.0/node_modules/rc-picker/es/generate/dayjs";

import generatePicker from 'antd/lib/date-picker/generatePicker';
//import generatePicker from "antd/es/date-picker/generatePicker";
import 'antd/lib/date-picker/style/index';

const DatePicker = generatePicker(dayjsGenerateConfig);

export default DatePicker;



