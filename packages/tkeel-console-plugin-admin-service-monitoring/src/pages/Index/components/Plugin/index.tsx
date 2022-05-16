import {
  // Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  // Flex,
  Text,
} from '@chakra-ui/react';

import type { Plugin as PluginData } from '@/tkeel-console-plugin-admin-service-monitoring/hooks/queries/useMonitorPluginsQuery';

interface Props {
  data: PluginData;
}

export default function Plugin({ data }: Props) {
  return (
    <AccordionItem border="0">
      <AccordionButton
        border="1px solid"
        borderColor="grayAlternatives.100"
        borderRadius="4px"
        padding="16px 24px"
        backgroundColor="white"
        _hover={{
          '&': {
            borderColor: 'gray.700',
            backgroundColor: 'gray.50',
          },
        }}
        _focus={{ '&': { boxShadow: 'none' } }}
        _expanded={{
          '&': {
            borderColor: 'gray.700',
            boxShadow:
              '0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05)',
          },
        }}
      >
        <Text flex="1" textAlign="left">
          {data.metadata.name}
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        marginTop="12px"
        padding="16px 20px"
        border="1px solid"
        borderColor="grayAlternatives.100"
        borderRadius="4px"
        backgroundColor="gary.50"
      >
        content
      </AccordionPanel>
    </AccordionItem>
  );
}
