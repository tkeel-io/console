import { Empty } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { WarningTwoToneIcon } from '@tkeel/console-icons';

const textStyle = {
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '24px',
  color: 'gray.800',
};

function CustomEmpty() {
  const warningColor = useColor('white');
  const warnTwoToneColor = useColor('grayAlternatives.200');

  return (
    <Empty
      image={
        <WarningTwoToneIcon
          size="32px"
          color={warningColor}
          twoToneColor={warnTwoToneColor}
        />
      }
      title="设备处于离线状态"
      description="详情为空,请重试连接"
      styles={{
        title: {
          mt: '12px',
          ...textStyle,
        },
        description: textStyle,
        wrapper: {
          h: '30%',
        },
      }}
    />
  );
}

export default CustomEmpty;
