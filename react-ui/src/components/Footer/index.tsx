import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'powered by myself',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={false}
      links={[
        {
          key: 'Aemon',
          title: 'Peking University',
          //href: 'https://aemon.cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/lovElaina',
          blankTarget: true,
        },
        {
          key: 'Zhang Yichen',
          title: 'Zhang Yichen',
          //href: 'https://aemon.cn',
          blankTarget: true,
        },
      ]}
    />
  );
};
