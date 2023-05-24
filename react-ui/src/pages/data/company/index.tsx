import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import WrapContent from '@/components/WrapContent';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {TutorType, TutorListParams, CompanyType, CompanyListParams} from './data';
import {getCompanyList, updateTutorPwd, updateCompany, removeCompany, addCompany, updateCompanyPwd} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../../system/dict/service';
import {DataNode} from "antd/lib/tree";


import ResetPwd from "@/pages/data/student/components/ResetPwd";

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: CompanyType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addCompany({ ...fields });
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
const handleUpdate = async (fields: CompanyType) => {
  const hide = message.loading('正在修改');
  try {
    const resp = await updateCompany(fields);
    hide();
    if(resp.code === 200) {
      message.success('修改成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: CompanyType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeCompany(selectedRows.map((row) => row.companyId).join(','));
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

const handleRemoveOne = async (selectedRow: CompanyType) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.companyId];
    const resp = await removeCompany(params.join(','));
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
  message.success('正在开发中');
  // const hide = message.loading('正在导出');
  // try {
  //   await exportTutor();
  //   hide();
  //   message.success('导出成功');
  //   return true;
  // } catch (error) {
  //   hide();
  //   message.error('导出失败，请重试');
  //   return false;
  // }
};

const TutorTableList: React.FC = () => {
  const formTableRef = useRef<FormInstance>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resetPwdModalVisible, setResetPwdModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TutorType>();
  const [selectedRowsState, setSelectedRows] = useState<TutorType[]>([]);


  //字典配置
  //const [sexOptions, setSexOptions] = useState<any>([]);
  //const [tutorTypeOptions, setTutorTypeOptions] = useState<any>([]);
  //const [deptTree, setDeptTree] = useState<DataNode[]>();

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  //设置状态


  const columns: ProColumns<TutorType>[] = [
    {
      title: '企业名称',
      dataIndex: 'companyName',
      valueType: 'text',
      width:'300px'
    },
    {
      title: '部门名称',
      dataIndex: 'departmentName',
      valueType: 'text',
      width:'300px'
    },

    {
      title: '邮箱',
      dataIndex: ['extra','email'],
      valueType: 'text',
      width: '200px',
    },
    {
      title: '手机号码',
      dataIndex: ['extra','phone'],
      valueType: 'text',
      width: '200px',
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
            // getDeptTree({}).then((treeData) => {
            //   console.log(record)
            //   setDeptTree(treeData);
            //   setCurrentRow(record);
            //   setModalVisible(true);
            // });
            setCurrentRow(record);
            setModalVisible(true);
          }}
        >
          编辑
        </Button>,
        //////////////////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////////////////////////////////
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
          headerTitle="企业列表"
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
                // getDeptTree({}).then((treeData) => {
                //   setDeptTree(treeData);
                //   setCurrentRow(undefined);
                //   setModalVisible(true);
                // });
                setCurrentRow(undefined);
                setModalVisible(true);
              }}
            >
              <PlusOutlined />{' '}
              新建
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
              删除
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
            //   导出
            // </Button>,
          ]}
          ///////////////////////////////////////////////////////////////////////////////


          request={(params) =>
            getCompanyList({ ...params } as CompanyListParams).then((res) => {
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
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>
              项
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
            批量删除
          </Button>
        </FooterToolbar>
      )}
      {/*////////////////////////////////////////////////////////////////////////////////////////*/}

      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          values.companyId = currentRow?.companyId;
          values.extra = {}
          values.extra.deptid = 10;
          values.extra.phone = values.phone;
          values.extra.email = values.email;
          values.extra.username = values.userName;
          values.extra.password = values.password;
          values.userId = currentRow?.userId;


          if (values.companyId) {
            //console.log(values)
            success = await handleUpdate({ ...values } as CompanyType);
          } else {
            //console.log(values)
            success = await handleAdd({ ...values } as CompanyType);
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

      />

      <ResetPwd
        onSubmit={async (value: any) => {
          const success = await updateCompanyPwd(value.oldPassword, value.newPassword);
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
