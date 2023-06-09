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
import {
  getPostList,
  removePost,
  addPost,
  updatePost,
  queryCurrentUserInfo,
  getCompanyByUserId,
  getScoreList, updateScore
} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../../system/dict/service'
import {getUserInfo} from "@/services/session";
import {useRequest} from "@@/plugin-request/request";


/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addPost({ ...fields });
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
const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');
  try {
    const resp = await updateScore(fields);
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
const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removePost(selectedRows.map((row) => row.postId).join(','));
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

const handleRemoveOne = async (selectedRow) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.postId];
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
const handleExport = async () => {
  message.success('正在开发中');
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

  const [isQueryMode, setIsQueryMode] = useState(false);

  //得到当前用户的companyID
  const [currentUserInfo, setCurrentUserInfo] = useState();

  const [allowTutorEdit, setAllowTutorEdit] = useState(false);

  const [allowCompanyEdit, setAllowCompanyEdit] = useState(false);

  const access = useAccess();

  const {data: userInfo,loading} = useRequest(()=>{
    return queryCurrentUserInfo();
  })
  if(loading){
    console.log("loading...")
  }

  const currentUser = userInfo;
  /** 国际化配置 */
  const intl = useIntl();

  useEffect(()=>{
    console.log(currentUser)
    //管理员 & 教务
    if(currentUser?.user.roleId === 1 || currentUser?.user.roleId === 2){
      setAllowCompanyEdit(true);
      setAllowTutorEdit(true);
    }
    //导师
    if(currentUser?.user.roleId === 3){
      setAllowCompanyEdit(false);
      setAllowTutorEdit(true);
    }
    //企业
    if(currentUser?.user.roleId === 5){
      setAllowCompanyEdit(true);
      setAllowTutorEdit(false);
    }
  },[currentUser])

  const columns = [
    {
      title: "学生姓名",
      dataIndex: ['extra','stuname'],
      valueType: 'text',
      width: '150px',
    },
    {
      title: "考勤评分(企业)",
      dataIndex: 'attendScore',
      valueType: 'text',
      width: '160px',
    },
    {
      title: "表现评分(企业)",
      dataIndex: 'actionCompanyScore',
      valueType: 'text',
      width: '150px',
    },
    {
      title: "报告评分(导师)",
      dataIndex: 'reportTutorScore',
      valueType: 'text',
      width: '150px',
    },
    {
      title: "报告评分(企业)",
      dataIndex: 'reportCompanyScore',
      valueType: 'text',
      width: '150px',
    },
    {
      title: "导师状态",
      dataIndex: 'tutorComplete',
      initialValue: 'all',
      filters: true,
      onFilters: true,
      valueEnum: {
        all:{text:'全部',status:'Default'},
        "0":{text: '未完成评分',status: 'Error'},
        "1":{text: '已完成评分',status:'Success'}
      },
      width: '200px',
    },
    {
      title: "企业状态",
      dataIndex: 'companyComplete',
      initialValue: 'all',
      filters: true,
      onFilters: true,
      valueEnum: {
        all:{text:'全部',status:'Default'},
        "0":{text: '未完成评分',status: 'Error'},
        "1":{text: '已完成评分',status:'Success'}
      },
      width: '200px',
    },
    {
      title: "总评分",
      dataIndex: 'totalScore',
      valueType: 'text',
      hideInSearch: true,
    },
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
          hidden={!access.hasPerms('system:post:query')}
          onClick={() => {
            setIsQueryMode(true);
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          成绩管理
        </Button>,


        // <Button
        //   type="link"
        //   size="small"
        //   key="edit"
        //   hidden={!access.hasPerms('system:post:edit')||currentUserInfo?.data === null}
        //   onClick={() => {
        //     setModalVisible(true);
        //     setCurrentRow(record);
        //   }}
        // >
        //   编辑
        // </Button>,
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
        //   删除
        // </Button>,
      ],
    },
  ];

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable
          headerTitle="岗位列表"
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="postId"
          key="postList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            ////////////////////////////////////////////////////////////////////////////////////

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
            </Button>

            ///////////////////////////////////////////////////////////////////////////////////////////
          ]}
          request={(params) =>
            getScoreList(params).then((res) => {
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
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          //表示此用户为导师，且不为教务（及管理员）
          //则无可修改项目，点击确定不更新。
          if(allowTutorEdit && !allowCompanyEdit){
            setModalVisible(false);
            setCurrentRow(undefined);
          }else{
            let reqData = {};
            reqData.actionCompanyScore = values.actionCompanyScore;
            reqData.attendScore = values.attendScore;
            reqData.stuId = currentRow.stuId;
            console.log(reqData)

             success = await handleUpdate(reqData);

              if (success) {
                setModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
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
        isQueryMode={isQueryMode}

        allowTutorEdit = {allowTutorEdit}
        allowCompanyEdit = {allowCompanyEdit}

      />
    </WrapContent>
  );
};

export default PostTableList;
