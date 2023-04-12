import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import {Card, Typography, Alert, Carousel, Row, Col} from 'antd';
import { useIntl } from 'umi';
import WrapContent from '@/components/WrapContent';
import './tab.css'
import {useRequest} from "@@/plugin-request/request";
import {getNoticeList, queryCurrentUserInfo} from "@/pages/dashboard/index/service";

const Index: React.FC = () => {
  const intl = useIntl();
  const { data: userInfo, loading } = useRequest(() => {
    return queryCurrentUserInfo();
  });
  const currentUser = userInfo?.user;
  console.log(currentUser);

  // @ts-ignore
  const {data: notice} = useRequest(() => {
    return getNoticeList()
  })
  console.log(notice);

  return (
    <WrapContent>

      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            fontSize: 20,
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> 欢迎您！{!loading && (currentUser?.remark + " "+currentUser?.nickName)}
          {/*<HeartTwoTone twoToneColor="#eb2f96" /> You*/}
        </Typography.Title>
      </Card>

      <Carousel autoplay autoplaySpeed={2000} effect={'fade'}>
        <div>
          <img width={500} src={"https://www.pku.edu.cn/Uploads/Picture/2022/12/04/s638c718bd441a.jpg"} alt={"无法加载图片"}/>
        </div>
        <div>
          <img width={500} src={"https://www.pku.edu.cn/Uploads/Picture/2022/11/27/s6382cd7cd7dd3.jpg"} alt={"无法加载图片"}/>
        </div>
        <div>
          <img width={500} src={"https://www.pku.edu.cn/Uploads/Picture/2022/10/22/s6353ab8782418.jpg"} alt={"无法加载图片"}/>
        </div>
        {/*<div>*/}
        {/*  <img width={500} src={"https://www.pku.edu.cn/Uploads/Picture/2022/12/26/s63a9220313bf8.jpg"} alt={"无法加载图片"}/>*/}
        {/*</div>*/}
      </Carousel>

      {/*<Card>*/}
      {/*  */}
      {/*  <Typography.Title level={2} style={{ textAlign: 'center' }}>*/}
      {/*    <SmileTwoTone /> 欢迎您！{!loading && (currentUser?.remark + " "+currentUser?.nickName)}*/}
      {/*    /!*<HeartTwoTone twoToneColor="#eb2f96" /> You*!/*/}
      {/*  </Typography.Title>*/}
      {/*</Card>*/}
      <Row gutter={24} style={{marginTop:24}}>
        <Col span={12}>
        <Card title="通知公告" headStyle={{fontSize:20}} bordered={false}>

          {notice?.rows?.map((ele) => {
            return <p>{(ele.noticeType === "1" ? "通知： " : "公告： ") + ele.noticeTitle} </p>
          })}

        </Card>
        </Col>

        <Col span={12}>
          <Card title="企业推荐（开发中）" headStyle={{fontSize:20}} bordered={false}>
            <p>阿里巴巴实习招聘，5000+职位期待你的加入！详情 <a>https://campus.alibaba.com/index</a></p>
            <p>名企实习，base北京，字节跳动招实习啦！最高300/天！免费下午茶，周末双休，餐补&房补！详情<a>https://jobs.bytedance.com/campus</a></p>
            <p>2022中建西北院暑期“优+”实习生招募 详情 <a>https://mp.weixin.qq.com/s/3v-bGzsceLIi3LRvm1BzZw</a></p>
            <p>招商银行上海分行开启2022寒假实习生招募，欢迎有志加入招行的同学们积极报名! 详情 <a>https://mp.weixin.qq.com/s/VoERJazQONeQl-J3-K6m-A</a></p>
          </Card>
        </Col>
      </Row>




      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
        。
      </p>
    </WrapContent>
  );
};

export default Index;
