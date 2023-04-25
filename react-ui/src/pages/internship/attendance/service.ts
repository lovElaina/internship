import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';


// 初始化报告信息
// @ts-ignore
export async function initAttend (params) {
  return request('/system/attend', {
    method: 'POST',
    data: params
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



// 查询出勤信息列表
// @ts-ignore
export async function getAttendList (params) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/attend/list?${queryString}`, {
    //data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}



// 新增出勤信息
// @ts-ignore
export async function addPost (params) {
  return request('/system/attend', {
    method: 'POST',
    data: params
  });
}

// 修改出勤信息
// @ts-ignore
export async function updateAttendLog (params) {
  return request('/system/attend/update', {
    method: 'PUT',
    data: params
  });
}



// 导出出勤信息
// @ts-ignore
export function exportPost (params) {
  return downLoadXlsx(`/system/attend/export`, { params }, `post_${new Date().getTime()}.xlsx`);
}
