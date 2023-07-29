import { fetcher } from './fetcher';
import successHandler from '@/utils/hooks/successHandler';
import errorHandler from '@/utils/hooks/errorHandler';
interface IOptions { [key: string]: any; }

export const userLoginPost = async (entity: string, body: any): Promise<any | null> => {
  try {
    const response = await fetcher('login', { method: 'POST', body, });
    successHandler(response, { notifyOnSuccess: true, notifyOnFailed: true, });
    localStorage.setItem('userInfo', await JSON.stringify(response));
    return response;
  }
  catch (error: any) {
    const data = await error.json().then((json: any) => { return json; });
    let response = { status: error.status, statusText: error.statusText, data };
    return errorHandler({ response });
  };
};

export const saveItem = async (entity: string, options: any): Promise<any | null> => {
  try {
    const response = await fetcher(entity + '/create/', { method: 'POST', body: options, });
    successHandler(response, { notifyOnSuccess: true, notifyOnFailed: true, });
    return response;
  }
  catch (error: any) {
    const data = await error.json().then((json: any) => { return json; });
    let response = { status: error.status, statusText: error.statusText, data };
    return errorHandler({ response });
  };
};

export const getList = async (entity: string, options: any): Promise<any | null> => {
  try {
    let query = '?';
    for (var key in options) { query += key + '=' + options[key] + '&'; }
    query = query.slice(0, -1);
    // consolepe('13JUN 07:56:42=' + entity + '/list' + query);
    const response: any | null = await fetcher(entity + '/list' + query, { method: 'GET', });
    // consolepe('13JUN 09:27:33PM = ' + JSON.stringify(response));
    successHandler(response, { notifyOnSuccess: false, notifyOnFailed: false, });
    return response;
  } catch (error) { return errorHandler(error); }
};

export const getSearchedItems = async (entity: string, options: IOptions = {}): Promise<any | null> => {
  try {
    console.log('25JUN2023-7:37> ', JSON.stringify(options));
    let query = '?';
    for (var key in options) { query += key + '=' + options[key] + '&'; }
    query = query.slice(0, -1);
    const response: any | null = await fetcher(entity + '/search' + query, { method: 'GET', });
    successHandler(response, { notifyOnSuccess: false, notifyOnFailed: false, });
    return response;
  } catch (error) { return errorHandler(error); }
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
  } catch (error) { return errorHandler(error); }
};
