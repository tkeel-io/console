import styled from '@emotion/styled';

export const PluginListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Book = styled.img`
  width: 16px;
  margin-left: 19px;
  cursor: pointer;
`;

export const ModuleName = styled.span`
  color: #2d3748;
  font-weight: 600;
  font-size: 14px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;
  background-color: #fff;
`;

export const Category = styled.div`
  width: 220px;
  padding-top: 19px;
  border-right: 1px solid #e2e8f0;
`;

export const List = styled.div`
  flex: 1;
`;
