import { Link } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const LayoutMenus = styled.div`
  width: 250px;
  border: 1px solid #eee;
  background-color: #f7fafc;
`;

export const TitleWrapper = styled.div`
  height: 92px;
  display: flex;
  padding-left: 24px;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
`;

export const Title = styled.h1`
  margin-left: 10px;
  color: #2d3748;
  font-size: 18px;
  font-weight: bold;
`;

export const List = styled.div`
  padding: 24px;
`;

export const Item = styled(Link)`
  padding-left: 22px;
  margin-bottom: 4px;
  height: 48px;
  display: flex;
  align-items: center;
  color: #718096;
  font-weight: 500;

  &.active {
    color: #fff;
    background-color: #2d3748;
    box-shadow: 0px 20px 25px -5px rgba(113, 128, 150, 0.1),
      0px 10px 10px -5px rgba(113, 128, 150, 0.04);
    border-radius: 4px;
  }
`;
