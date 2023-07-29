// import type { AnySchema, InferType } from "yup";
// import { toInteger } from "lodash";
import { ResponseError } from "./responseError";
import type { HTTPMethod } from "./types";

type FetcherConfig = {
  readonly method: HTTPMethod;
  readonly body?: object;
  readonly config?: RequestInit;
};

// const baseUrl = 'http://127.0.0.1:5000/api/';
// const baseUrl = `${process.env.API_BASE_URL}`;
// console.log('somakkoraa: ', baseUrl);
// console.log('okalamala',process.env.GREETING);
const varName = 'NEXT_PUBLIC_API_BASE_URL'
// setupAnalyticsService(process.env[varName])
// const baseUrl = `${process.env[varName]}`;
const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;


// export async function fetcher(
//   path: string,
//   { method, body, config }: FetcherConfig
// ): Promise<null>;

// export async function fetcher(
//   path: string,
//   { method, body, config }: FetcherConfig
// ): Promise<JSON>;

// export async function fetcher(
//   path: string,
//   { method, body, config }: FetcherConfig
// ) {
//   try {
//     const response = await fetch(`${baseUrl}${path}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       ...config,      
//       method,
//       ...(body && { body: JSON.stringify(body) }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     }
//     throw new ResponseError(response.statusText, response.status);
//   } catch (err) {
//     if (err instanceof ResponseError) {
//       throw err;
//     }
//     throw new ResponseError("Something went wrong during fetching!", Number(err));
//   }
// }

export async function fetcher(
  path: string,
  { method, body, config }: FetcherConfig,
) {

  const url = `${baseUrl}${path}`;
  // const headers = {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${userInfo?.token}`,
  // };
  // const headers = {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // };
  const result = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  })
    .then((response) => {
      if (response.ok) {
        // console.log('23JUN2023-05:33:16 PM', JSON.stringify(await response));
        return response.json();
      }
      return Promise.reject(response); // 2. reject instead of throw
    })
    .then((json) => {
      // console.log('23JUN2023-05:33:16 PM', JSON.stringify(json));
      return json;
      // console.log('all good, token is ready');
    });
  // .catch((response) => {
  //   console.log(response.status, response.statusText);
  //   // 3. get error messages, if any
  //   response.json().then((json: any) => {
  //     // console.log(json.message);
  //     // console.log(json);
  //     // return Promise.reject(response);
  //     return json.message;
  //   });
  //   // return response;
  // });
  // console.log('23JUN2023-18:27:16 PM', result);
  return result;
  // let result;
  // try {
  //   result = await fetch(`${baseUrl}${path}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     ...config,
  //     method,
  //     ...(body && { body: JSON.stringify(body) }),
  //   });
  // } catch (e) {
  //   console.log('***** Problem with fetch that results in an exception');
  //   console.error(e);
  //   throw new Error('Invalid Response');
  // }
  // if (result.ok) {
  //   try {
  //     return await result.json();
  //   } catch (e) {
  //     console.log('***** Problem with JSON payload', e);
  //     throw 'Result OK but JSON borked';
  //   }
  // } else {
  //   console.log('****** Result ! OK', result.status, result.statusText, result.headers);
  //   throw result.statusText;
  // }
}

// export async function fetcher(
//   path: string,
//   { method, body, config }: FetcherConfig,
// ) {
//   let result;
//   fetch(`${baseUrl}${path}`, {    
//     headers: {
//       "Content-Type": "application/json",
//     },
//     ...config,
//     method,
//     ...(body && { body: JSON.stringify(body) }),
//   })
//     .then(async (response) => {
//       // 1. check response.ok
//       if (response.ok) {
//         console.log('somak bhaiya',await response.json());
//         return response.json();
//       }
//       return Promise.reject(response); // 2. reject instead of throw
//     })
//     .then((json) => {
//       // all good, token is ready
//       // this.store.commit("token", json.access_token);
//       console.log('all good, token is ready');
//     })
//     .catch((response) => {
//       console.log(response.status, response.statusText);
//       // 3. get error messages, if any
//       response.json().then((json: any) => {
//         console.log(json.message);
//         console.log(json);
//         return json.message;
//       })
//     });
// }