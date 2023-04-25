import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';

export async function queryCurrentUserInfo(): Promise<{ data: API.GetUserInfoResult }> {
  return { data: await request('/getInfo') }
}


// // 查询个人报告记录列表
// // @ts-ignore
// export async function getReportLogListByStuId (params,stuId) {
//   const queryString = new URLSearchParams(params).toString();
//   return request(`/system/report/${stuId}?${queryString}`, {
//     //data: params,
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//     }
//   });
// }
//
//
// // 提交报告
// // @ts-ignore
// export async function updateReportText (params) {
//   return request('/system/report', {
//     method: 'PUT',
//     data: params,
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//     }
//   });
// }
