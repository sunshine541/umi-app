/*
 * @Author: Fus
 * @Date:   2019-06-12 09:53:28
 * @Last Modified by: Fus
 * @Last Modified time: 2019-06-12 09:53:28
 * @Desc: 用户信息接口
 */
import fetch from '../utils/fetch';
import query from '../constants/query';

// 获取用户列表
export function getUserPage(params) {
  return fetch(query.GET_USER_PAGE, {
    method: 'get',
    params,
  });
}