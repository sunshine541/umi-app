import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';

axios.defaults.withCredentials = true;
const codeMessage = {
  // 200: '服务器成功返回请求的数据。',
  // 201: '新建或修改数据成功。',
  // 202: '一个请求已经进入后台排队（异步任务）。',
  // 204: '删除数据成功。',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  406: '格式出错(406)',
  408: '请求超时(408)',
  410: '资源已被删除(410)',
  422: '验证错误(422)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
};

const defaultHeaders = {
  'content-type': 'application/x-www-form-urlencoded', // 转换为key=value的格式必须增加content-type
  'Access-Control-Allow-Origin': 'http://localhost:8000',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'X-Requested-width, Content-type',
  'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
};
let service = axios.create({
  // baseURL: 'http://rap2api.taobao.org/app/mock/167573',
  baseURL: '/',
  timeout: 12000,
  headers: defaultHeaders,
  // transformRequest: [data => {
  //   return qs.stringify(data);
  // }],
});
let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

// http-请求拦截
service.interceptors.request.use(
  config => {
    if (promiseArr[config.url]) { // 发起请求时，取消掉当前正在进行的相同请求
        promiseArr[config.url]('操作取消');
        promiseArr[config.url] = cancel;
    } else {
        promiseArr[config.url] = cancel;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http-响应拦截
service.interceptors.response.use(
  response => {
    // if (response.data.code === 2) { // 返回code码为2的时候,代表登录失效
    //   window.location.href = '/login';
    // }
    return response;
  },
  error => {
    if (JSON.stringify(error).indexOf('timeout') !== -1) {
      message.error('请求超时');
      return;
    }
    message.error('请求错误');
    console.log(error, 'aaa error');
    return Promise.reject(error);
  }
);

// 异常处理

// 返回错误处理
const onError = (res) => {
  const errortext = codeMessage[res.status];
  message.error(res.data.msg || errortext || res.statusText);
};

export default function fetch(url, {
  method,
  params,
  contentType = '',
}) {
  return new Promise((resolve, reject) => {
    const configs = {
      method,
      url,
      // params,
      cancelToken: new CancelToken(c => { cancel = c; }),
    };
    if (method === 'get') {
      configs.params = params;
    } else {
      if (contentType === 'json') {
        configs.headers = {
          ...defaultHeaders,
          'content-type': 'application/json;charset=UTF-8',
        };
        configs.data = params;
      } else {
        configs.data = qs.stringify(params);
      }
    }
    service(configs).then(res => {
      if (res) {
        if (res.data && res.data.success) {
          resolve(res.data.data);
          return;
        }
        onError(res);
      }
      reject(res);
    });
  });
};