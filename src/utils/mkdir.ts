import { $ } from 'execa';

export async function mkdir(path: string) {
  await $`mkdir ${path}`;
}
