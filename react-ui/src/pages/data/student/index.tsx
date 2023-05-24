import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal, Row, Col } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import WrapContent from '@/components/WrapContent';
import Card from 'antd/es/card';
import type { UserType, UserListParams } from './data';
import {
  removeUser,
  addUser,
  updateUser,
  exportUser,
  updateUserPwd,
  getDeptTree,
  getTutorList,
  getStudentListByDeptId,
  getStudentByStuId,
} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../../system/dict/service';
import ResetPwd from './components/ResetPwd';
import DeptTree from './components/DeptTree';
import type { DataNode } from 'antd/lib/tree';
import { getPostList } from '../post/service';
import {useRequest} from "@@/plugin-request/request";
import {queryCurrentUserInfo} from "@/pages/dashboard/index/service";


/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: UserType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addUser({ ...fields });
    hide();
    if (resp.code === 200) {
      message.success('添加成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: UserType) => {
  const hide = message.loading('正在更新');
  try {
    const resp = await updateUser(fields);
    hide();
    if (resp.code === 200) {
      message.success('更新成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserType[]) => {
  message.error("为保证操作安全，请勿批量删除！")
  // const hide = message.loading('正在删除');
  // if (!selectedRows) return true;
  // try {
  //   const resp = await removeUser(selectedRows.map((row) => row.userId).join(','));
  //   hide();
  //   if (resp.code === 200) {
  //     message.success('删除成功，即将刷新');
  //   } else {
  //     message.error(resp.msg);
  //   }
  //   return true;
  // } catch (error) {
  //   hide();
  //   message.error('删除失败，请重试');
  //   return false;
  // }
};

const handleRemoveOne = async (selectedRow: UserType) => {
  message.error('删除失败，该学生状态为"实习中"');
  // const hide = message.loading('正在删除');
  // if (!selectedRow) return true;
  // try {
  //   //const params = [selectedRow.userId];
  //   const params = selectedRow.stuId;
  //   const resp = await removeUser(params);
  //   hide();
  //   if (resp.code === 200) {
  //     message.success('删除成功，即将刷新');
  //   } else {
  //     message.error(resp.msg);
  //   }
  //   return true;
  // } catch (error) {
  //   hide();
  //   message.error('删除失败，请重试');
  //   return false;
  // }
};

/**
 * 导出数据
 *
 * @param id
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportUser();
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};



const UserTableList: React.FC = () => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resetPwdModalVisible, setResetPwdModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<UserType>();
  const [selectedRowsState, setSelectedRows] = useState<UserType[]>([]);

  const [selectDept, setSelectDept] = useState<any>({ id: 0 });

  //字典配置
  const [sexOptions, setSexOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);
  const [internshipStatusOptions, setInternshipStatusOptions] = useState<any>([]);
  const [tutorOptions, setTutorOptions] = useState<any>([]);

  //const [postIds, setPostIds] = useState<string[]>();


  const [postList, setPostList] = useState<string[]>();
  const [deptTree, setDeptTree] = useState<DataNode[]>();
  const [isQueryMode, setIsQueryMode] = useState<boolean>(false);

  const access = useAccess();

  const { data: userInfo, loading } = useRequest(() => {
    return queryCurrentUserInfo();
  });
  if(loading){
    console.log("currentUser")
  }
  const currentUser = userInfo;
  console.log(currentUser);


  const fetchPostList = async() => {
    const res = await getPostList();

    console.log(res)
    setPostList(
      res.rows.map((item:any)=>{
        return{
          value: item.postId,
          label: item.extra.companyname + " - " + item.extra.departmentname + " - " + item.postName
        }
    }))
  }


  // const fetchStudentInfo = async (stuId: number) => {
  //   const res = await getStudentByStuId(stuId);
  //
  //   // setRoleList(
  //   //   res.roles.map((item: any) => {
  //   //     return {
  //   //       value: item.roleId,
  //   //       label: item.roleName,
  //   //     };
  //   //   }),
  //   // );
  // };



  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getTutorList().then((res) => {
      console.log(res.rows)
      if(res.code === 200){
        const opts = {};
        res.rows.forEach((item:any) => {
          opts[item.tutorId] = item.tutorName;
        })
        console.log(opts);
        setTutorOptions(opts);
      }
    })


    getDict('sys_user_sex').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        console.log(opts);
        setSexOptions(opts);
      }
    });

    getDict('sys_normal_disable').then((res) => {
      if (res.code === 200) {
        console.log(res)
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setStatusOptions(opts);
      }
    });

    getDict('sys_user_internship').then((res) => {
      if (res.code === 200) {
        console.log(res)
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setInternshipStatusOptions(opts);
      }
    });
  }, []);

  const columns: ProColumns<UserType>[] = [
    {
      title: '学号',
      dataIndex: 'stuNumber',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '班级',
      dataIndex: ['extra','dept','deptName'],
      valueType: 'text',
    },
    {
      title: '姓名',
      dataIndex: 'stuName',
      valueType: 'text',
      width: '120px',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'stuGender',
      valueType: 'select',
      valueEnum: sexOptions,
    },
    {
      title: "导师",
      dataIndex: 'tutorId',
      valueType: 'select',
      valueEnum: tutorOptions,
      width: '120px',
    },
    // {
    //   title: "账号",
    //   dataIndex: 'userName',
    //   valueType: 'text',
    //   width: '120px',
    // },
    // {
    //   title: "邮箱",
    //   dataIndex: 'email',
    //   valueType: 'text',
    // },
    // {
    //   title: <FormattedMessage id="system.User.phonenumber" defaultMessage="手机号码" />,
    //   dataIndex: 'phonenumber',
    //   valueType: 'text',
    // },
    {
      title: "开始时间",
      hideInSearch: true,
      dataIndex: 'startTime',
      render:(_)=>{
        let d = new Date(_-0);
        if(_==="-")return "-"
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    {
      title: "结束时间",
      hideInSearch: true,
      dataIndex: 'endTime',
      render:(_)=>{
        let d = new Date(_-0);
        if(_==="-")return "-"
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    {
      title: "实习情况",
      dataIndex: 'internshipStatus',
      valueType: 'select',
      valueEnum: internshipStatusOptions,
    },
    // {
    //   title: <FormattedMessage id="system.User.status" defaultMessage="账号状态" />,
    //   dataIndex: 'status',
    //   valueType: 'select',
    //   valueEnum: statusOptions,
    // },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [

        <Button
          type="link"
          size="small"
          key="detail"
          hidden={!access.hasPerms('system:user:query')}
          onClick={() => {


            setIsQueryMode(true);
            fetchPostList();
            //fetchStudentInfo(record.stuId);


            console.log(record);
            getDeptTree({}).then((treeData) => {
              setDeptTree(treeData);
              setModalVisible(true);
            });

            setCurrentRow(record);
          }}
        >
          查看详情
        </Button>,

        <Button
          type="link"
          size="small"
          key="edit"
          hidden={!access.hasPerms('system:user:edit')}
          onClick={() => {

            fetchPostList();


            console.log(postList);
            getDeptTree({}).then((treeData) => {
              setDeptTree(treeData);
              setModalVisible(true);
            });

            setCurrentRow(record);
          }}
        >
          编辑
        </Button>,


        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('system:user:remove')}
          onClick={async () => {
            Modal.confirm({
              title: '删除',
              content: '确定删除该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleRemoveOne(record);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          删除
        </Button>,
        // <Button
        //   type="link"
        //   size="small"
        //   key="resetpwd"
        //   hidden={!access.hasPerms('system:user:edit')}
        //   onClick={() => {
        //     setResetPwdModalVisible(true);
        //     setCurrentRow(record);
        //   }}
        // >
        //   <FormattedMessage id="system.User.reset.password" defaultMessage="密码重置" />
        // </Button>,
      ],
    },
  ];

  return (
    <WrapContent>
      <Row gutter={[16, 24]}>
        {currentUser?.user?.roleId == 5 ?
          <div/>:(<Col lg={6} md={24}>
            <Card>
              <DeptTree
                onSelect={async (value: any) => {
                  setSelectDept(value);
                  if (actionRef.current) {
                    formTableRef?.current?.submit();
                  }
                }}
              />
            </Card>
          </Col>)}

        <Col lg={currentUser?.user?.roleId == 5 ? 24 : 18} md={24}>
          {currentUser?
            <ProTable<UserType>
              headerTitle="学生列表"
              actionRef={actionRef}
              formRef={formTableRef}
              rowKey="userId"
              key="userList"
              search={{
                labelWidth: 120,
              }}
              toolBarRender={() => [
                <Button
                  type="primary"
                  key="add"
                  hidden={!access.hasPerms('system:user:add')}
                  onClick={async () => {

                    fetchPostList();

                    if (selectDept.id === '' || selectDept.id == null) {
                      message.warning('请选择左侧父级节点');
                    } else {
                      getDeptTree({}).then((treeData) => {
                        setDeptTree(treeData);
                        setCurrentRow(undefined);
                        setModalVisible(true);
                      });
                    }
                  }}
                >
                  <PlusOutlined />{' '}
                  <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
                </Button>,

                <Button
                  type="primary"
                  key="remove"
                  hidden={selectedRowsState?.length === 0 || !access.hasPerms('system:user:remove')}
                  onClick={async () => {
                    const success = await handleRemove(selectedRowsState);
                    if (success) {
                      setSelectedRows([]);
                      actionRef.current?.reloadAndRest?.();
                    }
                  }}
                >
                  <DeleteOutlined />
                  <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
                </Button>,


                // <Button
                //   type="primary"
                //   key="export"
                //   hidden={!access.hasPerms('system:user:export')}
                //   onClick={async () => {
                //     handleExport();
                //   }}
                // >
                //   <PlusOutlined />
                //   <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
                // </Button>,
              ]}
              request={(params) =>
                getStudentListByDeptId({ ...params, deptId: selectDept.id } as UserListParams).then((res) => {
                  console.log(res)
                  console.log(currentUser)
                  let tmp = res.rows;
                  if(currentUser.stuList!==undefined){
                    let arr = currentUser.stuList.map((e: { stuId: any; })=>{
                      return e.stuId;
                    })
                    //包含符合要求（该企业负责）的所有学生id
                    tmp = tmp.filter(e=>{
                      console.log(e)
                      return arr.includes(e.stuId)
                    })
                    console.log(tmp)
                  }
                  return {
                    data: tmp,
                    total: tmp.length,
                    success: true,
                  };
                })
              }
              columns={columns}
              rowSelection={{
                onChange: (_, selectedRows) => {
                  setSelectedRows(selectedRows);
                },
              }}
            />:<div/>}

        </Col>
      </Row>


      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            key="remove"
            hidden={!access.hasPerms('system:user:remove')}
            onClick={async () => {
              Modal.confirm({
                title: '删除',
                content: '确定删除该项吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  const success = await handleRemove(selectedRowsState);
                  if (success) {
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }
                },
              });
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
        </FooterToolbar>
      )}




      <UpdateForm
        onSubmit={async (values) => {
          let success = false;

          values.stuId = currentRow?.stuId;
          values.startTime = Date.parse(values.dateRange[0]);
          //values.startTime = values.dateRange[0]
          values.endTime = Date.parse(values.dateRange[1]);
          //values.endTime = values.dateRange[1]
          values.extra = {}
          values.extra.deptid = values.deptid;
          values.extra.phone = values.phone;
          values.extra.email = values.email;
          values.extra.username = values.userName;
          values.extra.password = values.password;
          values.userId = currentRow?.userId;
          console.log(values)

          if(isQueryMode){
            success = true;
            console.log("hello nice day haha")
          }else{
            if (values.stuId) {
              //console.log({...values},"update")
              success = await handleUpdate({ ...values } as UserType);
            } else {
              //console.log({...values},"add")
              success = await handleAdd({ ...values } as UserType);
            }
          }



          if (success) {
            setModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}


        onCancel={() => {
          setIsQueryMode(false);
          setModalVisible(false);
          setCurrentRow(undefined);
        }}


        visible={modalVisible}
        values={currentRow || {}}
        sexOptions={sexOptions}
        statusOptions={statusOptions}
        posts={postList || []}
        //postIds={postIds || []}
        //roles={roleList || []}
        //roleIds={roleIds || []}
        depts={deptTree || []}
        internshipStatusOptions={internshipStatusOptions}
        tutorOptions={tutorOptions}
        isQueryMode={isQueryMode}
      />





      <ResetPwd
        onSubmit={async (value: any) => {
          const success = await updateUserPwd(value.oldPassword, value.newPassword);
          if (success) {
            setResetPwdModalVisible(false);
            setSelectedRows([]);
            setCurrentRow(undefined);
            message.success('密码重置成功。');
          }
        }}
        onCancel={() => {
          setResetPwdModalVisible(false);
          setSelectedRows([]);
          setCurrentRow(undefined);
        }}
        resetPwdModalVisible={resetPwdModalVisible}
        values={currentRow || {}}
      />
    </WrapContent>
  );
};

export default UserTableList;
