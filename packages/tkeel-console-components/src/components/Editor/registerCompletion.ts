import { isArray, uniq } from 'lodash';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import * as languageObj from './basic-languages';

type Params = {
  monacoInstance: typeof monaco;
  language: string;
};

const registerCompletion = ({ monacoInstance, language }: Params) => {
  if (!['yaml', 'sql'].includes(language)) {
    return;
  }
  monacoInstance.languages.registerCompletionItemProvider(language, {
    provideCompletionItems: (model, position) => {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const match = textUntilPosition.match(/(\S+)$/);
      const suggestions: monaco.languages.CompletionItem[] = [];
      if (match) {
        const matchStr = match[0].toUpperCase();
        const languageInfo = languageObj[language].language;
        const { keywords, operators, builtinFunctions } = languageInfo;
        if (isArray(keywords)) {
          keywords.forEach((item: string) => {
            if (item.startsWith(matchStr)) {
              suggestions.push({
                label: item,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: item,
              } as monaco.languages.CompletionItem);
            }
          });
        }

        if (isArray(operators)) {
          operators.forEach((item: string) => {
            if (item.startsWith(matchStr)) {
              suggestions.push({
                label: item,
                kind: monaco.languages.CompletionItemKind.Operator,
                insertText: item,
              } as monaco.languages.CompletionItem);
            }
          });
        }

        if (isArray(builtinFunctions)) {
          builtinFunctions.forEach((item: string) => {
            if (item.startsWith(matchStr)) {
              suggestions.push({
                label: item,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: item,
              } as monaco.languages.CompletionItem);
            }
          });
        }
      }

      return {
        suggestions: uniq(suggestions),
      };
    },
  });
};

export default registerCompletion;
