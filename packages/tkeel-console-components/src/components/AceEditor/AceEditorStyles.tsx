import { css, Global } from '@emotion/react';

import { useColor } from '@tkeel/console-hooks';

export default function AceEditorStyles() {
  const cellColor = useColor('gray.500');
  const darkThemeBackgroundColor = useColor('gray.800');
  const gutterBackgroundColor = useColor('gary.100');
  const lightThemeBackgroundColor = useColor('gray.50');

  const globalStyles = css`
    .ace-editor {
      border-radius: 4px;

      .ace_gutter-cell {
        padding: 0 12px;
        color: ${cellColor};
        text-align: center;
      }

      &.ace-dracula {
        .ace_gutter,
        .ace_content {
          background-color: ${darkThemeBackgroundColor};
        }
      }

      &.ace-github {
        .ace_gutter {
          background-color: ${gutterBackgroundColor};
        }

        .ace_content {
          background-color: ${lightThemeBackgroundColor};
        }
      }
    }
  `;

  return <Global styles={globalStyles} />;
}
