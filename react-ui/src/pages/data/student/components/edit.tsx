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
import dayjs from "dayjs";


export type UserFormValueType = Record<string, unknown> & Partial<UserType>;

export type UserFormProps = {
  onCancel: (flag?: boolean, formVals?: UserFormValueType) => void;
  onSubmit: (values: UserFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<UserType>;
  sexOptions: any;
  statusOptions: any;
  //postIds: string[];
  posts: string[];
  //roleIds: string[];
  //roles: string[];
  depts: DataNode[];
  internshipStatusOptions:any;
  tutorOptions:any;
  isQueryMode:boolean;
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const [form] = Form.useForm();

  const [userId, setUserId] = useState<any>('');

  //const [isInternship, setIsInternship] = useState<any>(false);

  const { sexOptions, tutorOptions , internshipStatusOptions , isQueryMode } = props;
  const { posts ,depts } = props;

  useEffect(() => {
    //console.log(Date.now())
    form.resetFields();
    setUserId(props.values.userId);

    //setIsInternship(props.values.internshipStatus === "1");
    console.log(props.values)
    form.setFieldsValue({
      userName:props.values?.extra?.username,
      stuNumber: props.values.stuNumber,
      stuName: props.values.stuName,
      internshipStatus: props.values.internshipStatus,
      deptid: props.values?.extra?.deptid,
      phone: props.values?.extra?.phone,
      email:props.values?.extra?.email,
      stuGender: props.values.stuGender,
      tutorId:props.values.tutorId ? props.values.tutorId+"" : null,
      remark: props.values.remark,
      dateRange:props.values.startTime ? [props.values.startTime-0, props.values.endTime-0]:[Date.now(), Date.now()],



      // userId: props.values.userId,
      // studentId: props.values.studentId,
      // deptId: props.values.deptId,
      // //postIds: props.postIds,
      // postId:props.values.postId,
      // //roleIds: props.roleIds,
      // userName: props.values.userName,
      // nickName: props.values.nickName,
      // userType: props.values.userType,
      // email: props.values.email,
      // phonenumber: props.values.phonenumber,
      // sex: props.values.sex,
      // avatar: props.values.avatar,
      // password: props.values.password,
      // status: props.values.status,
      // internshipStatus:props.values.internshipStatus,
      // delFlag: props.values.delFlag,
      // loginIp: props.values.loginIp,
      // loginDate: props.values.loginDate,
      // createBy: props.values.createBy,
      // createTime: props.values.createTime,
      // updateBy: props.values.updateBy,
      // updateTime: props.values.updateTime,
      // remark: props.values.remark,
      // tutorId:props.values.tutorId ? props.values.tutorId+"" : null,
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

  // @ts-ignore
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  return (
    <Modal
      width={640}
      title='编辑学生信息'
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >


      <Form form={form} onFinish={handleFinish} initialValues={{...props.values}}>
        <Row gutter={[16, 16]}>

          <Col span={12} order={1}>
            <ProFormText
              readonly={isQueryMode}
              //disabled={isQueryMode}
              name="stuNumber"
              label="学号"
              width="xl"
              placeholder="请输入学号"
              rules={[
                {
                  required: true,
                  message: "请输入学号！" ,
                },
              ]}
            />
          </Col>

          <Col span={12} order={2}>
            <ProFormSelect
              readonly={isQueryMode}
              //disabled={isQueryMode}
              name="internshipStatus"
              mode="single"
              valueEnum={internshipStatusOptions}
              width="xl"
              label='实习情况'
              placeholder="请选择实习情况"
              rules={[{ required: true, message: '请选择实习情况!' }]}
            />
          </Col>


        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              readonly={isQueryMode}
              //disabled={isQueryMode}
              name="stuName"
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
          <Col span={12} order={2}>
            <ProFormTreeSelect
              //readonly={isQueryMode}
              disabled={isQueryMode}
              name="deptid"
              label='班级'
              request={async () => {
                return depts;
              }}
              width="xl"
              placeholder="请输入班级"
              rules={[
                {
                  required: true,
                  message: "请输入班级",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              readonly={isQueryMode}
              //disabled={isQueryMode}
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
              //disabled={isQueryMode}
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
          <Col span={12} order={1}>
            <ProFormSelect
              readonly={isQueryMode}
              //disabled={isQueryMode}
              valueEnum={sexOptions}
              name="stuGender"
              label='用户性别'
              width="xl"
              placeholder="请输入用户性别"
              rules={[
                {
                  required: true,
                  message: "请输入用户性别！",
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormSelect
              readonly={isQueryMode}
              //disabled={isQueryMode}
              name="tutorId"
              mode="single"
              valueEnum={tutorOptions}
///////////////////////////////////////////////////////////////////////////////////////////////////////
              label="导师"
              width="xl"
              placeholder="请选择导师"
              rules={[
                {
                  required: true,
                  message: "请选择导师！",
                },
              ]}
            />
          </Col>
        </Row>
        {/*<Row gutter={[16, 16]}>*/}
        {/*  <Col span={24} order={1}>*/}
        {/*    <ProFormText*/}
        {/*      name="avatar"*/}
        {/*      label='头像地址'*/}
        {/*      width="xl"*/}
        {/*      placeholder="请输入头像地址"*/}
        {/*      rules={[*/}
        {/*        {*/}
        {/*          required: false,*/}
        {/*          message: "请输入头像地址！",*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row gutter={[16, 16]}>*/}

        {/*</Row>*/}
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              //disabled={isQueryMode}
              readonly={isQueryMode}
              name="remark"
              label='备注'
              width="xl"
              placeholder="请输入备注"
              rules={[
                {
                  required: false,
                  message: "请输入备注！",
                },
              ]}
            />
          </Col>
        </Row>





        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDateRangePicker
              readonly={isQueryMode}
              //disabled={isQueryMode}
              fieldProps={{disabledDate:disabledDate}}
              width="md"
              name="dateRange"
              label="实习起止时间"
            />
          </Col>
        </Row>


          <Row gutter={[16, 16]}>
            <Col span={24} order={1}>
              <ProFormSelect
                readonly={isQueryMode}
                //disabled={isQueryMode}
                name="postId"
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
