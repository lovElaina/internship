import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl } from 'umi';


const DetailForm = (props) => {
  const [form] = Form.useForm();


  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({

      reportId:props.values.reportId,
      companyMark:props.values.companyMark === "0" ? "未批阅":"已批阅",
      companyComment:props.values.companyComment,
      companyGrade:props.values.companyGrade,
      tutorMark:props.values.tutorMark === "0" ? "未批阅":"已批阅",
      tutorComment:props.values.tutorComment,
      tutorGrade:props.values.tutorGrade,
      reportDate:props.values.reportDate ? new Date(props.values.reportDate).getFullYear()+"-"+(new Date(props.values.reportDate).getMonth()+1)+"-"+new Date(props.values.reportDate).getDate() : "无",
      reportStatus:props.values.reportStatus === "0" ? "按时提交":(props.values.reportStatus === "1" ? "迟交":"未提交"),

      reportType:props.values.reportType === "0" ? "日报" :(props.values.reportType === "1" ? "周报" : "月报"),
      reportTitle:props.values.reportTitle,
      reportText:props.values.reportText
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
      title='实习报告批阅'
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              readonly='true'
              name="reportTitle"
              label="标题"
              width="xl"
              //disabled
              //hidden={!props.values.postId}
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>

          <Col span={12} order={2}>
            <ProFormText
              readonly='true'
              name="reportDate"
              label="提交时间"
              width="xl"
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>

          <Col span={12} order={1}>
            <ProFormText
              readonly='true'
              name="reportStatus"
              label="状态"
              width="xl"
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>

          <Col span={12} order={2}>
            <ProFormText
              readonly='true'
              name="tutorMark"
              label="是否批阅"
              width="xl"
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>

        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              readonly='true'
              name="reportText"
              label="正文"
              width="xl"
              rules={[
                {
                  required: false,
                  message: "-",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormDigit
              name="tutorGrade"
              label="评分(1-100)"
              width="xl"
              min={1}
              max={100}
              rules={[
                {
                  required: true,
                  message: "请输入评分",
                },
              ]}
            />
          </Col>
        </Row>


        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              name="tutorComment"
              label="评语"
              width="xl"
              rules={[
                {
                  required: true,
                  message: "请输入评语",
                },
              ]}
            />
          </Col>
        </Row>


      </Form>
    </Modal>
  );
};

export default DetailForm;
