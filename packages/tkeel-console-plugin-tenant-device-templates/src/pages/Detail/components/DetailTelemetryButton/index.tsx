import {
  Box,
  Circle,
  Flex,
  // Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Drawer, MoreActionButton } from '@tkeel/console-components';
import { BoxTwoToneIcon, PencilFilledIcon } from '@tkeel/console-icons';

// import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
// import { baseRequestData as FormValues } from '@tkeel/console-request-hooks';
import useTelemetryDetailQuery from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useTelemetryDetailQuery';

type Props = {
  uid: string;
  id: string;
};

export default function DetailTelemetryButton({ uid, id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const name = '123123';
  // const icon = "123123";
  const desc = '123123';

  const { data } = useTelemetryDetailQuery(uid, id);

  // eslint-disable-next-line no-console
  console.log('DetailTelemetryButton ~ data', data);
  // const handleConfirm = (formValues: FormValues) => {
  //   const { title, description } = formValues;
  //   if (formValues) {
  //     mutate({
  //       data: {
  //         title,
  //         description,
  //       },
  //     });
  //   }
  //   return null;
  // };

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon />}
        title="查看详情"
        onClick={() => {
          // eslint-disable-next-line no-console
          onOpen();
          // console.log('停用插件');
          // mutate({});
        }}
      />

      <Drawer title="插件详情" isOpen={isOpen} onClose={onClose}>
        <Box>
          <Flex
            padding="20px 0 20px 24px"
            borderBottomWidth="1px"
            borderBottomStyle="solid"
            borderBottomColor="grayAlternatives.50"
          >
            <Circle size="76px" backgroundColor="gray.50">
              <BoxTwoToneIcon size={32} />
            </Circle>
            <Box marginLeft="20px">
              <Text
                color="gray.800"
                fontSize="16px"
                fontWeight="500"
                lineHeight="22px"
              >
                {name}
              </Text>
              <Text
                margin="4px 0"
                height="24px"
                color="grayAlternatives.300"
                fontSize="12px"
                lineHeight="24px"
                isTruncated
                title={desc}
              >
                {desc}
              </Text>
              {/* {plugin?.tenant_enable ? (
                <DisableButton
                  pluginName={name}
                  refetchData={() => {
                    refetch();
                  }}
                />
              ) : (
                <EnableButton
                  pluginName={name}
                  refetchData={() => {
                    refetch();
                  }}
                />
              )} */}
            </Box>
          </Flex>
          {/* <Box padding="24px 24px">
            <InfoCard data={basicInfo} styles={infoCardStyles} />
            <DeveloperInfo
              data={maintainers}
              styles={{ infoCard: infoCardStyles }}
            />
          </Box> */}
        </Box>
      </Drawer>
    </>
  );
}
