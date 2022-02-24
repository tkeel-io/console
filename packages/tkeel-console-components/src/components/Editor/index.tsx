import { Box, Theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import MonacoEditor from '@monaco-editor/react';

import registerCompletion from './registerCompletion';

const Wrapper = styled(Box)`
  .vs {
    .margin,
    .lines-content {
      background-color: ${({ theme }) => (theme as Theme).colors.gray['50']};
    }

    .margin {
      width: 35px;
    }

    .margin-view-overlays {
      .line-numbers {
        width: 100%;
        color: ${({ theme }) => (theme as Theme).colors.gray['500']};
        text-align: center;
      }
    }
  }

  .vs-dark {
    .margin-view-overlays,
    .monaco-scrollable-element,
    .lines-content {
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
