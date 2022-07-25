const oopPath = 'ace/lib/oop';
const ruleqlPath = 'ace/mode/ruleql';

/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable consistent-return */

ace.define(
  'ace/mode/ruleql_highlight_rules',
  ['require', 'exports', 'module', oopPath, 'ace/mode/text_highlight_rules'],
  function (require, exports) {
    const oop = require('../lib/oop');
    const { TextHighlightRules } = require('./text_highlight_rules');
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const SqlHighlightRules = function () {
      const keywords = 'select|from|where|and|or|when|then|else|end|test';

      const builtinConstants = 'true|false';

      const builtinFunctions =
        'updateTime|startswith|newuuid|rand|tan|upper|' +
        'asin|concat|sin|tanh|deviceid|timeFormat|floor|' +
        'lower|sinh|topic|messageId|userid|exp|power|ruleBody|' +
        'timestamp|abs|acos|cosh|deviceName|mod|substring|ruleId|' +
        'endswith|replace|str|deviceId|cos|log|to_base64|';

      const dataTypes = '';

      const keywordMapper = this.createKeywordMapper(
        {
          'support.function': builtinFunctions,
          keyword: keywords,
          'constant.language': builtinConstants,
          'storage.type': dataTypes,
        },
        'identifier',
        true
      );

      this.$rules = {
        start: [
          {
            token: 'comment',
            regex: '--.*$',
          },
          {
            token: 'comment',
            start: '/\\*',
            end: '\\*/',
          },
          {
            token: 'string', // " string
            regex: '".*?"',
          },
          {
            token: 'string', // ' string
            regex: "'.*?'",
          },
          {
            token: 'string', // ` string (apache drill)
            regex: '`.*?`',
          },
          {
            token: 'constant.numeric', // float
            regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b',
          },
          {
            token: keywordMapper,
            regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b',
          },
          {
            token: 'keyword.operator',
            regex:
              '\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|=',
          },
          {
            token: 'paren.lparen',
            regex: '[\\(]',
          },
          {
            token: 'paren.rparen',
            regex: '[\\)]',
          },
          {
            token: 'text',
            regex: '\\s+',
          },
        ],
      };
      this.normalizeRules();
    };

    oop.inherits(SqlHighlightRules, TextHighlightRules);

    exports.SqlHighlightRules = SqlHighlightRules;
  }
);

ace.define(
  'ace/mode/folding/cstyle',
  [
    'require',
    'exports',
    'module',
    oopPath,
    'ace/range',
    'ace/mode/folding/fold_mode',
  ],
  function (require, exports) {
    const oop = require('../../lib/oop');
    const { Range } = require('../../range');
    const BaseFoldMode = require('./fold_mode').FoldMode;

    // eslint-disable-next-line no-multi-assign
    const FoldMode = (exports.FoldMode = function (commentRegex) {
      if (commentRegex) {
        this.foldingStartMarker = new RegExp(
          this.foldingStartMarker.source.replace(
            /\|[^|]*?$/,
            `|${commentRegex.start}`
          )
        );
        this.foldingStopMarker = new RegExp(
          this.foldingStopMarker.source.replace(
            /\|[^|]*?$/,
            `|${commentRegex.end}`
          )
        );
      }
    });
    oop.inherits(FoldMode, BaseFoldMode);

    // eslint-disable-next-line sonarjs/cognitive-complexity
    (function () {
      /* eslint-disable no-useless-escape */
      this.foldingStartMarker = /([([{])[^)\]}]*$|^\s*(\/\*)/;
      this.foldingStopMarker = /^[^([{]*([)\]}])|^[\s*]*(\*\/)/;
      this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
      this.tripleStarBlockCommentRe = /^\s*(\/\*{3}).*\*\/\s*$/;
      /* eslint-enable no-useless-escape */
      this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
      // eslint-disable-next-line no-underscore-dangle
      this._getFoldWidgetBase = this.getFoldWidget;
      this.getFoldWidget = function (session, foldStyle, row) {
        const line = session.getLine(row);

        if (
          this.singleLineBlockCommentRe.test(line) &&
          !this.startRegionRe.test(line) &&
          !this.tripleStarBlockCommentRe.test(line)
        ) {
          return '';
        }

        // eslint-disable-next-line no-underscore-dangle
        const fw = this._getFoldWidgetBase(session, foldStyle, row);

        if (!fw && this.startRegionRe.test(line)) return 'start'; // lineCommentRegionStart

        return fw;
      };

      this.getFoldWidgetRange = function (
        session,
        foldStyle,
        row,
        forceMultiline
      ) {
        const line = session.getLine(row);

        if (this.startRegionRe.test(line))
          return this.getCommentRegionBlock(session, line, row);

        const match = line.match(this.foldingStartMarker);
        if (match) {
          const i = match.index;

          if (match[1])
            return this.openingBracketBlock(session, match[1], row, i);

          let range = session.getCommentFoldRange(row, i + match[0].length, 1);

          if (range && !range.isMultiLine()) {
            if (forceMultiline) {
              range = this.getSectionRange(session, row);
            } else if (foldStyle !== 'all') range = null;
          }

          return range;
        }

        if (foldStyle === 'markbegin') {
          return;
        }

        const stopMatch = line.match(this.foldingStopMarker);
        if (stopMatch) {
          const i = stopMatch.index + stopMatch[0].length;

          if (stopMatch[1])
            return this.closingBracketBlock(session, stopMatch[1], row, i);

          return session.getCommentFoldRange(row, i, -1);
        }
      };

      this.getSectionRange = function (session, row) {
        let line = session.getLine(row);
        const startIndent = line.search(/\S/);
        const startRow = row;
        const startColumn = line.length;

        row += 1;
        let endRow = row;
        const maxRow = session.getLength();
        /* eslint-disable no-plusplus */
        while (++row < maxRow) {
          line = session.getLine(row);
          const indent = line.search(/\S/);
          // eslint-disable-next-line no-continue
          if (indent === -1) continue;
          if (startIndent > indent) break;
          const subRange = this.getFoldWidgetRange(session, 'all', row);

          if (subRange) {
            if (subRange.start.row <= startRow) {
              break;
            } else if (subRange.isMultiLine()) {
              row = subRange.end.row;
            } else if (startIndent === indent) {
              break;
            }
          }
          endRow = row;
        }

        return new Range(
          startRow,
          startColumn,
          endRow,
          session.getLine(endRow).length
        );
      };

      this.getCommentRegionBlock = function (session, line, row) {
        const startColumn = line.search(/\s*$/);
        const maxRow = session.getLength();
        const startRow = row;

        const re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        let depth = 1;
        while (++row < maxRow) {
          line = session.getLine(row);
          const m = re.exec(line);
          // eslint-disable-next-line no-continue
          if (!m) continue;
          if (m[1]) depth--;
          else depth++;
          /* eslint-enable no-plusplus */

          if (!depth) break;
        }

        const endRow = row;
        if (endRow > startRow) {
          return new Range(startRow, startColumn, endRow, line.length);
        }
      };
    }.call(FoldMode.prototype));
  }
);

ace.define(
  'ace/mode/folding/ruleql',
  ['require', 'exports', 'module', oopPath, 'ace/mode/folding/cstyle'],
  function (require, exports) {
    const oop = require('../../lib/oop');
    const BaseFoldMode = require('./cstyle').FoldMode;
    // eslint-disable-next-line no-multi-assign
    const FoldMode = (exports.FoldMode = function () {});

    oop.inherits(FoldMode, BaseFoldMode);

    (function () {}.call(FoldMode.prototype));
  }
);

ace.define(
  ruleqlPath,
  [
    'require',
    'exports',
    'module',
    oopPath,
    'ace/mode/text',
    'ace/mode/ruleql_highlight_rules',
    'ace/mode/folding/ruleql',
  ],
  function (require, exports) {
    const oop = require('../lib/oop');
    const TextMode = require('./text').Mode;
    const { SqlHighlightRules } = require('./ruleql_highlight_rules');
    const SqlFoldMode = require('./folding/ruleql').FoldMode;

    const Mode = function () {
      this.HighlightRules = SqlHighlightRules;
      this.foldingRules = new SqlFoldMode();
      this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);

    (function () {
      this.lineCommentStart = '--';
      this.blockComment = { start: '/*', end: '*/' };

      this.$id = ruleqlPath;
      this.snippetFileId = 'ace/snippets/ruleql';
    }.call(Mode.prototype));

    exports.Mode = Mode;
  }
);

(function () {
  ace.require([ruleqlPath], function (m) {
    if (typeof module === 'object' && typeof exports === 'object' && module) {
      module.exports = m;
    }
  });
})();

/* eslint-enable no-undef */
/* eslint-enable import/extensions */
/* eslint-enable import/no-unresolved */
/* eslint-enable no-param-reassign */
/* eslint-enable func-names */
/* eslint-enable consistent-return */
