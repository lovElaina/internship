import React, { useState,useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import {Form, Modal, Row, Col, Badge, Button} from 'antd';
import {ProTable} from '@ant-design/pro-components'


const PostForm = (props) => {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('tab1');

  // useEffect(() => {
  //   form.resetFields();
  //   form.setFieldsValue({
  //     postId: props.values.postId,
  //     //postCode: props.values.postCode,
  //     postName: props.values.postName,
  //     companyName: props.values.companyName,
  //     depName: props.values.depName,
  //     status: props.values.status,
  //     createBy: props.values.createBy,
  //     createTime: props.values.createTime,
  //     updateBy: props.values.updateBy,
  //     updateTime: props.values.updateTime,
  //     remark: props.values.remark,
  //     salary: props.values.salary,
  //     workTime: props.values.workTime,
  //     requirement:props.values.requirement,
  //     phonenumber:props.values.phonenumber,
  //   });
  // }, [form, props]);


  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };
  const handleFinish = (values) => {
    props.onSubmit(values);
  };




  const valueEnum = {
    0: 'close',
    1: 'running',
    2: 'online',
    3: 'error',
  };

  const tableListDataSource = [];

  //const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
  const times = ['2023-01-09','2023-01-08','2023-01-07','2023-01-06','2023-01-05','2023-01-04','2023-01-03','2023-01-02','2023-01-01','2022-12-31','2022-12-30','2022-12-29','2022-12-28']
  const shangban = ['08:27:43','-','08:35:43','09:31:06','-','08:45:32','09:05:06','08:56:32','08:12:42','-','08:34:51','08:15:54','09:23:15']
  const xiaban = ['21:54:02','-','21:02:39','20:04:12','-','19:43:29','21:08:54','20:37:31','21:01:39','-','20:39:21','21:03:47','22:07:34']
  const status = ['online','running','online','error','close','online','error','online','online','close','online','online','error']
  for (let i = 0; i < 12; i += 1) {
    tableListDataSource.push({
      key: i,
      time: times[i],
      shangban:shangban[i],
      xiaban:xiaban[i],
      //containers: Math.floor(Math.random() * 20),
      status: status[i],
      //createdAt: Date.now() - Math.floor(Math.random() * 2000),

    });
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'time',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '上班时间',
      dataIndex: 'shangban',
      valueType: 'text',
    },
    {
      title: '下班时间',
      dataIndex: 'xiaban',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        close: { text: '缺勤', status: 'Default' },
        running: { text: '请假', status: 'Processing' },
        online: { text: '出勤', status: 'Success' },
        error: { text: '迟到', status: 'Error' },
      },
    },

    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
        <a key="link">删除记录</a>
      ],
    },
  ];

  const renderBadge = (count, active = false) => {
    return (
      <Badge
        count={count}
        style={{
          marginBlockStart: -2,
          marginInlineStart: 4,
          color: active ? '#722ED1' : '#999',
          backgroundColor: active ? '#f0e6ff' : '#eee',
        }}
      />
    );
  };

  /**
   * 定义延时函数
   * delaytime 延时时长，单位毫秒
   */
  let sleep = (delaytime = 200) => {
    return new Promise(function (resolve){
      setTimeout(resolve,delaytime)
    })
  }


  return (
    <Modal
      width="80%"
      title="考勤记录"
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >



      <ProTable
        columns={columns}
        request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);

         return sleep().then(()=>{
             return Promise.resolve({
               data: tableListDataSource,
               success: true,
             });
        }
        )
        // return Promise.resolve({
        //   data: tableListDataSource,
        //   success: true,
        // });
      }}
        toolbar={{
        menu: {
          type: 'tab',
          activeKey: activeKey,
          items: [
            {
              key: 'tab1',
              label: <span>考勤记录{renderBadge(12, activeKey === 'tab1')}</span>,
            },
          ],
          onChange: (key) => {
            setActiveKey(key);
          },
        },
        actions: [
          <Button key="primary" type="primary">
            导出
          </Button>,
        ],
      }}
        rowKey="key"
        pagination={{
        showQuickJumper: true,
      }}
        search={false}
        dateFormatter="string"
        options={{
        setting: {
          draggable: true,
          checkable: true,
          checkedReset: false,
          extra: [<a key="confirm">确认</a>],
        },
      }}
      />







    </Modal>
  );
};

export default PostForm;
