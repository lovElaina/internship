import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';


const PostForm = (props) => {
  const [form] = Form.useForm();

  const { isQueryMode } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({


      postId: props.values.postId,
      postName: props.values.postName,
      companyName: props.values?.extra?.companyname,
      departmentName: props.values?.extra?.departmentname,
      postMajor: props.values.postMajor,
      postSalary: props.values.postSalary,
      workTime: props.values.workTime,
      attendTime: props.values.attendTime,
      postRequirement: props.values.postRequirement,
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
      title='编辑岗位信息'
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              readonly={isQueryMode}
              name="postName"
              label="岗位名称"
              width="xl"
              placeholder="输入岗位名称"
              //disabled
              //hidden={!props.values.postId}
              rules={[
                {
                  required: false,
                  message: "请输入岗位名称",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              readonly={isQueryMode}
              name="postSalary"
              label="薪酬"
              width="xl"
              placeholder="请输入薪酬，如：日薪300-500"
              rules={[
                {
                  required: true,
                  message: "请输入薪酬，如：日薪300-500",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              readonly={isQueryMode}
              name="postMajor"
              label="专业要求"
              width="xl"
              placeholder="请输入专业要求"
              rules={[
                {
                  required: true,
                  message: "请输入专业要求",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              readonly={isQueryMode}
              name="workTime"
              label="工作日期"
              width="xl"
              placeholder="请输入工作日期 例如：周一至周五"
              rules={[
                {
                  required: true,
                  message: "请输入工作日期 例如：周一至周五",
                },
              ]}
            />
          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              readonly={isQueryMode}
              name="attendTime"
              label="上下班时间"
              width="xl"
              placeholder="上下班时间"
              rules={[
                {
                  required: true,
                  message: "上下班时间",
                },
              ]}
            />
          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              readonly={isQueryMode}
              name="postRequirement"
              label="其他要求"
              width="xl"
              placeholder="请输入其他要求"
              rules={[
                {
                  required: false,
                  message: "请输入其他要求",
                },
              ]}
            />
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
