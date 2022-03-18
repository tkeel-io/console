import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import './index.scss';

import Ace from 'react-ace';

type Props = {
  language?: 'json' | 'yaml' | 'sql';
  theme?: 'dark' | 'light';
  width?: string;
  height?: string;
  value?: string;
  readOnly?: boolean;
  highlightGutterLine?: boolean;
  highlightActiveLine?: boolean;
  showPrintMargin?: boolean;
  options?: {
    highlightGutterLine?: boolean;
    showFoldWidgets?: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: string, event?: any) => void;
};

export default function AceEditor({
  language = 'json',
  theme = 'dark',
  width = '100%',
  height = '100%',
  value = '',
  readOnly = true,
  highlightActiveLine,
  showPrintMargin = false,
  options,
  onChange,
}: Props) {
  return (
    <Ace
      mode={language}
      theme={theme === 'dark' ? 'dracula' : 'github'}
      className="ace-editor"
      name="ace-editor"
      width={width}
      height={height}
      value={value}
      readOnly={readOnly}
      highlightActiveLine={highlightActiveLine || !readOnly}
      showPrintMargin={showPrintMargin}
      setOptions={{
        highlightGutterLine: options?.highlightGutterLine ?? !readOnly,
        showFoldWidgets: options?.showFoldWidgets ?? !readOnly,
      }}
      onChange={onChange}
      editorProps={{ $blockScrolling: true }}
    />
  );
}
