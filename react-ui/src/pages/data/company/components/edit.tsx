import React, {useEffect, useState} from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormTreeSelect
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { CompanyType } from '../data';



export type CompanyFormValueType = Record<string, unknown> & Partial<CompanyType>;

export type TutorFormProps = {
  onCancel: (flag?: boolean, formVals?: CompanyFormValueType) => void;
  onSubmit: (values: CompanyFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<CompanyType>;
};

const TutorForm: React.FC<TutorFormProps> = (props) => {
  const [form] = Form.useForm();

  const [userId, setUserId] = useState<any>('');


  useEffect(() => {
    form.resetFields();
    setUserId(props.values.userId);
    form.setFieldsValue({
      userName: props.values?.extra?.username,
      userId: props.values.userId,
      deptid: props.values?.extra?.deptid,
      email: props.values?.extra?.email,
      phone: props.values?.extra?.phone,

      companyId:props.values.companyId,
      companyName:props.values.companyName,
      departmentName:props.values.departmentName,


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
  const handleFinish = async (values: Record<string, any>) => {
    props.onSubmit(values as CompanyFormValueType);
    return true;
  };

  return (
    <Modal
      width={640}
      title="编辑企业信息"
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="companyName"
              label="企业名称"
              width="xl"
              placeholder="请输入企业名称"
              rules={[
                {
                  required: true,
                  message: "请输入企业名称！",
                },
              ]}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="departmentName"
              label='部门名称'
              width="xl"
              placeholder="请输入部门名称"
              rules={[
                {
                  required: true,
                  message: "请输入部门名称",
                },
              ]}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormDigit
              name="phone"
              label='手机号码'
              width="xl"
              placeholder="请输入手机号码"
              rules={[
                {
                  required: true,
                  message: "请输入手机号码！",
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="email"
              label='用户邮箱'
              width="xl"
              placeholder="请输入用户邮箱"
              rules={[
                {
                  required: true,
                  message: "请输入用户邮箱！",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="userName"
              label='用户账号'
              width="xl"
              hidden={userId}
              placeholder="请输入用户账号"
              rules={[
                {
                  required: !userId,
                  message: "请输入用户账号！",
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="password"
              label='密码'
              width="xl"
              hidden={userId}
              placeholder="请输入密码"
              rules={[
                {
                  required: !userId,
                  message: "请输入密码！",
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TutorForm;
