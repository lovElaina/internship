import React, {useState, useEffect, useRef} from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import {Form, Modal, Row, Col, Badge, Button} from 'antd';
import {ProTable} from '@ant-design/pro-components'
import { getAttendLogListByStuId, updateAttendLog} from "@/pages/internship/attendance/service";


const PostForm = (props) => {
  const actionRef = useRef();
  const [stuId, setStuId] = useState('');
  const [count, setCount] = useState(0)
  const [activeKey, setActiveKey] = useState('tab1');

  useEffect(()=>{
    console.log(props)
    setStuId(props.values.stuId);
  },[props])



  const handleOk = () => {
    props.onCancel();
  };
  const handleCancel = () => {
    props.onCancel();
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



  const columns = [
    {
      title: '日期',
      dataIndex: 'attendDate',
      //render: (_) => <a>{_}</a>,
      render:(_)=>{
        let d = new Date(_-0);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    {
      title: '上班时间',
      dataIndex: 'workTime',
      render:(_)=>{
        if (_ === "-") return "-- : -- : --"
        let d = new Date(_-0);
        return (d.getHours()<10? "0" + d.getHours() : d.getHours()) + " : " + (d.getMinutes()<10? "0" + d.getMinutes() : d.getMinutes()) + " : " + (d.getSeconds()<10? "0" + d.getSeconds():d.getSeconds())
      }
    },
    {
      title: '下班时间',
      dataIndex: 'restTime',
      render:(_)=>{
        if (_ === "-") return "-- : -- : --"
        let d = new Date(_-0);
        return (d.getHours()<10? "0" + d.getHours() : d.getHours()) + " : " + (d.getMinutes()<10? "0" + d.getMinutes() : d.getMinutes()) + " : " + (d.getSeconds()<10? "0" + d.getSeconds():d.getSeconds())
      }
    },
    {
      title: '状态',
      dataIndex: 'result',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        "0": { text: '出勤', status: 'Success' },
        "1": { text: '请假', status: 'Processing' },
        "2": { text: '迟到', status: 'Error' },
        "3": { text: '缺勤', status: 'Default' },
        "5": {text: '待签到', status: 'Default'}
      },
    },

    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
        //<a key="link">更改状态</a>

        <Button
          type="link"
          size="small"
          key="update0"
          onClick={async () => {
            Modal.confirm({
              title: '更改状态确认',
              content: '确定更改状态为”出勤”吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await updateAttendLog({...record,result:"0"});
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
          hidden={record.result === "0"}
        >
          设为出勤
        </Button>,

        <Button
          type="link"
          size="small"
          key="update2"
          onClick={async () => {
            Modal.confirm({
              title: '更改状态确认',
              content: '确定更改状态为”缺勤”吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await updateAttendLog({...record,result:"2"});
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
          hidden={record.result === "3"}
        >
          设为缺勤
        </Button>,

        <Button
          type="link"
          size="small"
          key="update1"
          onClick={async () => {
            Modal.confirm({
              title: '更改状态确认',
              content: '确定更改状态为”请假”吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await updateAttendLog({...record,result:"1"});
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
          hidden={record.result === "1"}
        >
          设为请假
        </Button>,

        <Button
          type="link"
          size="small"
          key="update3"
          onClick={async () => {
            Modal.confirm({
              title: '更改状态确认',
              content: '确定更改状态为”迟到”吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await updateAttendLog({...record,result:"3"});
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
          hidden={record.result === "2"}
        >
          设为迟到
        </Button>,
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

  // /**
  //  * 定义延时函数
  //  * delaytime 延时时长，单位毫秒
  //  */
  // let sleep = (delaytime = 200) => {
  //   return new Promise(function (resolve){
  //     setTimeout(resolve,delaytime)
  //   })
  // }


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
        actionRef={actionRef}
        //   request={(params, sorter, filter) => {
        //   // 表单搜索项会从 params 传入，传递给后端接口。
        //   console.log(params, sorter, filter);
        //
        //    return sleep().then(()=>{
        //        return Promise.resolve({
        //          data: tableListDataSource,
        //          success: true,
        //        });
        //   }
        //   )
        //
        // }}

        request={(params) =>
          getAttendLogListByStuId(params,stuId).then((res) => {
            setCount(res.total)
            return {
              data: res.rows,
              total: res.total,
              success: true,
            };
          })
        }
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: 'tab1',
                label: <span>考勤记录{renderBadge(count, activeKey === 'tab1')}</span>,
              },
            ],
            onChange: (key) => {
              setActiveKey(key);
            },
          },



          actions: [
            // <Button key="primary" type="primary">
            //   导出
            // </Button>,
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
