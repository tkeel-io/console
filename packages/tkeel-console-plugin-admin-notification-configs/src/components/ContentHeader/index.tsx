import { Heading } from '@chakra-ui/react';

interface Props {
  title: string;
}

export default function ContentHeader({ title }: Props) {
  return (
    <Heading
      paddingBottom="12px"
      lineHeight="32px"
      fontWeight="600"
      fontSize="16px"
      color="gray.800"
    >
      {title}
    </Heading>
  );
}
