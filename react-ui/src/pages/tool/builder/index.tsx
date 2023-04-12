import { Card } from 'antd';
import WrapContent from '@/components/WrapContent';
import React from 'react';


export type FormBuilderProps = {};

const FormBuilder: React.FC<FormBuilderProps> = () => {
  return (
    <WrapContent>
      <Card title="Developing" />
    </WrapContent>
  );
};

export default FormBuilder;
