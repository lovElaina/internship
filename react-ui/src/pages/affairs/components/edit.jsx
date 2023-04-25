import React, {useEffect, useState} from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormTreeSelect, ProForm, ProFormDependency
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import {ProFormDateRangePicker} from "@ant-design/pro-components";
import dayjs from "dayjs";


const ApplyForm = (props) => {
  const [form] = Form.useForm();

  const formRef = React.useRef();

  const [userId, setUserId] = useState('');

  //const { depts } = props;
  //const { sexOptions, statusOptions, internshipStatusOptions } = props;

  // useEffect(() => {
  //   form.resetFields();
  //   //setUserId(props.values.userId);
  // }, [form, props]);


  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    //props.onCancel();
    form.resetFields();
  };
  const handleFinish = async (values) => {
    console.log(values)
    return true;
  };


  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  return (
      <ProForm formRef={formRef}  form={form} onFinish={async (values) =>{
        console.log(values)
      }} >


            <ProFormSelect
              name="applyType"
              mode="single"
              options={[
                {
                  value: 0,
                  label: '申请实习',
                },
                {
                  value: 1,
                  label: '更换岗位',
                },
                {
                  value: 2,
                  label: '终止实习',
                },
                {
                  value: 3,
                  label: '请假',
                },
                {
                  value: 4,
                  label: '延迟实习时间',
                }
              ]}

              width="xl"
              label="申请类型"
              placeholder="请选择申请类型"
              rules={[{ required: true, message: '请选择类型' }]}
            />

            <ProFormDependency name={['applyType']}>
              {({applyType})=>{
                if(applyType === 0 || applyType === 3 || applyType === 4){
                  return (
                    <ProFormDateRangePicker
                      fieldProps={{disabledDate:disabledDate}}
                      width="md"
                      name="dateRange"
                      label="起止时间"
                    />
                  )
                }
              }}

            </ProFormDependency>


        <ProFormDependency name={['applyType']}>
          {({applyType})=>{
            if(applyType === 0 || applyType === 1){
              return (
                <ProFormSelect
                  name="job"
                  mode="single"
                  options={[
                    {
                      value: 0,
                      label: '百度',
                    },
                    {
                      value: 1,
                      label: '京东',
                    },
                    {
                      value: 2,
                      label: '阿里',
                    },
                    {
                      value: 3,
                      label: '美团',
                    },
                    {
                      value: 4,
                      label: '其他',
                    }
                  ]}
                  width="xl"
                  label="实习岗位"
                  placeholder="请选择实习岗位"
                  rules={[{ required: true, message: '请选择类型' }]}
                />
              )
            }
          }}
        </ProFormDependency>






            <ProFormTextArea
              name="applyDetail"
              label="详情"
              width="xl"
              placeholder="请输入详细情况"
              rules={[
                {
                  required: false,
                  message: "请输入详细情况！",
                },
              ]}
            />

      </ProForm>
  );
};

export default ApplyForm;
