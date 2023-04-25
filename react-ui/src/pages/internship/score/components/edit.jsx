import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import {Form, Modal, Row, Col, Tag} from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import {CheckCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined} from "@ant-design/icons";


const PostForm = (props) => {
  const [form] = Form.useForm();

  const { allowTutorEdit, allowCompanyEdit } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      stuId: props.values.stuId,
      attendScore: props.values.attendScore,
      actionCompanyScore: props.values.actionCompanyScore,
      reportTutorScore: props.values.reportTutorScore,
      reportCompanyScore: props.values.reportCompanyScore,
      tutorComplete: props.values.tutorComplete,
      companyComplete: props.values.companyComplete,
      totalScore: props.values.totalScore,
      stuName: props.values.extra?.stuname
    });
  }, [form, props]);

  const intl = useIntl();
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

  return (
    <Modal
      width={640}
      title='成绩管理'
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              readonly
              name="stuName"
              label="姓名"
              width="xl"
              //disabled
              //hidden={!props.values.postId}
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              readonly={!allowCompanyEdit}
              name="attendScore"
              label="出勤评分(企业)"
              width="xl"
              min={1}
              max={100}
              placeholder="请输入出勤评分(1-100)"
              rules={[
                {
                  required: false,
                  message: "请输入出勤评分(1-100)",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              readonly={!allowCompanyEdit}
              name="actionCompanyScore"
              label="表现评分(企业)"
              width="xl"
              min={1}
              max={100}
              placeholder="请输入表现评分(1-100)"
              rules={[
                {
                  required: false,
                  message: "请输入表现评分(1-100)",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} order={1}>
            <ProFormText
              readonly
              name="reportCompanyScore"
              label="报告评分(企业)"
              width="xl"
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>

          <Col span={16} order={2}>

            {props.values.companyComplete === "0" ?
              <Tag icon={<MinusCircleOutlined />} color="red">企业存在未评分的实习报告，请前往报告管理页面评分</Tag> :
              <Tag icon={<CheckCircleOutlined />} color="green">企业已完成报告评分</Tag>
            }

          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={8} order={1}>
            <ProFormText
              readonly
              name="reportTutorScore"
              label="报告评分(导师)"
              width="xl"
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>

          <Col span={16} order={2}>
            {props.values.tutorComplete === "0" ?
              <Tag icon={<MinusCircleOutlined />} color="red">导师存在未评分的实习报告，请前往报告管理页面评分</Tag> :
              <Tag icon={<CheckCircleOutlined />} color="green">导师已完成报告评分</Tag>
            }
          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={8} order={1}>
            <ProFormText
              readonly
              name="totalScore"
              label="总评分"
              width="xl"
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>
          <Col span={16} order={2}>
            <Tag icon={<ExclamationCircleOutlined />}  color="blue">总评分由各项分数按照一定比例计算得出，无需手动设置</Tag>
          </Col>
        </Row>


        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24} order={1}>*/}
        {/*    <ProFormRadio.Group*/}
        {/*      valueEnum={statusOptions}*/}
        {/*      name="status"*/}
        {/*      label={intl.formatMessage({*/}
        {/*        id: 'system.Post.status',*/}
        {/*        defaultMessage: '状态',*/}
        {/*      })}*/}
        {/*      width="xl"*/}
        {/*      labelCol={{ span: 24 }}*/}
        {/*      placeholder="请输入状态"*/}
        {/*      rules={[*/}
        {/*        {*/}
        {/*          required: true,*/}
        {/*          message: <FormattedMessage id="请输入状态！" defaultMessage="请输入状态！" />,*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}


        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24} order={1}>*/}
        {/*    <ProFormText*/}
        {/*      name="remark"*/}
        {/*      label="备注"*/}
        {/*      width="xl"*/}
        {/*      placeholder="请输入备注"*/}
        {/*      rules={[*/}
        {/*        {*/}
        {/*          required: false,*/}
        {/*          message: <FormattedMessage id="请输入备注！" defaultMessage="请输入备注！" />,*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </Form>
    </Modal>
  );
};

export default PostForm;
