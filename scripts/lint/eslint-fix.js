#!/usr/bin/env node

const { runESLintAllFiles } = require('./exec');

runESLintAllFiles({ isFix: true });
