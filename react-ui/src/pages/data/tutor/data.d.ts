export type TutorType = {
  userId: number;
  studentId: string;
  deptId: number;
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
  // studentId: number;
  // postCode: string;
  // postName: string;
  // postSort: number;
  // status: string;
  // createBy: string;
  // createTime: Date;
  // updateBy: string;
  // updateTime: Date;
  // remark: string;
};

// export type PostListPagination = {
//   total: number;
//   pageSize: number;
//   current: number;
// };
//
// export type PostListData = {
//   list: PostType[];
//   pagination: Partial<PostListPagination>;
// };

export type TutorListParams = {
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

// export type PostListParams = {
//   postId?: string;
//   postCode?: string;
//   postName?: string;
//   postSort?: string;
//   status?: string;
//   createBy?: string;
//   createTime?: string;
//   updateBy?: string;
//   updateTime?: string;
//   remark?: string;
//   pageSize?: string;
//   currentPage?: string;
//   filter?: string;
//   sorter?: string;
// };
