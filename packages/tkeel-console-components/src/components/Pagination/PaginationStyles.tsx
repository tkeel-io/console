import { css, Global } from '@emotion/react';

import { useColor } from '@tkeel/console-hooks';

export default function PaginationStyles() {
  const primaryColor = useColor('primary');
  const white = useColor('white');
  const itemBorderColor = useColor('gray.300');

  const globalStyles = css`
    .rc-pagination {
      display: flex;
      align-items: center;
      list-style: none;

      li:not(.rc-pagination-options) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 8px;
        }
      }

      .rc-pagination-jump-prev,
      .rc-pagination-jump-next {
        padding-bottom: 8px;
        font-weight: 600;
      }

      .rc-pagination-item {
        font-size: 12px;
        border: 1px solid ${itemBorderColor};
        border-radius: 3px;

        &.rc-pagination-item-active {
          border: none;
          color: ${white};
          background-color: ${primaryColor};
        }
      }
    }
  `;

  return <Global styles={globalStyles} />;
}
