export type CompanyType = {
  userId: number;
  companyId: number;
  companyName: string;
  departmentName: string;
  extra :any;
  userName: string;
  password: string;

  params: any;
  searchValue: string;
};


export type CompanyListParams = {
  userId?: string;
  deptId?: string;
  userName?: string;


  email?: string;
  phonenumber?: string;
  avatar?: string;
  password?: string;
  status?: string;
  delFlag?: string;
  loginIp?: string;
  loginDate?: string;

  pageSize?: string;
  currentPage?: string;
  filter?: string;
  sorter?: string;
};
