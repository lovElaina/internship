import React from 'react';
import { Form, message, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import ProForm, { ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { useIntl } from 'umi';
import { updateUserProfile } from '@/pages/data/student/service';

export type BaseInfoProps = {
  values: Partial<API.CurrentUser> | undefined;
};

const BaseInfo: React.FC<BaseInfoProps> = (props) => {
  const [form] = Form.useForm();
  const intl = useIntl();

  const handleFinish = async (values: Record<string, any>) => {
    const data = { ...props.values, ...values } as API.CurrentUser;
    const resp = await updateUserProfile(data);
    if (resp.code === 200) {
      message.success('修改成功');
    } else {
      message.warn(resp.msg);
    }
  };

  return (
    <>
      <ProForm form={form} onFinish={handleFinish} initialValues={props.values}>
        {/*<Row>*/}
        {/*  <ProFormText*/}
        {/*    name="nickName"*/}
        {/*    label={intl.formatMessage({*/}
        {/*      id: 'system.User.nick_name',*/}
        {/*      defaultMessage: '姓名',*/}
        {/*    })}*/}
        {/*    width="xl"*/}
        {/*    placeholder="请输入姓名"*/}
        {/*    rules={[*/}
        {/*      {*/}
        {/*        required: true,*/}
        {/*        message: (*/}
        {/*          <FormattedMessage id="请输入姓名" defaultMessage="请输入姓名" />*/}
        {/*        ),*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*  />*/}
        {/*</Row>*/}
        <Row>
          <ProFormText
            name="phone"
            label='手机号码'
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
        </Row>
        <Row>
          <ProFormText
            name="email"
            label={intl.formatMessage({
              id: 'system.User.email',
              defaultMessage: '邮箱',
            })}
            width="xl"
            placeholder="请输入邮箱"
            rules={[
              {
                type: 'email',
                message: '无效的邮箱地址!',
              },
              {
                required: false,
                message: <FormattedMessage id="请输入邮箱！" defaultMessage="请输入邮箱！" />,
              },
            ]}
          />
        </Row>
        <Row>
          <ProFormRadio.Group
            options={[
              {
                label: '男',
                value: '0',
              },
              {
                label: '女',
                value: '1',
              },
            ]}
            name="sex"
            label={intl.formatMessage({
              id: 'system.User.sex',
              defaultMessage: 'sex',
            })}
            width="xl"
            rules={[
              {
                required: false,
                message: <FormattedMessage id="请输入性别！" defaultMessage="请输入性别！" />,
              },
            ]}
          />
        </Row>
      </ProForm>
    </>
  );
};

export default BaseInfo;
