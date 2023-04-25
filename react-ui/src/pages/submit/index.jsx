import {CoffeeOutlined, FormOutlined} from '@ant-design/icons';
import {Button, Col, Modal, Row, message, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {FormattedMessage, useAccess, useIntl} from 'umi';
import WrapContent from '@/components/WrapContent';
import ProTable from '@ant-design/pro-table';
import {
  getAttendLogListByStuId, getReportLogListByStuId,
  queryCurrentUserInfo,
  updateAttend,
  updateLog, updateReportText
} from './service';
import Card from "antd/es/card";
import {useRequest} from "@@/plugin-request/request";
import DetailForm from "./components/detail";
import {updateReportMark} from "@/pages/internship/report/service";


/**
 * 提交实习报告
 *
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('正在提交');
  try {
    const resp = await updateReportText(fields);
    hide();
    if(resp.code === 200) {
      message.success('提交成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('提交失败，请重试！');
    return false;
  }
};



const PostTableList = () => {
  const formTableRef = useRef();

  const actionRef = useRef();

  const [logList, setLogList] = useState();

  const [stuInfo, setStuInfo] = useState()

  const [modalVisible, setModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();

  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  const {data: userInfo, loading} = useRequest(() => {
    return queryCurrentUserInfo();
  });
  console.log(userInfo);

  useEffect(() => {
    setStuInfo(userInfo)

  }, [userInfo])



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
      width: "200px",
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
      title: '导师批阅',
      dataIndex: 'tutorMark',
      width: "100px",
      render:(_) => _ ==="0" ? <Tag color="red" style={{fontSize:'14px'}}>未批阅</Tag> : <Tag color="green" style={{fontSize:'14px'}}>已批阅</Tag>
    },
    {
      title: '导师评语',
      dataIndex: 'tutorComment',
      width: "280px",
      render:(_) =>{
        if(_ === "-"){
          return _;
        }
        return _.slice(0,12);
      }
    },

    {
      title: '企业批阅',
      dataIndex: 'companyMark',
      width: "100px",
      render:(_) => _ ==="0" ? <Tag color="red" style={{fontSize:'14px'}}>未批阅</Tag> : <Tag color="green" style={{fontSize:'14px'}}>已批阅</Tag>
    },
    {
      title: '企业评语',
      dataIndex: 'companyComment',
      width: "280px",
      render:(_) =>{
        if(_ === "-"){
          return _;
        }
        return _.slice(0,12);
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
      width: 180,
      valueType: 'option',
      render: (_,record) => [
        //报告状态为 已提交 或 迟交 则只能查看详情
        record.reportStatus === "2" ? (
          record.planDate === new Date(new Date().toLocaleDateString()).getTime()?
            <Button key="tijiao"
                    type="primary"
                    disabled={!isRightStatus()}
                    onClick={()=>{
                      setModalVisible(true);
                      setCurrentRow(record);
                    }}
            >
                提交报告
            </Button> :
            <Button key="bujiao"
                    disabled={!isRightStatus()}
                    onClick={()=>{
                      setModalVisible(true);
                      setCurrentRow(record);
                    }}
            >
              补交报告
            </Button>
        ) : <Button key="bujiao"
                    type="link"
                    onClick={()=>{
                      setModalVisible(true);
                      setCurrentRow(record);
                    }}
        >
          查看详情
        </Button>


      ],
    },
  ];




  //判断学生是否为实习中
  function isRightStatus(){
    return stuInfo.stuInfo?.internshipStatus === "1"
  }


  return (
    <WrapContent>
      {/*{*/}
      {/*  (stuInfo && logList) ? <Row gutter={16}>*/}

      {/*    <Col span={3}>*/}
      {/*      <Card title="应交日报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>*/}
      {/*        Card content*/}
      {/*      </Card>*/}
      {/*    </Col>*/}
      {/*    <Col span={3}>*/}
      {/*      <Card title="实交日报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>*/}
      {/*        Card content*/}
      {/*      </Card>*/}
      {/*    </Col>*/}

      {/*    <Col span={3}>*/}
      {/*      <Card title="应交周报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>*/}
      {/*        Card content*/}
      {/*      </Card>*/}
      {/*    </Col>*/}

      {/*    <Col span={3}>*/}
      {/*      <Card title="实交周报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>*/}
      {/*        Card content*/}
      {/*      </Card>*/}
      {/*    </Col>*/}

      {/*    <Col span={3}>*/}
      {/*      <Card title="应交月报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>*/}
      {/*        Card content*/}
      {/*      </Card>*/}
      {/*    </Col>*/}

      {/*    <Col span={3}>*/}
      {/*      <Card title="实交月报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>*/}
      {/*        Card content*/}
      {/*      </Card>*/}
      {/*    </Col>*/}

      {/*    <Col span={3}>*/}
      {/*      <Card title="提交率" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>*/}
      {/*        Card content*/}
      {/*      </Card>*/}
      {/*    </Col>*/}

      {/*    <Col span={3}>*/}
      {/*      <Card title="平均分" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>*/}
      {/*        Card content*/}
      {/*      </Card>*/}
      {/*    </Col>*/}

      {/*  </Row> : <div/>*/}
      {/*}*/}





      <div style={{width: '100%', float: 'right', marginTop: "24px"}}>

        {stuInfo ?

          <ProTable
            headerTitle="提交报告"
            actionRef={actionRef}
            formRef={formTableRef}
            rowKey="reportId"
            key="reportList"
            search={false}

            request={(params) =>
              getReportLogListByStuId(params, stuInfo.resId===undefined?0:stuInfo.resId).then((res) => {
                setLogList(res)
                console.log(res)
                return {
                  data: res.rows,
                  total: res.total,
                  success: true
                }
              })

            }
            columns={columns}
          />

          : <div>loading...</div>}

      </div>

      <DetailForm
        onSubmit={async (values) => {
          let success = false;
          let reqData = {}
          reqData.reportId = currentRow?.reportId
          reqData.reportStatus = currentRow?.planDate === new Date(new Date().toLocaleDateString()).getTime() ? "0" : "1"
          reqData.reportDate = new Date() - 0;
          reqData.reportText = values.reportText
          //console.log(reqData);

          if(values.reportStatus!=="未提交"){
            console.log(values)
            setModalVisible(false);
            setCurrentRow(undefined);
          }else{
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
        }
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        visible={modalVisible}
        values={currentRow || {}}
      />


    </WrapContent>
  );
};

export default PostTableList;
