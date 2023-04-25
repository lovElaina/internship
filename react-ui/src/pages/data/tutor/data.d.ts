export type TutorType = {
  userName: string;
  userId: number;
  tutorNumber: string;
  tutorGender: string;
  tutorName: string;
  tutorType: string;
  tutorMajor: string;
  extra :any;
  password: string;



  params: any;
  searchValue: string;

};


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
