import { Box, Theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import MonacoEditor from '@monaco-editor/react';

import registerCompletion from './registerCompletion';

const Wrapper = styled(Box)`
  .vs {
    min-height: 18px !important;

    .margin,
    .lines-content {
      background-color: ${({ theme }) => (theme as Theme).colors.gray['50']};
    }

    .decorationsOverviewRuler {
      display: none;
    }

    .margin {
      width: 35px !important;

      .margin-view-overlays {
        width: 35px !important;
        background-color: ${({ theme }) => (theme as Theme).colors.gray['100']};

        .line-numbers {
          width: 100% !important;
          padding-right: 14px;
          color: ${({ theme }) => (theme as Theme).colors.gray['500']};
        }
      }
    }

    .monaco-scrollable-element {
      left: 35px !important;

      .slider {
        width: 8px;
        border-radius: 10px;
        background-color: ${({ theme }) => (theme as Theme).colors.gray['300']};
      }
    }
  }

  .vs-dark {
    .margin,
    .monaco-scrollable-element,
    .lines-content {
      padding-top: 8px;

      background-color: ${({ theme }) => (theme as Theme).colors.gray['800']};
    }
  }
`;

type Props = {
  theme?: 'vs-dark' | 'light';
  language: string;
  value: string;
  width: string;
  height: string;
  readOnly?: boolean;
};

function Editor({
  theme = 'vs-dark',
  language,
  value,
  width,
  height,
  readOnly = false,
}: Props) {
  return (
    <Wrapper>
      <MonacoEditor
        theme={theme}
        defaultLanguage={language}
        // defaultValue={value}
        value={value}
        options={{
          readOnly,
          minimap: {
            enabled: false,
          },
          quickSuggestions: { other: true, strings: true },
          scrollBeyondLastLine: false,
          folding: !readOnly,
          tabSize: 2,
        }}
        beforeMount={(monacoInstance) => {
          registerCompletion({
            monacoInstance,
            language,
          });
          // handleEditorWillMount(monacoInstance);
        }}
        width={width}
        height={height}
      />
    </Wrapper>
  );
}

export default Editor;
