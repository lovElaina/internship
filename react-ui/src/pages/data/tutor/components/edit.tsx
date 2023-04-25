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
import type { TutorType } from '../data';
import {DataNode} from "antd/lib/tree";


export type TutorFormValueType = Record<string, unknown> & Partial<TutorType>;

export type TutorFormProps = {
  onCancel: (flag?: boolean, formVals?: TutorFormValueType) => void;
  onSubmit: (values: TutorFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<TutorType>;
  sexOptions: any;
  depts: DataNode[];
  tutorTypeOptions:any;
  isQueryMode:boolean;
};

const TutorForm: React.FC<TutorFormProps> = (props) => {
  const [form] = Form.useForm();

  const [userId, setUserId] = useState<any>('');
  const { depts } = props;
  const { sexOptions, tutorTypeOptions, isQueryMode } = props;

  useEffect(() => {
    form.resetFields();
    setUserId(props.values.userId);
    form.setFieldsValue({
      userName: props.values?.extra?.username,
      userId: props.values.userId,
      tutorNumber: props.values.tutorNumber,
      tutorName: props.values.tutorName,
      tutorGender: props.values.tutorGender,
      tutorType:props.values.tutorType,
      tutorMajor:props.values.tutorMajor,
      deptid: props.values?.extra?.deptid,
      email: props.values?.extra?.email,
      phone: props.values?.extra?.phone,

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
    props.onSubmit(values as TutorFormValueType);
    return true;
  };

  return (
    <Modal
      width={640}
      title="编辑导师信息"
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>

          <Col span={12} order={1}>
            <ProFormText
              readonly={isQueryMode}
              name="tutorNumber"
              label="工号"
              width="xl"
              placeholder="请输入工号"
              rules={[
                {
                  required: true,
                  message: "请输入工号！",
                },
              ]}
            />
          </Col>

          <Col span={12} order={2}>
            <ProFormText
              readonly={isQueryMode}
              name="tutorName"
              label='姓名'
              width="xl"
              placeholder="请输入姓名"
              rules={[
                {
                  required: true,
                  message: "请输入姓名",
                },
              ]}
            />
          </Col>


        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormSelect
              readonly={isQueryMode}
              name="tutorType"
              mode="single"
              valueEnum={tutorTypeOptions}
              width="xl"
              label="职称"
              placeholder="请选择导师职称"
              rules={[{ required: true, message: '请选择导师职称' }]}
            />
          </Col>

          <Col span={12} order={2}>
            <ProFormSelect
              readonly={isQueryMode}
              valueEnum={sexOptions}
              name="tutorGender"
              label='性别'
              width="xl"
              placeholder="请选择导师性别"
              rules={[
                {
                  required: true,
                  message: "请输入用户性别！",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              readonly={isQueryMode}
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
              readonly={isQueryMode}
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
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTreeSelect
              //readonly={isQueryMode}
              disabled={isQueryMode}
              name="deptid"
              label="院系"
              request={async () => {
                return depts;
              }}
              width="xl"
              placeholder="请输入院系"
              rules={[
                {
                  required: true,
                  message: "请输入院系",
                },
              ]}
            />

          </Col>

        </Row>


        <Row gutter={[16, 16]}>
        </Row>



        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              readonly={isQueryMode}
              name="tutorMajor"
              label="专业领域"
              width="xl"
              placeholder="请输入专业领域"
              rules={[
                {
                  required: true,
                  message: "请输入专业领域",
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
