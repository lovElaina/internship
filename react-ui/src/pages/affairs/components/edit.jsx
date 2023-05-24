import React, {useEffect, useState} from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormTreeSelect, ProForm, ProFormDependency
} from '@ant-design/pro-form';
import {Form, Modal, Row, Col, message} from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import {ProFormDateRangePicker} from "@ant-design/pro-components";
import dayjs from "dayjs";

import {addApply} from "@/pages/affairs/service";

/**
 * 添加申请
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addApply({ ...fields });
    hide();
    if (resp.code === 200) {
      message.success('添加成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


const ApplyForm = (props) => {
  const [form] = Form.useForm();

  const formRef = React.useRef();

  const [userId, setUserId] = useState('');

  const {posts,stuInfo,actionRef} = props;

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
      <ProForm formRef={formRef}  form={form}
               onFinish={async (values) =>{
        let success = false;
        values.startTime = Date.parse(values.dateRange[0]);
        values.endTime = Date.parse(values.dateRange[1]);
        values.applyTime = Date.now();
        values.stuId = stuInfo.resId;
        values.applyRole = "0"
        values.applyStatus = "0"
        success = await handleAdd(values);
        if (success) {
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
        console.log(values)
      }} >


            <ProFormSelect
              name="applyType"
              mode="single"
              options={[
                {
                  value: 0,
                  label: '开始实习',
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
                  label: '延长实习时间',
                },
                {
                  value: 5,
                  label: '成绩复核',
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
                  name="postId"
                  mode="single"
                  options={posts}
                  width="xl"
                  label="实习岗位"
                  placeholder="请选择实习岗位"
                  rules={[{ required: true, message: '请选择实习岗位' }]}
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
