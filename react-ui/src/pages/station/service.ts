import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';


// 查询岗位信息列表
// @ts-ignore
export async function getPostList (params?) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/post/list?${queryString}`, {
    data: params,
    method: 'GET',
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

// 新增岗位信息
// @ts-ignore
export async function addPost (params) {
  return request('/system/post', {
    method: 'POST',
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

export async function queryCurrentUserInfo(): Promise<{ data: API.GetUserInfoResult }> {
  return { data: await request('/getInfo') }
}

export function getCurrentUserInfo(){
  return request('/getInfo',{
    method: 'GET'
  })
}

// 查询企业信息详细
export function getCompanyByUserId(userId) {
  return request(`/system/company/current/${userId}`, {
    method: 'GET',
  });
}

// // 导出岗位信息
// // @ts-ignore
// export function exportPost (params) {
//   return downLoadXlsx(`/system/post/export`, { params }, `post_${new Date().getTime()}.xlsx`);
// }
