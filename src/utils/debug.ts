import { log } from '@clack/prompts';

export function debugLog(message: string | Record<string, string>) {
  if (process.env.RPGET_MODE !== 'DEBUG') {
    return;
  }

  if (typeof message === 'string') {
    log.info(`[DEBUG] ${message}`);
  } else {
    log.info(
      '[DEBUG]\n' +
        Object.entries(message)
          .map(([key, value]) => `${key}: ${value}`)
          .join(`\n`)
    );
  }
}
