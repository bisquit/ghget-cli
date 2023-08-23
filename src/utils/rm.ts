import { deleteAsync } from 'del';

export async function rmrf(dist: string) {
  await deleteAsync(dist, { force: true });
}
