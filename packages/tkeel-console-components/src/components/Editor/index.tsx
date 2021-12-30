/* eslint-disable promise/always-return */
import React from 'react';
import { Box, Theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import MonacoEditor from '@monaco-editor/react';

// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import monokaiTheme from 'monaco-themes/themes/Monokai.json';
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
  width?: string;
  height?: string;
};

const defaultProps = {
  theme: 'vs-dark',
  width: '100%',
  height: '100%',
};

// const handleEditorWillMount = (monacoInstance: typeof monaco) => {
//   monacoInstance.editor.defineTheme('monokai', {
//     ...(monokaiTheme as monaco.editor.IStandaloneThemeData),
//   });
// };

function Editor({ theme, language, value, width, height }: Props) {
  return (
    <Wrapper>
      <MonacoEditor
        theme={theme}
        defaultLanguage={language}
        defaultValue={value}
        options={{
          minimap: {
            enabled: false,
          },
          quickSuggestions: { other: true, strings: true },
          scrollBeyondLastLine: false,
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
