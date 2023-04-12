import React, { useEffect, useState } from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import {ProFormDateRangePicker} from '@ant-design/pro-components'
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { UserType } from '../data';
import type { DataNode } from 'antd/lib/tree';


export type UserFormValueType = Record<string, unknown> & Partial<UserType>;

export type UserFormProps = {
  onCancel: (flag?: boolean, formVals?: UserFormValueType) => void;
  onSubmit: (values: UserFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<UserType>;
  sexOptions: any;
  statusOptions: any;
  postIds: string[];
  posts: string[];
  roleIds: string[];
  roles: string[];
  depts: DataNode[];
  internshipStatusOptions:any;
  tutorOptions:any;
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const [form] = Form.useForm();

  const [userId, setUserId] = useState<any>('');

  //const [isInternship, setIsInternship] = useState<any>(false);

  const { sexOptions, tutorOptions , internshipStatusOptions  } = props;
  const { posts ,depts } = props;

  useEffect(() => {
    console.log(Date.now())
    form.resetFields();
    setUserId(props.values.userId);

    //setIsInternship(props.values.internshipStatus === "1");
    console.log(props.values.startTime)
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
      tutorId:props.values.tutorId ? props.values.tutorId+"" : null,
      dateRange:props.values.startTime ? [props.values.startTime-0, props.values.endTime-0]:[Date.now(), Date.now()],
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
    props.onSubmit(values as UserFormValueType);
    return true;
  };

  return (
    <Modal
      width={640}
      title={intl.formatMessage({
        id: 'system.User.modify_info',
        defaultMessage: '编辑学生信息',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >


      <Form form={form} onFinish={handleFinish} initialValues={{...props.values}}>
        <Row gutter={[16, 16]}>

          <Col span={12} order={1}>
            <ProFormDigit
              name="studentId"
              label="学号"
              width="xl"
              placeholder="请输入学号"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入学号！" defaultMessage="请输入学号！" />,
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
              label={intl.formatMessage({
                id: 'post',
                defaultMessage: '实习情况',
              })}
              placeholder="请选择实习情况"
              rules={[{ required: true, message: '请选择实习情况!' }]}
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
              label={intl.formatMessage({
                id: 'system.User.dept_id',
                defaultMessage: '班级',
              })}
              request={async () => {
                return depts;
              }}
              width="xl"
              placeholder="请输入班级"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入班级" defaultMessage="请输入班级" />
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
                  required: true,
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
                  required: true,
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
                  required: true,
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
                defaultMessage: '用户性别',
              })}
              width="xl"
              placeholder="请输入用户性别"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入用户性别！" defaultMessage="请输入用户性别！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormSelect
              name="tutorId"
              mode="single"
              valueEnum={tutorOptions}

              label="导师"
              width="xl"
              placeholder="请选择导师"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请选择导师！" defaultMessage="请选择导师！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormText
              name="avatar"
              label={intl.formatMessage({
                id: 'system.User.avatar',
                defaultMessage: '头像地址',
              })}
              width="xl"
              placeholder="请输入头像地址"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入头像地址！" defaultMessage="请输入头像地址！" />
                  ),
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
              name="remark"
              label={intl.formatMessage({
                id: 'system.User.remark',
                defaultMessage: '备注',
              })}
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





        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDateRangePicker
              width="md"
              name="dateRange"
              label="实习起止时间"
            />
          </Col>
        </Row>


          <Row gutter={[16, 16]}>
            <Col span={24} order={1}>
              <ProFormSelect
                name="postIds"
                mode="single"
                width="xl"
                label="岗位"
                options={posts}
                placeholder="请选择岗位"
                rules={[{ required: false, message: '请选择岗位!' }]}
              />
            </Col>
          </Row>




      </Form>
    </Modal>
  );
};

export default UserForm;
