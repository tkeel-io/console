import { css, Global } from '@emotion/react';

import { useColor } from '@tkeel/console-hooks';

export default function DateRangePickerStyles() {
  const primaryColor = useColor('primary');
  const primarySubColor = useColor('primarySub');
  const whiteColor = useColor('white');
  const redColor = useColor('red.300');
  const grayLight = useColor('gray.200');
  const grayDark = useColor('gray.700');
  const grayAlternatives = useColor('grayAlternatives300');

  const globalStyles = css`
    .rs-picker {
      .rs-picker-toggle {
        &,
        &:hover {
          border-color: ${grayLight} !important;
        }
      }

      .rs-picker-toggle-active {
        box-shadow: none !important;
      }

      .rs-picker-toggle-value {
        color: ${grayDark} !important;
      }
    }

    .rs-calendar-show-time-dropdown {
      .rs-calendar-header-title-time {
        color: ${primaryColor} !important;
      }

      .rs-calendar-time-dropdown-cell {
        &.rs-calendar-time-dropdown-cell-active {
          background-color: ${primaryColor} !important;
        }

        &:not(.rs-calendar-time-dropdown-cell-active):hover {
          color: ${primaryColor} !important;
          background-color: ${primarySubColor} !important;
        }
      }
    }

    .rs-calendar-show-month-dropdown .rs-calendar-header-title-date,
    .rs-calendar-month-dropdown-year-active {
      color: ${primaryColor} !important;
    }

    .rs-calendar-header-error {
      color: ${redColor} !important;

      &:hover,
      &:focus {
        color: ${whiteColor} !important;
        background-color: ${redColor} !important;
      }
    }

    .rs-calendar {
      width: 246px;

      .rs-calendar-table-cell-selected .rs-calendar-table-cell-content {
        background-color: ${primaryColor} !important;
      }

      .rs-calendar-table-cell-is-today .rs-calendar-table-cell-content {
        box-shadow: inset 0 0 0 1px ${primaryColor};
      }

      .rs-calendar-month-dropdown-cell-active
        .rs-calendar-month-dropdown-cell-content {
        &:hover {
          color: ${whiteColor} !important;
        }

        background-color: ${primaryColor} !important;
      }

      .rs-calendar-table-cell-selected {
        &:hover .rs-calendar-table-cell-content,
        .rs-calendar-table-cell-content:hover,
        .rs-calendar-table-cell-day:hover {
          color: ${whiteColor} !important;
        }
      }

      .rs-calendar-table-cell:not(.rs-calendar-table-cell-selected):hover
        .rs-calendar-table-cell-content {
        color: ${primaryColor} !important;
        background-color: ${primarySubColor} !important;
      }

      .rs-calendar-table-cell:not(.rs-calendar-table-cell-selected) {
        .rs-calendar-table-cell-content:hover,
        .rs-calendar-table-cell-day:hover {
          color: ${primaryColor} !important;
          background-color: ${primarySubColor} !important;
        }
      }

      .rs-calendar-table-cell-in-range::before {
        background-color: ${primarySubColor} !important;
      }
    }

    .rs-picker-toolbar {
      .rs-picker-toolbar-ranges .rs-btn {
        color: ${grayAlternatives} !important;

        &:hover,
        &:focus {
          text-decoration: none;
        }
      }

      .rs-btn-primary {
        background-color: ${primaryColor} !important;
      }
    }
  `;

  return <Global styles={globalStyles} />;
}
