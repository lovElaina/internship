import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';


// 查询报告概略列表
// @ts-ignore
export async function getReportList (params) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/report/list?${queryString}`, {
    //data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 查询个人报告记录列表
// @ts-ignore
export async function getReportLogListByStuId (params,stuId) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/report/${stuId}?${queryString}`, {
    //data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 初始化报告信息
// @ts-ignore
export async function initReport (params) {
  return request('/system/report', {
    method: 'POST',
    data: params
  });
}


// 修改报告评价信息
// @ts-ignore
export async function updateReportMark (params) {
  return request('/system/report', {
    method: 'PUT',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}




// 查询岗位信息详细
// @ts-ignore
export function getPost (postId) {
  return request(`/system/post/${postId}`, {
    method: 'GET'
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
