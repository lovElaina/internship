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
      reportDate:props.values.reportDate ===null ? new Date(props.values.reportDate).getFullYear()+"-"+(new Date(props.values.reportDate).getMonth()+1)+"-"+new Date(props.values.reportDate).getDate() : "无",
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
      title='实习报告提交'
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
        </Row>



        {
          props.values.tutorMark === "1" ?
            <div>
            <Row gutter={[16, 16]}>
              <Col span={24} order={1}>
                <ProFormText
                  readonly='true'
                  name="tutorGrade"
                  label="导师评分"
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
                <ProFormText
                  readonly='true'
                  name="tutorComment"
                  label="导师评语"
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
            </div> : <div/>
        }


        {
          props.values.companyMark === "1" ?
            <div>
              <Row gutter={[16, 16]}>
                <Col span={24} order={1}>
                  <ProFormText
                    readonly='true'
                    name="companyGrade"
                    label="企业评分"
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
                  <ProFormText
                    readonly='true'
                    name="companyComment"
                    label="企业评语"
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
            </div> : <div/>
        }



        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormTextArea
              readonly={props.values.reportStatus !== "2"}
              fieldProps={
                {maxLength:1000,showCount:true,style:{height:400}}
              }
              showCount
              maxLength={100}
              name="reportText"
              label="正文"
              width="xl"
              rules={[
                {
                  required: true,
                  message: "请输入报告正文",
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
