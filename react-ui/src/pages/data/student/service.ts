import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
import { formatTreeSelectData } from '@/utils/utils';
import type { DataNode } from 'antd/lib/tree';
import type { UserType, UserListParams } from './data';


// 查询学生信息列表
export async function getStudentListByDeptId(params?: UserListParams) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/student/list?${queryString}`, {
    data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 查询导师信息列表
export async function getTutorList() {
  const queryString = 'current=1&pageSize=100'
  return request(`/system/tutor/list?${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}



// 查询用户信息详细
export function getStudentByStuId(stuId: number) {
  return request(`/system/student/${stuId}`, {
    method: 'GET',
  });
}

// 查询用户列表中所选的所有岗位信息
export function getPostList(){
  return request('/system/post/list',{
    method: 'GET'
  })
}



// 新增学生信息
export async function addUser(params: UserType) {
  return request('/system/student', {
    method: 'POST',
    data: params,
  });
}

// 修改学生信息
export async function updateUser(params: UserType) {
  return request('/system/student', {
    method: 'PUT',
    data: params,
  });
}

// 删除学生信息
export async function removeUser(ids: number) {
  return request(`/system/student/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 导出用户信息
export function exportUser(params?: UserListParams) {
  return downLoadXlsx(`/system/user/export`, { params }, `user_${new Date().getTime()}.xlsx`);
}

export function updateUserProfile(data: API.CurrentUser) {
  return request('/system/user/profile', {
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword: string, newPassword: string) {
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
export function uploadAvatar(data: any) {
  return request('/system/user/profile/avatar', {
    method: 'post',
    data: data
  })
}

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
