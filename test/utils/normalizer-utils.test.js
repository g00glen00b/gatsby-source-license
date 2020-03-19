import {getLicenseInfo} from '../../src/utils/normalizer-utils';

test('getLicenseInfo uses name and version from package info', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    license: 'MIT',
    repository: {url: 'https://github.com/g00glen00b/gatsby-source-license'}
  });

  expect(info.name).toBe('gatsby-source-license');
  expect(info.version).toBe('0.0.1');
});

test('getLicenseInfo combines name and version into its label', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    license: 'MIT',
    repository: {url: 'https://github.com/g00glen00b/gatsby-source-license'}
  });

  expect(info.label).toBe('gatsby-source-license@0.0.1');
});

test('getLicenseInfo uses license from package info', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    license: 'MIT',
    repository: {url: 'https://github.com/g00glen00b/gatsby-source-license'}
  });

  expect(info.license).toBe('MIT');
});

test('getLicenseInfo uses license from package info license object', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    license: {type: 'MIT'},
    repository: {url: 'https://github.com/g00glen00b/gatsby-source-license'}
  });

  expect(info.license).toBe('MIT');
});

test('getLicenseInfo uses unknown license if not given', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    repository: {url: 'https://github.com/g00glen00b/gatsby-source-license'}
  });

  expect(info.license).toBe('UNKNOWN');
});

test('getLicenseInfo uses https repository URL', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    repository: {url: 'https://github.com/g00glen00b/gatsby-source-license'}
  });

  expect(info.url).toBe('https://github.com/g00glen00b/gatsby-source-license');
});

test('getLicenseInfo uses https repository URL if git is also included', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    repository: {url: 'git+https://github.com/g00glen00b/gatsby-source-license.git'}
  });

  expect(info.url).toBe('https://github.com/g00glen00b/gatsby-source-license');
});

test('getLicenseInfo uses SSH based URL if given', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    repository: {url: 'git+ssh://git@github.com/g00glen00b/gatsby-source-license.git'}
  });

  expect(info.url).toBe('https://github.com/g00glen00b/gatsby-source-license');
});

test('getLicenseInfo uses GitHub based URL if given', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    repository: {url: 'github.com:g00glen00b/gatsby-source-license'}
  });

  expect(info.url).toBe('https://github.com/g00glen00b/gatsby-source-license');
});

test('getLicenseInfo uses no URL if it cannot be parsed', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1',
    repository: {url: 'some random gibberish'}
  });

  expect(info.url).toBe(null);
});

test('getLicenseInfo uses no URL if not given', () => {
  const info = getLicenseInfo({
    name: 'gatsby-source-license',
    version: '0.0.1'
  });

  expect(info.url).toBe(null);
});
