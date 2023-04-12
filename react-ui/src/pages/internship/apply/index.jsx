import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
//import type { FormInstance } from 'antd';
import {Button, FormInstance, message, Modal, Tag} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import WrapContent from '@/components/WrapContent';
//import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
//import type { PostType, PostListParams } from './data.d';
import {getPostList, removePost, addPost, updatePost, exportPost, getApplyList} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../../system/dict/service'


/**
 * 添加节点
 *
 * @param fields
 */
// const handleAdd = async (fields) => {
//   const hide = message.loading('正在添加');
//   try {
//     const resp = await addPost({ ...fields });
//     hide();
//     if(resp.code === 200) {
//       message.success('添加成功');
//     } else {
//       message.error(resp.msg);
//     }
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');
  try {
    const resp = await updatePost(fields);
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
// const handleRemove = async (selectedRows) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     const resp = await removePost(selectedRows.map((row) => row.postId).join(','));
//     hide();
//     if(resp.code === 200) {
//       message.success('删除成功，即将刷新');
//     } else {
//       message.error(resp.msg);
//     }
//     return true;
//   } catch (error) {
//     hide();
//     message.error('删除失败，请重试');
//     return false;
//   }
// };

const handleRemoveOne = async (selectedRow) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.applyId];
    const resp = await removePost(params.join(','));
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
// const handleExport = async () => {
//   const hide = message.loading('正在导出');
//   try {
//     await exportPost();
//     hide();
//     message.success('导出成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('导出失败，请重试');
//     return false;
//   }
// };

const PostTableList = () => {
  //const formTableRef = useRef();

  //const [modalVisible, setModalVisible] = useState(false);

  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const formTableRef = useRef();
  //const [statusOptions, setStatusOptions] = useState([]);

  const [applyTypeOptions, setApplyTypeOptions] = useState([]);

  const [respTypeOptions, setRespTypeOptions] = useState([]);

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getDict('sys_apply_type').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setApplyTypeOptions(opts);
      }
    });

    getDict('sys_resp_type').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item) => {
          opts[item.dictValue] = item.dictValue === "0" ? <Tag color="red" style={{fontSize:'14px'}}>{item.dictLabel}</Tag> :<Tag color="green" style={{fontSize:'14px'}}>{item.dictLabel}</Tag>;
        });
        setRespTypeOptions(opts);
      }
    });
  }, []);



  const columns = [
    {
      title: "申请人",
      dataIndex: 'studentName',
      valueType: 'text',
    },
    {
      title: "学号",
      dataIndex: 'studentId',
      valueType: 'text',
    },
    {
      title: "申请日期",
      hideInSearch: true,
      dataIndex: 'applyTime',
      render:(_)=>{
        let d = new Date(_-0);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    {
      title: "申请类型",
      dataIndex: 'applyType',
      valueType: 'select',
      valueEnum: applyTypeOptions,
    },
    {
      title: "详情",
      dataIndex: 'applyDetail',
      valueType: 'text',
    },
    {
      title: "开始日期",
      hideInSearch: true,
      dataIndex: 'startTime',
      render:(_)=>{
        let d = new Date(_-0);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    {
      title: "结束日期",
      hideInSearch: true,
      dataIndex: 'endTime',
      render:(_)=>{
        let d = new Date(_-0);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },

    {
      title: "状态",
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: respTypeOptions,
    },

    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [
        // <Button
        //   type="link"
        //   size="small"
        //   key="edit"
        //   hidden={!access.hasPerms('system:post:edit')}
        //   onClick={() => {
        //     setModalVisible(true);
        //     setCurrentRow(record);
        //   }}
        // >
        //   <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑" />
        // </Button>,

        <Button
          type="link"
          size="small"
          key="batchRemove"
          hidden={record.status!==0}
          onClick={async () => {
            console.log(record)
            Modal.confirm({
              title: '操作确认',
              content: '确定批准该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleUpdate({...record,status:1});
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          批准
        </Button>,


        <Button
          type="link"
          size="small"
          key="batchRemove"
          hidden={record.status!==0}
          onClick={async () => {
            Modal.confirm({
              title: '操作确认',
              content: '确定拒绝该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleUpdate({...record,status:2});
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          拒绝
        </Button>,



        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('system:post:remove')}
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
      ],
    },
  ];

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable
          headerTitle="申请列表"
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="postId"
          key="postList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="remove"
              hidden={selectedRowsState?.length === 0 || !access.hasPerms('system:post:remove')}
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
            <Button
              type="primary"
              key="export"
              hidden={!access.hasPerms('system:post:export')}
              onClick={async () => {
                handleExport();
              }}
            >
              <PlusOutlined />
              导出
            </Button>,
          ]}
          request={() =>
            getApplyList().then((res) => {
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
            hidden={!access.hasPerms('system:post:remove')}
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
      {/*<UpdateForm*/}
      {/*  onSubmit={async (values) => {*/}
      {/*    let success = false;*/}
      {/*    if (values.postId) {*/}
      {/*      success = await handleUpdate(values);*/}
      {/*    } else {*/}
      {/*      success = await handleAdd(values);*/}
      {/*    }*/}
      {/*    if (success) {*/}
      {/*      setModalVisible(false);*/}
      {/*      setCurrentRow(undefined);*/}
      {/*      if (actionRef.current) {*/}
      {/*        actionRef.current.reload();*/}
      {/*      }*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  onCancel={() => {*/}
      {/*    setModalVisible(false);*/}
      {/*    setCurrentRow(undefined);*/}
      {/*  }}*/}
      {/*  visible={modalVisible}*/}
      {/*  //////////////////注意这一行////////////////////////////////////////////////*/}
      {/*  values={currentRow || {}}*/}
      {/*  statusOptions={statusOptions}*/}
      {/*/>*/}
    </WrapContent>
  );
};

export default PostTableList;
