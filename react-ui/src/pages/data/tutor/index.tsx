import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import WrapContent from '@/components/WrapContent';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TutorType, TutorListParams } from './data';
import {getTutorList, getTutor, updateTutorPwd, updateTutor, exportTutor, removeTutor, getDeptTree, addTutor} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../../system/dict/service';
import {DataNode} from "antd/lib/tree";
import {getPostList} from "@/pages/data/post/service";
import {getRoleList} from "@/pages/system/role/service";

import ResetPwd from "@/pages/data/student/components/ResetPwd";

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TutorType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addTutor({ ...fields });
    hide();
    if(resp.code === 200) {
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
const handleUpdate = async (fields: TutorType) => {
  const hide = message.loading('正在配置');
  try {
    const resp = await updateTutor(fields);
    hide();
    if(resp.code === 200) {
      message.success('配置成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TutorType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeTutor(selectedRows.map((row) => row.userId).join(','));
    hide();
    if(resp.code === 200) {
      message.success('删除成功，即将刷新');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: TutorType) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.userId];
    const resp = await removeTutor(params.join(','));
    hide();
    if(resp.code === 200) {
      message.success('删除成功，即将刷新');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 * 导出数据
 *
 * @param id
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportTutor();
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};

const TutorTableList: React.FC = () => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resetPwdModalVisible, setResetPwdModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TutorType>();
  const [selectedRowsState, setSelectedRows] = useState<TutorType[]>([]);

  //const [selectDept, setSelectDept] = useState<any>({ id: 0 });

  //字典配置
  const [sexOptions, setSexOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);
  const [internshipStatusOptions, setInternshipStatusOptions] = useState<any>([]);

  const [postIds, setPostIds] = useState<string[]>();
  const [postList, setPostList] = useState<string[]>();
  const [roleIds, setRoleIds] = useState<string[]>();
  const [roleList, setRoleList] = useState<string[]>();
  const [deptTree, setDeptTree] = useState<DataNode[]>();

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  //设置状态
  useEffect(() => {
    getDict('sys_user_sex').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
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

    getDict('sys_tutor_type').then((res) => {
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

  const columns: ProColumns<TutorType>[] = [
    {
      title: '工号',
      dataIndex: 'studentId',
      valueType: 'text',
      width:'140px'
    },
    {
      title: '院系',
      dataIndex: ['dept','deptName'],
      valueType: 'text',
      width:'140px'
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'select',
      valueEnum: sexOptions,
    },
    {
      title: '类型',
      dataIndex: 'internshipStatus',
      valueType: 'select',
      valueEnum: internshipStatusOptions,
    },
    {
      title: '研究方向',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
      width:'200px'
    },
    {
      title: '账号',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      width: '150px',
    },
    {
      title: '手机号码',
      dataIndex: 'phonenumber',
      valueType: 'text',
      width: '150px',
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          hidden={!access.hasPerms('system:user:edit')}
          onClick={() => {
            const fetchUserInfo = async (userId: number) => {
              const res = await getTutor(userId);
              setPostIds(res.postIds);
              setPostList(
                res.posts.map((item: any) => {
                  return {
                    value: item.postId,
                    label: item.postName,
                  };
                }),
              );
              setRoleIds(res.roleIds);
              setRoleList(
                res.roles.map((item: any) => {
                  return {
                    value: item.roleId,
                    label: item.roleName,
                  };
                }),
              );
            };
            fetchUserInfo(record.userId);
            console.log(postList);
            getDeptTree({}).then((treeData) => {
              setDeptTree(treeData);
            });
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑" />
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
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
        </Button>,

        <Button
          type="link"
          size="small"
          key="resetpwd"
          hidden={!access.hasPerms('system:user:edit')}
          onClick={() => {
            setResetPwdModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="system.User.reset.password" defaultMessage="密码重置" />
        </Button>,
      ],
    },
  ];

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable<TutorType>
          headerTitle="导师列表"
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="userId"
          key="tutorList"
          search={{
            labelWidth: 120,
          }}

          //////////////////////////////////紫色按钮//////////////////////////////////////
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('system:user:add')}
              onClick={async () => {
                getDeptTree({}).then((treeData) => {
                  setDeptTree(treeData);
                  setCurrentRow(undefined);
                  setModalVisible(true);
                });
                getPostList().then((res) => {
                  if (res.code === 200) {
                    setPostList(
                      res.rows.map((item: any) => {
                        return {
                          value: item.postId,
                          label: item.postName,
                        };
                      }),
                    );
                  }
                });
                getRoleList().then((res) => {
                  if (res.code === 200) {
                    setRoleList(
                      res.rows.map((item: any) => {
                        return {
                          value: item.roleId,
                          label: item.roleName,
                        };
                      }),
                    );
                  }
                });
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
            <Button
              type="primary"
              key="export"
              hidden={!access.hasPerms('system:user:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.searchTable.export" defaultMessage="导出" />
            </Button>,
          ]}
          ///////////////////////////////////////////////////////////////////////////////


          request={(params) =>
            getTutorList({ ...params } as TutorListParams).then((res) => {
              return {
                data: res.rows,
                total: res.total,
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
        />
      </div>


      {/*///////////////////////////////////批量删除////////////////////////////////////////*/}
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
      {/*////////////////////////////////////////////////////////////////////////////////////////*/}

      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          values.roleIds = [3];
          values.userId = currentRow?.userId;

          if (values.userId) {
            success = await handleUpdate({ ...values } as TutorType);
          } else {
            success = await handleAdd({ ...values } as TutorType);
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
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        visible={modalVisible}
        values={currentRow || {}}
        sexOptions={sexOptions}
        statusOptions={statusOptions}
        posts={postList || []}
        postIds={postIds || []}
        roles={roleList || []}
        roleIds={roleIds || []}
        depts={deptTree || []}
        internshipStatusOptions={internshipStatusOptions}
      />

      <ResetPwd
        onSubmit={async (value: any) => {
          const success = await updateTutorPwd(value.oldPassword, value.newPassword);
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

export default TutorTableList;
