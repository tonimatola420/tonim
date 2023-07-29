import { fetcher } from './fetcher';
import successHandler from '@/utils/hooks/successHandler';
import errorHandler from '@/utils/hooks/errorHandler';
interface IOptions { [key: string]: any; }

export const saveItem = async (entity: string, options: any): Promise<any | null> => {
  try {
    const response = await fetcher(entity + '/create/', { method: 'POST', body: options, });
    // console.log('22JUN2023-10:37:16 AM ', JSON.stringify(response));
    successHandler(response, { notifyOnSuccess: true, notifyOnFailed: true, });
    return response;
  } 
  // catch (result: any) { 
  //   // response.json().then((json: any) => {
  //   //   console.log('SOMAK TROVI',json.message);
  //   //   console.log('SOMAK QQTROVI',json);      
  //   // })
  //   console.log('22JUN2023-10:36:16 AM ',  result.message,);
  //   return errorHandler(result); 
  // }
  catch(error: any) {
        let response;
        // console.log(error.status, error.statusText);
        // 3. get error messages, if any
        const data = await error.json().then((json: any) => {
          // console.log(json.message);
          // console.log(json);
          // return Promise.reject(response);
          // return json.message;
          return json;
        });
        // console.log('23jun2023-22:53', error.json());
        response = {status: error.status, statusText: error.statusText, data};
        // console.log('23jun2023-22:33', response.data.message);
        // return response;
        return errorHandler({response});
        
      };
};

export const getList = async (entity: string, options: any): Promise<any | null> => {
  try {
    let query = '?';
    for (var key in options) { query += key + '=' + options[key] + '&'; }
    query = query.slice(0, -1);
    // consolepe('13JUN 07:56:42=' + entity + '/list' + query);
    const response: any | null = await fetcher(entity + '/list' + query, { method: 'GET', });
    // console.log('5JULY 19:06:33PM = ' + JSON.stringify(response));
    successHandler(response, { notifyOnSuccess: false, notifyOnFailed: false, });
    return response;
  } 
  catch (error: any) {
    const data = await error.json().then((json: any) => { return json; });
    let response = { status: error.status, statusText: error.statusText, data };
    return errorHandler({ response });
  };
};

export const getSearchedItems = async (entity: string, options: IOptions = {}): Promise<any | null> => {
  try {
    // console.log('25JUN2023-7:37> ',JSON.stringify(options));
    let query = '?';
    for (var key in options) { query += key + '=' + options[key] + '&'; }
    query = query.slice(0, -1);
    const response: any | null = await fetcher(entity + '/search' + query, { method: 'GET', });
    successHandler(response, { notifyOnSuccess: false, notifyOnFailed: false, });
    return response;
  } catch (error) { return errorHandler(error); }
};

export const getDropdownItems = async (entity: string, options: IOptions = {}): Promise<any | null> => {
  try {
    // console.log('25JUN2023-7:37> ',JSON.stringify(options));
    let query = '?';
    for (var key in options) { query += key + '=' + options[key] + '&'; }
    query = query.slice(0, -1);
    const response: any | null = await fetcher(entity + '/dropdown' + query, { method: 'GET', });
    successHandler(response, { notifyOnSuccess: false, notifyOnFailed: false, });
    return response;
  }
  catch (error: any) {
    const data = await error.json().then((json: any) => { return json; });
    let response = { status: error.status, statusText: error.statusText, data };
    return errorHandler({ response });
  };
};

export const delItemById = async (entity: string, id: string, options: IOptions = {}): Promise<any | null> => {
  try {
    const response = await fetcher(entity + '/delete/' + id, { method: 'DELETE', });
    successHandler(response, { notifyOnSuccess: true, notifyOnFailed: true, });
    return response;
  } catch (error) { return errorHandler(error); }
};

export const editItemById = async (entity: string, id: string, options: IOptions = {}): Promise<any | null> => {
  try {
    // console.log('20JUN2023-08:04:16 PM ', entity, id, JSON.stringify(options));
    const response = await fetcher(entity + '/update/' + id, { method: 'PATCH', body: options, });
    successHandler(response, { notifyOnSuccess: true, notifyOnFailed: true, });
    return response;
  } 
  catch (error: any) {
    const data = await error.json().then((json: any) => { return json; });
    let response = { status: error.status, statusText: error.statusText, data };
    return errorHandler({ response });
  };
};

export const findItemById = async (entity: string, options: IOptions = {}): Promise<any | null> => {
  try {
    let query = '?';
    for (var key in options) { query += key + '=' + options[key] + '&'; }
    query = query.slice(0, -1);
    // consolepe('13JUN 07:56:42=' + entity + '/list' + query);
    const response: any | null = await fetcher(entity + '/read' + query, { method: 'GET', });
    // console.log('20JUN2023-08:04:16 PM ', entity, id, JSON.stringify(options));
    // const response = await fetcher(entity + '/read/' + id, { method: 'GET', body: options, });
    successHandler(response, { notifyOnSuccess: true, notifyOnFailed: true, });
    return response;
  } 
  catch (error: any) {
    const data = await error.json().then((json: any) => { return json; });
    let response = { status: error.status, statusText: error.statusText, data };
    return errorHandler({ response });
  };
};
