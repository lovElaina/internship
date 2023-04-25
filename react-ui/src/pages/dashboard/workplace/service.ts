import { request } from 'umi';
import type { NoticeType, ActivitiesType, AnalysisData } from './data';

export async function queryProjectNotice(): Promise<{ data: NoticeType[] }> {
  return request('/api/project/notice');
}

export async function queryActivities(stuId): Promise<{ data: any }> {
  return {data: await request(`/api/system/student/activities/${stuId}`)}
}
// export async function queryEx(stuId): Promise<{ data: ActivitiesType[] }> {
//   return request(`/api/system/student/activities/${stuId}`);
// }
export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/fake_workplace_chart_data');
}
