import request from "@/utils/request";


export async function queryCurrentUserInfo(): Promise<{ data: API.GetUserInfoResult }> {
  return { data: await request('/getInfo') }
}

export async function getNoticeList() {
  return {
    data: await request(`/system/notice/list`)
  }
}
