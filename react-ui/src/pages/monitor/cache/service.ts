import request from '@/utils/request';


// 获取服务器信息
export async function getCacheInfo() {
  return request('/monitor/cache', {
    method: 'GET',
  });
}
