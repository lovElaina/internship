import {CoffeeOutlined, FormOutlined} from '@ant-design/icons';
import {Button, Col, Modal, Row, message} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {FormattedMessage, useAccess, useIntl} from 'umi';
import WrapContent from '@/components/WrapContent';
import ProTable from '@ant-design/pro-table';
import {
  getAttendLogListByStuId,
  queryCurrentUserInfo,
  updateAttend,
  updateLog
} from './service';
import Card from "antd/es/card";
import {useRequest} from "@@/plugin-request/request";


const PostTableList = () => {
  const formTableRef = useRef();

  const actionRef = useRef();

  const [logList, setLogList] = useState();

  const [stuInfo, setStuInfo] = useState()

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
      dataIndex: 'attendDate',
      //render: (_) => <a>{_}</a>,
      render: (_) => {
        let d = new Date(_ - 0);
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      }
    },
    {
      title: '上班时间',
      dataIndex: 'workTime',
      render: (_) => {
        if (_ === "-") return "-- : -- : --"
        let d = new Date(_ - 0);
        return (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + " : " + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + " : " + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds())
      }
    },
    {
      title: '下班时间',
      dataIndex: 'restTime',
      render: (_) => {
        if (_ === "-") return "-- : -- : --"
        let d = new Date(_ - 0);
        return (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + " : " + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + " : " + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds())
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
    }
  ];


  async function signOn() {
    let val = {}
    val.stuId = stuInfo?.resId;
    val.attendDate = new Date(new Date().toLocaleDateString()).getTime();

    if (isLate()) {
      val.result = "2"
    } else val.result = "0";

    val.workTime = new Date() - 0;

    const hide = message.loading('请稍候')
    try {
      const resp = await updateAttend(val);
      hide();
      if (resp.code === 200) {
        message.success('打卡成功');
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        message.error(resp.msg);
      }
      return true;
    } catch (error) {
      hide();
      message.error('打卡失败，请重试');
      return false;
    }
  }


  async function signOff() {
    let val = {}
    val.stuId = stuInfo?.resId;
    val.attendDate = new Date(new Date().toLocaleDateString()).getTime();

    // if (isLate()) {
    //   val.result = "2"
    // } else val.result = "0";

    val.restTime = new Date() - 0;

    const hide = message.loading('请稍候')
    try {
      const resp = await updateAttend(val);
      hide();
      if (resp.code === 200) {
        message.success('打卡成功');
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        message.error(resp.msg);
      }
      return true;
    } catch (error) {
      hide();
      message.error('打卡失败，请重试');
      return false;
    }
  }





  //判断是否迟到
  function isLate(){
    return new Date().getHours() > 9;
  }

  //判断学生是否为实习中
  function isWrongStatus(){
    return stuInfo.stuInfo?.internshipStatus !== "1"
  }

  //判断是否到上班打卡时间
  function isWrongTime(){
    return new Date().getHours() < 6;
  }

  //判断是否到下班打卡时间
  function isWrongOffTime(){
    return new Date().getHours() < 17;
  }

  //判断是否为周末
  function isWeekend(logList){
    return logList.rows[0].result === "1" || logList.rows[0].attendDate !== new Date(new Date().toLocaleDateString()).getTime();
  }

  //判断是否缺勤或请假
  function isLeaveOrAbsent(logList){
    return logList.rows[0].attendDate === new Date(new Date().toLocaleDateString()).getTime() && (logList.rows[0].result === "1" || logList.rows[0].result === "3");
  }

  //判断存在上班打卡记录
  function isAlreadySign(logList){
    return logList.rows[0].attendDate === new Date(new Date().toLocaleDateString()).getTime() && logList.rows[0].workTime !== null;
  }

  //判断存在下班打卡记录
  function isAlreadySignOff(logList){
    return logList.rows[0].attendDate === new Date(new Date().toLocaleDateString()).getTime() && logList.rows[0].restTime !== null;
  }

  return (
    <WrapContent>
      {
        (stuInfo && logList && stuInfo.stuInfo.internshipStatus!=="0") ? <Row gutter={16}>

          <Col span={6}>
            <Button type="primary"
                    disabled={(!logList)||isWrongStatus()||isWrongTime()||isWeekend(logList)||isLeaveOrAbsent(logList)||isAlreadySign(logList)}
                    onClick={signOn} block icon={<FormOutlined/>} style={{height: "100%", fontSize: "24px"}}>上班打卡</Button>
          </Col>
          <Col span={6}>
            <Button type="primary" block
                    disabled={(!logList)||isWrongStatus()||isWrongOffTime()||isWeekend(logList)||!isAlreadySign(logList)||isAlreadySignOff(logList)}
              // disabled={(logList ? isForbid(logList) : true) ||(logList ? isWeekendOrRest(logList) : true) ||new Date().getHours() < 17 || stuInfo.stuInfo?.internshipStatus !== "1"}
                    onClick={signOff} danger icon={<CoffeeOutlined/>} style={{height: "100%", fontSize: "24px"}}>下班打卡</Button>
          </Col>

          <Col span={8}>
            <Card title="提示信息" bordered={false}>

              {
                ((!logList)||isWrongStatus()||isWrongTime()||isWeekend(logList)||isLeaveOrAbsent(logList)||isAlreadySign(logList)) ?
                  <div style={{color: "purple", fontWeight: "bold"}}>无法进行上班打卡，原因：</div> : <div/>
              }

              {
                isWrongStatus() ? <div>当前未开始实习，请联系导师或教务处</div> : <div/>
              }

              {
                isWrongTime() ? <div>未到上班打卡时间</div> : <div/>
              }

              {
                (isWeekend(logList)) ? <div>今天为节假日，无需打卡</div> : <div/>
              }

              {
                isLeaveOrAbsent(logList) ? <div>今天请假或缺勤，无法打卡</div> : <div/>
              }

              {
                (isAlreadySign(logList)) ? <div>今天已经存在上班打卡记录</div> : <div/>
              }



              {
                ((!logList)||isWrongStatus()||isWrongOffTime()||isWeekend(logList)||!isAlreadySign(logList)||isAlreadySignOff(logList)) ?
                  <div style={{color: "purple", fontWeight: "bold"}}>无法进行下班打卡，原因：</div> : <div/>
              }

              {
                isWrongStatus() ? <div>当前未开始实习，请联系导师或教务处</div> : <div/>
              }

              {
                isWrongOffTime() ? <div>未到下班打卡时间</div> : <div/>
              }

              {
                (isWeekend(logList)) ? <div>今天为节假日，无需打卡</div> : <div/>
              }

              {
                (!isAlreadySign(logList)) ? <div>由于未进行上班打卡，无法进行下班打卡</div> : <div/>
              }

              {
                isAlreadySignOff(logList) ? <div>今天已经存在下班打卡记录</div> : <div/>
              }

            </Card>
          </Col>

        </Row> : <div/>
      }





      <div style={{width: '100%', float: 'right', marginTop: "24px"}}>

        {stuInfo && stuInfo.stuInfo.internshipStatus!=="0" ?

          <ProTable
            headerTitle="打卡记录"
            actionRef={actionRef}
            formRef={formTableRef}
            rowKey="postId"
            key="postList"
            search={false}

            request={(params) =>
              getAttendLogListByStuId(params, stuInfo.resId===undefined?0:stuInfo.resId).then((res) => {
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

          :<Col span={8} style={{marginTop:"-24px"}}>
            <Card title="提示信息"><div>当前无进行中的实习，请在事务申请中提交实习申请</div></Card>
          </Col>}

      </div>


    </WrapContent>
  );
};

export default PostTableList;
