#!/usr/bin/env node

const { runESLintAllFiles } = require('./exec');

const results = runESLintAllFiles({ isFix: true });

if (results.length > 0) {
  process.exit(1);
}
