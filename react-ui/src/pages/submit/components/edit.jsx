import React, { useState,useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import {Form, Modal, Row, Col, Badge, Button, Tag} from 'antd';
import {ProTable} from '@ant-design/pro-components'


const PostForm = (props) => {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('tab1');



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
  const times = ['2023-01-09','2023-01-06','2023-01-06','2023-01-05','2023-01-04','2023-01-03','2023-01-02','2023-01-02','2022-12-30']
  const type = ['日报','周报','日报','日报','日报','日报','月报','日报','日报']
  const title = ['1月9号实习总结','第一周实习总结','1月6号实习总结','1月5号实习总结','1月4号实习总结','1月3号实习总结','12月实习总结','1月2号实习总结','12月30号实习总结']
  const status = ['未批阅','未批阅','未批阅','已批阅','已批阅','已批阅','已批阅','已批阅','已批阅']
  const score = ['-','-','-','92','83','95','84','89','91']
  for (let i = 0; i < 9; i += 1) {
    tableListDataSource.push({
      key: i,
      time: times[i],
      type:type[i],
      title:title[i],
      status:status[i],
      score:score[i]
      //containers: Math.floor(Math.random() * 20),
      //status: status[i],
      //createdAt: Date.now() - Math.floor(Math.random() * 2000),

    });
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'time',
      valueType: 'text',
      width: "250px"
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'text',
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render:(_) => _ ==="未批阅" ? <Tag color="red" style={{fontSize:'14px'}}>{_}</Tag> : <Tag color="green" style={{fontSize:'14px'}}>{_}</Tag>
    },
    {
      title: '成绩',
      dataIndex: 'score',
      valueType: 'text',
    },

    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
        record.status==="未批阅"? <a key="link">批阅</a> : <a key="link">重新批阅</a>
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

  let sleep = (delaytime = 300) => {
    return new Promise(function (resolve){
      setTimeout(resolve,delaytime)
    })
  }

  return (




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

  );
};

export default PostForm;
