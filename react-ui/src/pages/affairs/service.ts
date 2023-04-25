import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';


// 查询申请信息列表
// @ts-ignore
export async function getApplyList (params) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/internship/apply/list?${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 修改申请信息
// @ts-ignore
export async function updatePost (params) {
  return request('/internship/apply', {
    method: 'PUT',
    data: params
  });
}

// 删除删除信息
// @ts-ignore
export async function removePost (ids) {
  return request(`/internship/apply/${ids}`, {
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
