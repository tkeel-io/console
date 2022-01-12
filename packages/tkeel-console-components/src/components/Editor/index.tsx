import { Box, Theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import MonacoEditor from '@monaco-editor/react';

import registerCompletion from './registerCompletion';

const Wrapper = styled(Box)`
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

const defaultProps = {
  theme: 'vs-dark',
  readOnly: false,
};

function Editor({ theme, language, value, width, height, readOnly }: Props) {
  return (
    <Wrapper>
      <MonacoEditor
        theme={theme}
        defaultLanguage={language}
        defaultValue={value}
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

Editor.defaultProps = defaultProps;

export default Editor;
