import {CoffeeOutlined, FormOutlined} from '@ant-design/icons';
import {Button, Col, Modal, Row, message, Tag, Divider} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {FormattedMessage, useAccess, useIntl} from 'umi';
import WrapContent from '@/components/WrapContent';
import ProTable from '@ant-design/pro-table';
import {
  getAttendLogListByStuId, getReportLogListByStuId, getScore,
  queryCurrentUserInfo,
  updateAttend,
  updateLog, updateReportText
} from './service';
import Card from "antd/es/card";
import {useRequest} from "@@/plugin-request/request";

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


  const [stuInfo, setStuInfo] = useState()

  const [stuScore, setStuScore] = useState()

  //const [modalVisible, setModalVisible] = useState(false);
  //const [currentRow, setCurrentRow] = useState();

  const access = useAccess();

  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  /** 国际化配置 */
  const intl = useIntl();

  const {data: userInfo, loading} = useRequest(() => {
    return queryCurrentUserInfo();
  });
  console.log(userInfo);

  useEffect(() => {
    //setStuInfo(userInfo)
    getScore(userInfo?.stuInfo?.stuId).then(res=>{
      console.log(res.data)
      setStuScore(res.data)
    })

  }, [userInfo])



  //判断学生是否为实习中
  function isRightStatus(){
    return stuInfo.stuInfo?.internshipStatus === "1"
  }


  return (

    <WrapContent>
      {
        userInfo?.stuInfo.internshipStatus!=="0" ?
          <>
          <Card title="成绩详情" style={{fontWeight:"bold",fontSize:"16px"}}>
            <Card.Grid style={gridStyle}>考勤得分</Card.Grid>
            <Card.Grid style={gridStyle}>表现得分</Card.Grid>
            <Card.Grid style={gridStyle}>实习报告得分（企业）</Card.Grid>
            <Card.Grid style={gridStyle}>实习报告得分（导师）</Card.Grid>
            <Card.Grid style={gridStyle}>{stuScore?.attendScore ? (stuScore.attendScore <=60 ? <div style={{color:"red"}}>{stuScore.attendScore}</div>:<div style={{color:"green"}}>{stuScore.attendScore}</div> ) : '暂无'}</Card.Grid>
            <Card.Grid style={gridStyle}>{stuScore?.actionCompanyScore ? (stuScore.actionCompanyScore <= 60 ? <div style={{color:"red"}}>{stuScore.actionCompanyScore}</div>:<div style={{color:"green"}}>{stuScore.actionCompanyScore}</div> ) : '暂无'}</Card.Grid>
            <Card.Grid style={gridStyle}>{stuScore?.reportCompanyScore ? (stuScore.reportCompanyScore <= 60 ? <div style={{color:"red"}}>{stuScore.reportCompanyScore}</div>:<div style={{color:"green"}}>{stuScore.reportCompanyScore}</div>) : '暂无'}</Card.Grid>
            <Card.Grid style={gridStyle}>{stuScore?.reportTutorScore ? (stuScore.reportTutorScore <= 60 ? <div style={{color:"red"}}>{stuScore.reportTutorScore}</div>:<div style={{color:"green"}}>{stuScore.reportTutorScore}</div>) : '暂无'}</Card.Grid>
          </Card>

          <div style={{width: '100%', float: 'right', marginTop: "24px"}}/>

        <Row gutter={[16,16]}>

        <Col span={12} order={1}>
        <Card title="总评分" bordered={false} headStyle={{textAlign:"center",fontWeight:"bold"}} style={{textAlign:"center",fontWeight:"bold",height:160,fontSize:30}}>
      {stuScore?.totalScore ? (stuScore.totalScore <= 60 ? <div style={{color:"red"}}>{stuScore.totalScore}</div>:<div style={{color:"green"}}>{stuScore.totalScore}</div>) : '暂无'}
        </Card>
        </Col>
        <Col span={12} order={2}>
        <Card title="提示信息" bordered={false}>
        <div style={{color:"red",fontSize:'16px',fontWeight:"bold"}}>{stuScore?.tutorComplete !== "1" || stuScore?.companyComplete !== "1" ? "实习报告部分成绩不完整，存在以下问题：" : ""}</div>
        <div>{stuScore?.tutorComplete !== "1" ? "导师未批阅所有实习报告，请尽快联系导师处理。":""}</div>
        <div>{stuScore?.companyComplete !== "1" ? "企业未批阅所有实习报告，请尽快联系企业处理。":""}</div>
        </Card>
        </Col>
        </Row>
          </>: <Col span={8}>
            <Card title="提示信息"><div>当前无进行中的实习，请在事务申请中提交实习申请</div></Card>
          </Col>
      }




    </WrapContent>
  );
};

export default PostTableList;
