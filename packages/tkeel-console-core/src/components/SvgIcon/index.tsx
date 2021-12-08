import React from 'react';
import styled from '@emotion/styled';

type Props = {
  iconClass: string;
  width?: string;
  fill?: string;
};

type SvgProps = {
  width?: string;
};

const SvgWrapper = styled.svg<SvgProps>`
  display: inline-block;
  width: ${({ width }) => width};
  min-width: 14px;
  height: ${({ width }) => width};
  overflow: hidden;
  font-size: 14px;
`;

function SvgIcon({ iconClass, width, fill }: Props) {
  return (
    <SvgWrapper width={width}>
      <use
        xlinkHref={`#icon-${iconClass}`}
        width={width}
        height={width}
        fill={fill}
      />
    </SvgWrapper>
  );
}

SvgIcon.defaultProps = {
  width: '14px',
  fill: 'currentColor',
};

export default SvgIcon;
