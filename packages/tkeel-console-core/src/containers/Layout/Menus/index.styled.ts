import styled from '@emotion/styled';

export const LayoutMenus = styled.div`
  width: 250px;
  background-color: #f7fafc;
  border: 1px solid #eee;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 92px;
  padding-left: 24px;
  border-bottom: 1px solid #e2e8f0;

  img {
    width: 27px;
  }
`;

export const Title = styled.h1`
  margin-left: 10px;
  font-weight: bold;
  font-size: 48px;
  font-size: 18px;
`;

export const List = styled.div`
  padding: 24px;

  a {
    display: block;
    display: flex;
    align-items: center;
    height: 48px;
    margin-bottom: 4px;
    padding-left: 22px;

    &.active {
      color: #fff;
      background-color: #2d3748;
      border-radius: 4px;
      box-shadow: 0 20px 25px -5px rgb(113 128 150 / 10%),
        0 10px 10px -5px rgb(113 128 150 / 4%);
    }
  }
`;
