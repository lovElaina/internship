import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
//import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import WrapContent from '@/components/WrapContent';
//import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
//import type { PostType, PostListParams } from './data.d';
import {getPostList, addPost, updatePost, exportPost, getAttendList, initAttend} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../../system/dict/service'
import {ModalForm, ProFormText} from "@ant-design/pro-components";
import moment from "moment";





/**
 * 初始化
 *
 * @param record
 */
const handleInit = async (record) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await initAttend(record);
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
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows) => {
  message.error("删除失败，无权限")
  // const hide = message.loading('正在删除');
  // if (!selectedRows) return true;
  // try {
  //   const resp = await removePost(selectedRows.map((row) => row.postId).join(','));
  //   hide();
  //   if(resp.code === 200) {
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

const handleRemoveOne = async (selectedRow) => {
  message.error("删除失败，无权限")
  // const hide = message.loading('正在删除');
  // if (!selectedRow) return true;
  // try {
  //   const params = [selectedRow.postId];
  //   const resp = await removePost(params.join(','));
  //   hide();
  //   if(resp.code === 200) {
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
  message.success('导出成功');
  // const hide = message.loading('正在导出');
  // try {
  //   await exportPost();
  //   hide();
  //   message.success('导出成功');
  //   return true;
  // } catch (error) {
  //   hide();
  //   message.error('导出失败，请重试');
  //   return false;
  // }
};

const PostTableList = () => {
  const formTableRef = useRef();

  const [modalVisible, setModalVisible] = useState(false);

  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  //const [statusOptions, setStatusOptions] = useState([]);

  //const [internshipStatusOptions, setInternshipStatusOptions] = useState([]);

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {



  }, []);



  const columns = [
    {
      title: "学号",
      dataIndex: 'stuNumber',
      valueType: 'text',
    },

    {
      title: "学生姓名",
      dataIndex: 'stuName',
      valueType: 'text',
    },

    {
      title: "开始时间",
      hideInSearch: true,
      dataIndex: 'startTime',
      render:(_)=>{
        let d = new Date(_-0);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    {
      title: "结束时间",
      hideInSearch: true,
      dataIndex: 'endTime',
      render:(_)=>{
        let d = new Date(_-0);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    // {
    //   title: "总天数",
    //   hideInSearch: true,
    //   dataIndex: 'totalDay',
    //   //valueType: 'text',
    //   render:(_,record)=>{
    //     const aaa = moment(record.user.endTime-0).format("YYYY-MM-DD");
    //     const bbb = moment(record.user.startTime-0).format("YYYY-MM-DD");
    //     return moment(aaa).diff(moment(bbb),'days')
    //   }
    // },
    {
      title: "已过天数(工作日)",
      hideInSearch: true,
      //dataIndex: 'actualDay',
      valueType: 'text',
      render:(_,record)=>{
        return record.absentDay + record.attendDay + record.lateDay + record.leaveDay
        }
    },
    {
      title: "出勤天数",
      hideInSearch: true,
      dataIndex: 'attendDay',
      valueType: 'text',
    },
    {
      title: "迟到天数",
      hideInSearch: true,
      dataIndex: 'lateDay',
      valueType: 'text',
    },
    {
      title: "请假天数",
      hideInSearch: true,
      dataIndex: 'leaveDay',
      valueType: 'text',
    },
    {
      title: "缺勤天数",
      hideInSearch: true,
      dataIndex: 'absentDay',
      valueType: 'text',
    },
    {
      title: "出勤率",
      hideInSearch: true,
      //dataIndex: 'absentDay',

      render:(_,record)=>{

        const total = record.attendDay + record.lateDay + record.leaveDay + record.absentDay;
        const part = record.attendDay + record.lateDay;
        const percent = Math.round(part/total * 100)  + "%";
        // const aaa = moment(record.user.endTime-0).format("YYYY-MM-DD");
        // const bbb = moment(record.user.startTime-0).format("YYYY-MM-DD");
        return percent === "NaN%" ? "暂无" : percent;
      }
    },

    // {
    //   title: "实习情况",
    //   hideInSearch: true,
    //   dataIndex: 'internshipStatus',
    //   valueType: 'select',
    //   valueEnum: internshipStatusOptions,
    // },



    // {
    //   title: "岗位要求",
    //   dataIndex: 'requirement',
    //   valueType: 'text',
    //   width: '300px',
    // },
    // {
    //   title: <FormattedMessage id="system.Post.remark" defaultMessage="备注" />,
    //   dataIndex: 'remark',
    //   valueType: 'textarea',
    //   hideInSearch: true,
    // },
    {
      title: "操作",
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          //hidden={!access.hasPerms('system:post:edit')}
          onClick={() => {
            console.log(record)
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          查看详情
        </Button>,

        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          onClick={async () => {
            Modal.confirm({
              title: '初始化',
              content: '确定初始化该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                console.log(record)
                const success = await handleInit(record);
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
        //   danger
        //   key="batchRemove"
        //   hidden={!access.hasPerms('system:post:remove')}
        //   onClick={async () => {
        //     Modal.confirm({
        //       title: '删除',
        //       content: '确定删除该项吗？',
        //       okText: '确认',
        //       cancelText: '取消',
        //       onOk: async () => {
        //         const success = await handleRemoveOne(record);
        //         if (success) {
        //           if (actionRef.current) {
        //             actionRef.current.reload();
        //           }
        //         }
        //       },
        //     });
        //   }}
        // >
        //   <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
        // </Button>,
      ],
    },
  ];

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable
          headerTitle="考勤管理"
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
              key="add"
              hidden={!access.hasPerms('system:post:add')}
              onClick={async () => {
                setCurrentRow(undefined);
                setModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>,
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
          request={(params) =>
            getAttendList(params).then((res) => {
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
            批量删除
          </Button>
        </FooterToolbar>
      )}


      <UpdateForm
        onSubmit={async (values) => {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
        }
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        visible={modalVisible}
        //////////////////注意这一行////////////////////////////////////////////////
        values={currentRow || {}}
        //statusOptions={statusOptions}


      />



    </WrapContent>
  );
};

export default PostTableList;
