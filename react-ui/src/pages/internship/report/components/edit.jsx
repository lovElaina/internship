import React, {useState, useEffect, useRef} from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import {Form, Modal, Row, Col, Badge, Button, Tag, message} from 'antd';
import {ProTable} from '@ant-design/pro-components'
import {getReportLogListByStuId, updateReportMark} from "@/pages/internship/report/service";
import {ActionType} from "@ant-design/pro-table";
import WrapContent from "@/components/WrapContent";
import DetailForm from "./detail";



/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('正在评价');
  try {
    const resp = await updateReportMark(fields);
    hide();
    if(resp.code === 200) {
      message.success('评价成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('评价失败请重试！');
    return false;
  }
};

const PostForm = (props) => {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('tab1');
  const [stuId, setStuId] = useState('');
  const [count, setCount] = useState(0);
  const formTableRef = useRef();
  const actionRef = useRef();

  const [currentRow, setCurrentRow] = useState();
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(()=>{
    console.log(props)
    setStuId(props.values.stuId);
  },[props])

  const handleOk = () => {
    props.onCancel();
    form.resetFields();
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


  const columns = [
    {
      title: '日期',
      dataIndex: 'planDate',
      width: "120px",
      render:(_)=>{
        let d = new Date(_-0);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
      }
    },
    {
      title: '类型',
      dataIndex: 'reportType',
      width: "80px",
      render:(_)=>{
        let res;
        switch (_) {
          case "0":res = <Tag color="#a5d1e1">日报</Tag>;break;
          case "1":res = <Tag color="#199fb1">周报</Tag>;break;
          case "2":res = <Tag color="#0d5c75">月报</Tag>;break;
        }
        return res;
      }
    },
    {
      title: '标题',
      dataIndex: 'reportTitle',
      render: (_) => <a>{_}</a>,
    },

    {
      title: '状态',
      dataIndex: 'reportStatus',
      initialValue:'3',
      filters:true,
      onFilter:true,
      width: "150px",
      valueEnum:{
        "0":{text: '按时提交', status: 'Success'},
        "1":{text: '迟交', status: 'Error'},
        "2":{text: '未提交', status: 'Default'},
        "3":{text: '错误', status: 'Processing'}
      }

    },



    {
      title: '是否批阅',
      dataIndex: 'tutorMark',
      render:(_) => _ ==="0" ? <Tag color="red" style={{fontSize:'14px'}}>未批阅</Tag> : <Tag color="green" style={{fontSize:'14px'}}>已批阅</Tag>
    },
    {
      title: '评语',
      dataIndex: 'tutorComment',
      render:(_) =>{
        if(_ === "-"){
          return _;
        }
        return _.slice(0,12) + "...";
      }
    },
    {
      title: '成绩',
      dataIndex: 'tutorGrade',
      valueType: 'text',
    },

    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      valueType: 'option',
      render: (_,record) => [
        record.tutorMark==="0"?
          <Button key="piyue"
                  size="small"
                  type="link"
                  onClick={()=>{
                    setModalVisible(true);
                    setCurrentRow(record);
                  }}
          >
            批阅
          </Button> :
          <Button key="cxpiyue"
                  size="small"
                  type="link"
                  onClick={()=>{
                    setModalVisible(true);
                    setCurrentRow(record);
                  }}
          >
            重新批阅
          </Button>
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
    <WrapContent>
    <Modal
      width="60%"
      title="实习报告批阅"
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >



      <ProTable
        columns={columns}
        actionRef={actionRef}
        formRef={formTableRef}
        rowKey="reportId"
        key="report"


        request={(params) =>
          getReportLogListByStuId(params,stuId).then((res) => {
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
              label: <span>共计{renderBadge(count, activeKey === 'tab1')}</span>,
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

      <DetailForm
        onSubmit={async (values) => {
          let success = false;
          let reqData = {}
          reqData.reportId = currentRow?.reportId
          reqData.tutorGrade = values.tutorGrade
          reqData.tutorComment = values.tutorComment
          reqData.tutorMark = "1"
          //表示此用户为企业
          success = await handleUpdate(reqData);
              if (success) {
                setModalVisible(false);
                setCurrentRow(undefined);
                console.log(reqData)
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            else{
              setModalVisible(false);
              setCurrentRow(undefined);
              message.error("网络错误，请重试")
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
      />


    </WrapContent>


  );
};

export default PostForm;
