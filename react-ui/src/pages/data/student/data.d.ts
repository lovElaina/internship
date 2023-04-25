export type UserType = {
  stuId: number;
  userId: number;
  postId:number;
  deptId: number;
  stuNumber:number;
  stuName:string;
  stuGender:string;
  // deptName: string;
  // dept: any;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  password: string;
  status: string;
  internshipStatus: string;
  delFlag: string;
  loginIp: string;
  loginDate: Date;
  createBy: string;
  createTime: Date;
  updateBy: string;
  updateTime: Date;
  remark: string;
  admin: boolean;
  params: any;
  postIds: any;
  roleId: number
  roleIds: [];
  roles: [];
  searchValue: string;
  tutorId:string;
  startTime:number;
  endTime:number;

  extra:any;
};

// export type extra = {
//   userid : number;
//   roleid: number;
//   deptid: number;
//   username: string;
//   password: string;
//   email: string;
//   phone: string;
// }

export type UserListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type UserListData = {
  list: UserType[];
  pagination: Partial<UserListPagination>;
};

export type UserListParams = {
  userId?: string;
  deptId?: string;
  userName?: string;
  nickName?: string;
  userType?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  avatar?: string;
  password?: string;
  status?: string;
  delFlag?: string;
  loginIp?: string;
  loginDate?: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
  pageSize?: string;
  currentPage?: string;
  filter?: string;
  sorter?: string;
};
