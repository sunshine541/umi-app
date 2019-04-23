import request from '../utils/request';

export async function getList(data) {
  return request('http://rap2api.taobao.org/app/mock/165803/getList.json', {
    method: 'post',
    requestType: 'form',
    data,
  });
}