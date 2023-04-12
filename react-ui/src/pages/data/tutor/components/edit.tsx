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
  statusOptions: any;
  postIds: string[];
  posts: string[];
  roleIds: string[];
  roles: string[];
  depts: DataNode[];
  internshipStatusOptions:any;
};

const TutorForm: React.FC<TutorFormProps> = (props) => {
  const [form] = Form.useForm();

  const [userId, setUserId] = useState<any>('');
  const { depts } = props;
  const { sexOptions, statusOptions, internshipStatusOptions } = props;

  useEffect(() => {
    form.resetFields();
    setUserId(props.values.userId);
    form.setFieldsValue({
      userId: props.values.userId,
      studentId: props.values.studentId,
      deptId: props.values.deptId,
      postIds: props.postIds,
      roleIds: props.roleIds,
      userName: props.values.userName,
      nickName: props.values.nickName,
      userType: props.values.userType,
      email: props.values.email,
      phonenumber: props.values.phonenumber,
      sex: props.values.sex,
      avatar: props.values.avatar,
      password: props.values.password,
      status: props.values.status,
      internshipStatus:props.values.internshipStatus,
      delFlag: props.values.delFlag,
      loginIp: props.values.loginIp,
      loginDate: props.values.loginDate,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
      remark: props.values.remark,
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
            <ProFormDigit
              name="studentId"
              label="工号"
              width="xl"
              placeholder="请输入工号"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入工号！" defaultMessage="请输入工号！" />,
                },
              ]}
            />
          </Col>

          <Col span={12} order={2}>
            <ProFormSelect
              name="internshipStatus"
              mode="single"
              valueEnum={internshipStatusOptions}
              width="xl"
              label="类型"
              placeholder="请选择类型"
              rules={[{ required: true, message: '请选择类型' }]}
            />
          </Col>


        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="nickName"
              label={intl.formatMessage({
                id: 'system.User.nick_name',
                defaultMessage: '姓名',
              })}
              width="xl"
              placeholder="请输入姓名"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入姓名" defaultMessage="请输入姓名" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormTreeSelect
              name="deptId"
              label="院系"
              request={async () => {
                return depts;
              }}
              width="xl"
              placeholder="请输入院系"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入院系" defaultMessage="请输入院系" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="phonenumber"
              label={intl.formatMessage({
                id: 'system.User.phonenumber',
                defaultMessage: '手机号码',
              })}
              width="xl"
              placeholder="请输入手机号码"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入手机号码！" defaultMessage="请输入手机号码！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="email"
              label={intl.formatMessage({
                id: 'system.User.email',
                defaultMessage: '用户邮箱',
              })}
              width="xl"
              placeholder="请输入用户邮箱"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入用户邮箱！" defaultMessage="请输入用户邮箱！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="userName"
              label={intl.formatMessage({
                id: 'system.User.user_name',
                defaultMessage: '用户账号',
              })}
              width="xl"
              hidden={userId}
              placeholder="请输入用户账号"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入用户账号！" defaultMessage="请输入用户账号！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="password"
              label={intl.formatMessage({
                id: 'system.User.password',
                defaultMessage: '密码',
              })}
              width="xl"
              hidden={userId}
              placeholder="请输入密码"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入密码！" defaultMessage="请输入密码！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormSelect
              valueEnum={sexOptions}
              name="sex"
              label={intl.formatMessage({
                id: 'system.User.sex',
                defaultMessage: '性别',
              })}
              width="xl"
              placeholder="请输入用户性别"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入用户性别！" defaultMessage="请输入用户性别！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormSelect
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'system.User.status',
                defaultMessage: '账号状态',
              })}
              width="xl"
              placeholder="请输入账号状态"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入账号状态！" defaultMessage="请输入账号状态！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24} order={1}>*/}
        {/*    <ProFormText*/}
        {/*      name="avatar"*/}
        {/*      label={intl.formatMessage({*/}
        {/*        id: 'system.User.avatar',*/}
        {/*        defaultMessage: '头像地址',*/}
        {/*      })}*/}
        {/*      width="xl"*/}
        {/*      placeholder="请输入头像地址"*/}
        {/*      rules={[*/}
        {/*        {*/}
        {/*          required: false,*/}
        {/*          message: (*/}
        {/*            <FormattedMessage id="请输入头像地址！" defaultMessage="请输入头像地址！" />*/}
        {/*          ),*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}

        <Row gutter={[16, 16]}>
        </Row>



        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="remark"
              label="研究方向"
              width="xl"
              placeholder="请输入研究方向"
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

export default TutorForm;
