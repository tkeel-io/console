import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';

const SelectWrapper = styled(Select)`
  height: 32px;
  padding-left: unset;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
  border: unset;

  &:focus {
    box-shadow: none;
  }
`;

export default SelectWrapper;
