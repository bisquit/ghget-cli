#!/usr/bin/env node

import { cli } from 'cleye';

import * as pkg from '../package.json';
import { downloadFromUrl } from './download-from-url';

const argv = cli({
  name: 'rpget',

  version: pkg.version,

  parameters: ['<url>'],

  flags: {},

  help: {
    description: pkg.description,
    examples: ['rpget https://github.com/bisquit/rpget/tree/main/sample'],
  },
});

const url = argv._.url;
downloadFromUrl(url);
