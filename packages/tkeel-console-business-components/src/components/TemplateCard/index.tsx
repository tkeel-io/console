import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactElement, ReactNode } from 'react';
// import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { MoreAction } from '@tkeel/console-components';

type Props = {
  icon: ReactNode;
  title: ReactNode | string;
  description: ReactNode | string;
  navigateUrl: string;
  buttons?: ReactElement[];
  footer: { name: string; value: string }[];
  styles?: {
    wrapper?: StyleProps;
  };
};

function TemplateCard({
  icon,
  title,
  description,
  navigateUrl,
  buttons,
  footer,
  styles,
}: Props) {
  const navigate = useNavigate();

  return (
    <Box
      borderRadius="4px"
      background="gray.50"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="grayAlternatives.50"
      height="118px"
      bg="white"
      {...styles?.wrapper}
    >
      <Flex height="76px" flexDir="column" padding="0 20">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex
            alignItems="center"
            onClick={() => {
              navigate(navigateUrl);
            }}
            style={{ cursor: 'pointer' }}
          >
            {icon}
            <Text lineHeight="50px" ml="12px" isTruncated width="30vw">
              {title}
            </Text>
          </Flex>

          <Flex>
            <Box ml="6px">
              {buttons && (
                <MoreAction
                  buttons={buttons}
                  styles={{ actionList: { width: '140px' } }}
                />
              )}
            </Box>
          </Flex>
        </Flex>

        <Text color="grayAlternatives.300" fontSize="12px" isTruncated>
          {description}
        </Text>
      </Flex>
      <Flex
        height="40px"
        alignItems="center"
        fontSize="12px"
        borderRadius="0 0 4px 4px"
        padding="0 20"
      >
        {footer.map((item, index) => {
          return (
            <Box key={item.name} ml={index === 0 ? '0' : '40px'}>
              {item.name}：<Text display="inline">{item.value}</Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}

export default TemplateCard;
