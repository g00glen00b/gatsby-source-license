import {sep} from 'path';
import {
  getChildDependencyDirectories,
  getDependencyDirectory,
  isExisting,
  readPackage
} from '../../src/utils/file-reader-utils';

test('isExisting returns true for existing folders', async () => {
  const result = await isExisting(`.${sep}test${sep}fixtures`);
  expect(result).toBe(true);
});

test('isExisting returns false for non existing folders', async () => {
  const result = await isExisting(`.${sep}test${sep}does-not-exist`);
  expect(result).toBe(false);
});

test('readPackage returns package.json info', async () => {
  const result = await readPackage('./test/fixtures');
  expect(result.name).toBe('fixture-1');
  expect(result.version).toBe('1.0.0');
  expect(result.license).toBe('MIT');
  expect(result.repository.url).toBe('https://example.org');
  expect(result.dependencies).toEqual({'fixture-2': '1.0.0'});
  expect(result.devDependencies).toEqual({'fixture-3': '1.0.0'});
});

test('getDependencyDirectory returns relative directory to a dependency', async () => {
  const fixture2 = await getDependencyDirectory('fixture-2', `.${sep}test${sep}fixtures`);
  expect(fixture2).toBe(`.${sep}test${sep}fixtures${sep}node_modules${sep}fixture-2`);
});

test('getDependencyDirectory returns base directory to a dependency', async () => {
  const fixture2 = await getDependencyDirectory('fixture-4', `.${sep}test${sep}fixtures${sep}node_modules${sep}fixture-2`, `.${sep}test${sep}fixtures`);
  expect(fixture2).toBe(`.${sep}test${sep}fixtures${sep}node_modules${sep}fixture-4`);
});

test('getDependencyDirectory returns null if directory not found', async () => {
  const fixture2 = await getDependencyDirectory('does-not-exist', `.${sep}test${sep}fixtures`);
  expect(fixture2).toBe(null);
});

test('getChildDependencyDirectories returns all dependency folders when base directory is same', async () => {
  const results = await getChildDependencyDirectories(['fixture-2'], `.${sep}test${sep}fixtures`);
  expect(results).toContain(`.${sep}test${sep}fixtures${sep}node_modules${sep}fixture-2`);
});

test('getChildDependencyDirectories returns all dependency folders', async () => {
  const results = await getChildDependencyDirectories(['fixture-1', 'fixture-4', 'does-not-exist'], `.${sep}test${sep}fixtures${sep}node_modules${sep}fixture-2`, `.${sep}test${sep}fixtures`);
  expect(results).toContain(`.${sep}test${sep}fixtures${sep}node_modules${sep}fixture-2${sep}node_modules${sep}fixture-1`);
  expect(results).toContain(`.${sep}test${sep}fixtures${sep}node_modules${sep}fixture-4`);
  expect(results).toContain(null);
});
