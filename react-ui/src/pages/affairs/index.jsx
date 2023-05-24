import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
//import type { FormInstance } from 'antd';
import {Button, FormInstance, message, Modal, Tag} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, useAccess } from 'umi';
import WrapContent from '@/components/WrapContent';
//import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { updatePost, getApplyList} from './service';
import UpdateForm from './components/edit';
import { getDict } from '../system/dict/service'
import ApplyForm from "./components/edit";
import Card from "antd/es/card";
import {useRequest} from "@@/plugin-request/request";
import {queryCurrentUserInfo} from "@/pages/clock/service";
import {getPostList} from "@/pages/data/post/service";


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





const PostTableList = () => {


  const actionRef = useRef();

  const formTableRef = useRef();

  const [applyTypeOptions, setApplyTypeOptions] = useState([]);

  const [respTypeOptions, setRespTypeOptions] = useState([]);

  const [postList, setPostList] = useState([]);

  const [stuInfo, setStuInfo] = useState()

  const access = useAccess();

  const fetchPostList = async() => {
    const res = await getPostList();

    console.log(res)
    setPostList(
      res.rows.map((item)=>{
        return{
          value: item.postId,
          label: item.extra.companyname + " - " + item.extra.departmentname + " - " + item.postName
        }
      }))
  }

  /** 国际化配置 */
  const intl = useIntl();

  const {data: userInfo, loading} = useRequest(() => {
    return queryCurrentUserInfo();
  });
  console.log(userInfo);

  useEffect(() => {
    setStuInfo(userInfo)
  }, [userInfo])


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
    fetchPostList();

  }, []);



  const columns = [
    {
      title: "申请人",
      dataIndex: ['extra','stuname'],
      valueType: 'text',
    },
    {
      title: "学号",
      dataIndex: ['extra','stunumber'],
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
      title: "所在岗位",
      dataIndex: ['extra','post'],
      valueType: 'text',
      width: 300
    },
    {
      title: "申请理由",
      dataIndex: 'applyDetail',
      valueType: 'text',
      width: 300
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
      title: "审批者",
      hideInSearch: true,
      dataIndex: 'applyRole',
      render:(_)=>{
        if(_==="0")return "企业"
        if(_==="1")return "导师"
        if(_==="2")return "教务"
      }
    },
    {
      title: "拒绝原因",
      hideInSearch: true,
      dataIndex: 'refuseDetail',
    },

    {
      title: "状态",
      dataIndex: 'applyStatus',
      valueType: 'select',
      valueEnum: respTypeOptions,
    },

  ];

  return (
    <WrapContent>
      <Card style={{marginBottom:"24px"}}>
        <ApplyForm posts={postList || []} stuInfo={stuInfo || [] } actionRef={actionRef}/>
      </Card>


      <div style={{ width: '100%', float: 'right' }}>

        {stuInfo ?
          <ProTable
            headerTitle="申请列表"
            actionRef={actionRef}
            formRef={formTableRef}
            rowKey="postId"
            key="postList"
            search={false}

            // request={(params) =>
            //   //params.userId = stuInfo.user.userId;
            //   getApplyList({...params,userId:stuInfo.user.userId}).then((res) => {
            //     console.log(res)
            //     return {
            //       data: res.rows,
            //       total: res.total,
            //       success: true,
            //     };
            //   })
            //
            // }

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
          /> : <div/>
        }

      </div>
    </WrapContent>
  );
};

export default PostTableList;
