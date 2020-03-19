test('sourceNodes creates node', async () => {
  const licenseInfo = {name: 'fixture-1', version: '1.0.0', label: 'fixture-1@1.0.0'};
  const getLicenses = jest.fn(() => Promise.resolve([licenseInfo]));
  const createNode = jest.fn(node => ({node}));
  const createNodeId = jest.fn(id => `id_${id}`);
  const createContentDigest = jest.fn(({label}) => `digest_${label}`);
  jest.doMock('../src/utils/license-utils', () => ({getLicenses}));
  const {sourceNodes} = require('../src/gatsby-node');

  const results = await sourceNodes({actions: {createNode}, createNodeId, createContentDigest});

  expect(results.length).toBe(1);
  expect(results).toContainEqual({
    node: {
      name: 'fixture-1',
      version: '1.0.0',
      label: 'fixture-1@1.0.0',
      id: 'id_fixture-1@1.0.0',
      internal: {
        type: 'SoftwareLicenseLibrary',
        contentDigest: 'digest_fixture-1@1.0.0'
      }
    }
  });
});
