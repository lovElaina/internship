import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import type {TutorType, TutorListParams} from './data';
import {DataNode} from "antd/lib/tree";
import {formatTreeSelectData} from "@/utils/utils";




// 查询导师信息列表
export async function getTutorList(params?: TutorListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/tutor/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询导师信息详细
export function getTutor(tutorId: number) {
  return request(`/system/tutor/${tutorId}`, {
    method: 'GET',
  });
}

// 新增导师信息
export async function addTutor(params: TutorType) {
  return request('/system/tutor', {
    method: 'POST',
    data: params,
  });
}

// 修改导师信息
export async function updateTutor(params: TutorType) {
  return request('/system/tutor', {
    method: 'PUT',
    data: params,
  });
}

// 删除导师信息
export async function removeTutor(ids: string) {
  return request(`/system/tutor/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出用户信息
// export function exportTutor(params?: TutorListParams) {
//   return downLoadXlsx(`/system/user/export`, { params }, `user_${new Date().getTime()}.xlsx`);
// }
//
// export function updateUserProfile(data: API.CurrentUser) {
//   return request('/system/user/profile', {
//     method: 'put',
//     data: data
//   })
// }

// 用户密码重置
export function updateTutorPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword
  }
  return request('/system/user/profile/updatePwd', {
    method: 'put',
    params: data
  })
}

// 用户头像上传
// export function uploadAvatar(data: any) {
//   return request('/system/user/profile/avatar', {
//     method: 'post',
//     data: data
//   })
// }

// 获取数据列表
export function getDeptTree(params: any): Promise<DataNode[]> {
  return new Promise((resolve) => {
    const queryString = new URLSearchParams(params).toString();
    request(`/system/user/deptTree?${queryString}`, {
      method: 'get',
    }).then((res) => {
      if(res && res.code === 200) {
        const treeData = formatTreeSelectData(res.data);
        resolve(treeData);
      } else {
        resolve([]);
      }
    });
  });
}




















// 查询岗位信息列表
// export async function getPostList (params?: PostListParams) {
//   const queryString = new URLSearchParams(params).toString();
//   return request(`/system/post/list?${queryString}`, {
//     data: params,
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//     }
//   });
// }

// 查询岗位信息详细
// export function getPost (postId: number) {
//   return request(`/system/post/${postId}`, {
//     method: 'GET'
//   });
// }

// 新增岗位信息
// export async function addPost (params: PostType) {
//   return request('/system/post', {
//     method: 'POST',
//     data: params
//   });
// }

// 修改岗位信息
// export async function updatePost (params: PostType) {
//   return request('/system/post', {
//     method: 'PUT',
//     data: params
//   });
// }

// 删除岗位信息
// export async function removePost (ids: string) {
//   return request(`/system/post/${ids}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//     }
//   });
// }

// 导出岗位信息
// export function exportPost (params?: PostListParams) {
//   return downLoadXlsx(`/system/post/export`, { params }, `post_${new Date().getTime()}.xlsx`);
// }
