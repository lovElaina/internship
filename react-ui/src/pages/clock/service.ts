import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';

export async function queryCurrentUserInfo(): Promise<{ data: API.GetUserInfoResult }> {
  return { data: await request('/getInfo') }
}


// 查询出勤总表
// @ts-ignore
export async function getAttendList () {
  //const queryString = new URLSearchParams(params).toString();
  return request(`/system/attend/list`, {
    //data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 查询个人出勤记录列表
// @ts-ignore
export async function getAttendLogListByStuId (params,stuId) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/attend/${stuId}?${queryString}`, {
    //data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 新增打卡记录
// @ts-ignore
export async function updateAttend (params) {
  return request(`/system/attend`, {
    method: 'PUT',
    data: params
  });
}

// 下班打卡记录
// @ts-ignore
export async function updateLog (params) {
  return request(`/system/attend/update`, {
    method: 'PUT',
    data: params
  });
}












// 修改岗位信息
// @ts-ignore
export async function updatePost (params) {
  return request('/system/post', {
    method: 'PUT',
    data: params
  });
}

// 删除岗位信息
// @ts-ignore
export async function removePost (ids) {
  return request(`/system/post/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 导出岗位信息
// @ts-ignore
export function exportPost (params) {
  return downLoadXlsx(`/system/post/export`, { params }, `post_${new Date().getTime()}.xlsx`);
}
