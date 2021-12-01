import styled from '@emotion/styled';

export const PluginListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Book = styled.img`
  margin-left: 19px;
  width: 16px;
  cursor: pointer;
`;

export const ModuleName = styled.span`
  color: #2d3748;
  font-size: 14px;
  font-weight: 600;
`;

export const Content = styled.div`
  margin-top: 20px;
  flex: 1;
  display: flex;
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
