#!/usr/bin/env node

import { cli } from 'cleye';

import * as pkg from '../package.json';
import { downloadFromUrl } from './download-from-url';

const argv = cli({
  name: 'ghget',

  version: pkg.version,

  parameters: ['<url>'],

  flags: {},

  help: {
    description: pkg.description,
    examples: ['ghget https://github.com/bisquit/ghget-cli/tree/main/sample'],
  },
});

const url = argv._.url;
downloadFromUrl(url);
