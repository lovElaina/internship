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

  //const [modalVisible, setModalVisible] = useState(false);
  //const [currentRow, setCurrentRow] = useState();

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



  //判断学生是否为实习中
  function isRightStatus(){
    return stuInfo.stuInfo?.internshipStatus === "1"
  }


  return (
    <WrapContent>
      {
        (stuInfo) ? <Row gutter={16}>

          <Col span={3}>
            <Card title="应交日报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>
              Card content
            </Card>
          </Col>
          <Col span={3}>
            <Card title="实交日报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>
              Card content
            </Card>
          </Col>

          <Col span={3}>
            <Card title="应交周报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>
              Card content
            </Card>
          </Col>

          <Col span={3}>
            <Card title="实交周报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>
              Card content
            </Card>
          </Col>

          <Col span={3}>
            <Card title="应交月报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>
              Card content
            </Card>
          </Col>

          <Col span={3}>
            <Card title="实交月报" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>
              Card content
            </Card>
          </Col>

          <Col span={3}>
            <Card title="提交率" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>
              Card content
            </Card>
          </Col>

          <Col span={3}>
            <Card title="平均分" bordered={false} headStyle={{textAlign:"center"}} style={{textAlign:"center"}}>
              Card content
            </Card>
          </Col>

        </Row> : <div/>
      }





      <div style={{width: '100%', float: 'right', marginTop: "24px"}}>

        {
          stuInfo ? <div>haha</div>: <div>loading...</div>

            }

          </div>
        }



    </WrapContent>
  );
};

export default PostTableList;
