import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';


const PostForm = (props) => {
  const [form] = Form.useForm();

  const { statusOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      postId: props.values.postId,
      //postCode: props.values.postCode,
      postName: props.values.postName,
      companyName: props.values.companyName,
      depName: props.values.depName,
      status: props.values.status,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
      remark: props.values.remark,
      salary: props.values.salary,
      workTime: props.values.workTime,
      requirement:props.values.requirement,
      phonenumber:props.values.phonenumber,
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
      title={intl.formatMessage({
        id: 'system.Post.modify',
        defaultMessage: '编辑岗位信息',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              name="postName"
              label="岗位名称"
              width="xl"
              placeholder="输入岗位名称"
              //disabled
              //hidden={!props.values.postId}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="输入岗位名称" defaultMessage="请输入岗位名称" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="companyName"
              label="公司名称"
              width="xl"
              placeholder="请输入公司名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入公司名称！" defaultMessage="请输入公司名称" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="depName"
              label="部门名称"
              width="xl"
              placeholder="请输入部门名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入部门名称！" defaultMessage="请输入部门名称" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="salary"
              label="薪酬范围"
              width="xl"
              placeholder="请输入薪酬范围"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入薪酬范围！" defaultMessage="请输入薪酬范围" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="workTime"
              label="工作时间"
              width="xl"
              placeholder="请输入工作时间"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入工作时间！" defaultMessage="请输入工作时间" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="phonenumber"
              label="联系电话"
              width="xl"
              placeholder="请输入联系电话"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入联系电话！" defaultMessage="请输入联系电话" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>



        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="requirement"
              label="岗位要求"
              width="xl"
              placeholder="请输入岗位要求"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入岗位要求！" defaultMessage="请输入岗位要求！" />,
                },
              ]}
            />
          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormRadio.Group
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'system.Post.status',
                defaultMessage: '状态',
              })}
              width="xl"
              labelCol={{ span: 24 }}
              placeholder="请输入状态"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入状态！" defaultMessage="请输入状态！" />,
                },
              ]}
            />
          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="remark"
              label="备注"
              width="xl"
              placeholder="请输入备注"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入备注！" defaultMessage="请输入备注！" />,
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default PostForm;
