import { Box, ColorHues, Flex } from '@chakra-ui/react';

type Props = {
  brand: ColorHues;
  primary: string;
};

export default function ColorsBlock({ brand, primary }: Props) {
  return (
    <Flex flexDirection="column">
      <Flex>
        {Object.entries(brand).map(([key, value], i) => (
          <Box
            key={key}
            width="80px"
            height="80px"
            backgroundColor={value as string}
          >
            {i === 0 ? 50 : 100 * i}
          </Box>
        ))}
      </Flex>
      <Box
        marginLeft="400px"
        width="80px"
        height="80px"
        backgroundColor={primary}
      >
        primary
      </Box>
    </Flex>
  );
}
