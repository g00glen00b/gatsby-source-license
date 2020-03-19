import {getLicenses} from '../../src/utils/license-utils';
import {sep} from 'path';

test('getLicenses returns all dependencies', async () => {
  const licenses = await getLicenses(`.${sep}test${sep}fixtures`, {});
  expect(licenses.length).toBe(3);
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-1@2.0.0'}));
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-2@1.0.0'}));
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-4@1.0.0'}));
});

test('getLicenses returns all dependencies including devDependencies', async () => {
  const licenses = await getLicenses(`.${sep}test${sep}fixtures`, {includeDevDependencies: true});
  expect(licenses.length).toBe(4);
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-1@2.0.0'}));
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-2@1.0.0'}));
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-3@1.0.0'}));
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-4@1.0.0'}));
});

test('getLicenses returns all dependencies including self', async () => {
  const licenses = await getLicenses(`.${sep}test${sep}fixtures`, {excludeSelf: false});
  expect(licenses.length).toBe(4);
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-1@2.0.0'}));
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-1@1.0.0'}));
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-2@1.0.0'}));
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-4@1.0.0'}));
});

test('getLicenses returns all dependencies limiting depth', async () => {
  const licenses = await getLicenses(`.${sep}test${sep}fixtures`, {depth: 2});
  expect(licenses.length).toBe(1);
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-2@1.0.0'}));
});

test('getLicenses returns all dependencies excluding chosen', async () => {
  const licenses = await getLicenses(`.${sep}test${sep}fixtures`, {excludeSelf: false, excludedDependencies: ['fixture-2@1.0.0']});
  expect(licenses.length).toBe(1);
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-1@1.0.0'}));
});

test('getLicenses returns only dev dependencies', async () => {
  const licenses = await getLicenses(`.${sep}test${sep}fixtures`, {includeDependencies: false, includeDevDependencies: true});
  expect(licenses.length).toBe(1);
  expect(licenses).toContainEqual(expect.objectContaining({label: 'fixture-3@1.0.0'}));
});
