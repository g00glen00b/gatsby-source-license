import {getLicenses} from './utils/license-utils';

export async function sourceNodes({actions: {createNode}, createNodeId, createContentDigest}, options) {
  const results = await getLicenses(__dirname, options);
  return results.map(fieldData => createNode({
    ...fieldData,
    id: createNodeId(fieldData.label),
    internal: {
      type: `SoftwareLicenseLibrary`,
      contentDigest: createContentDigest(fieldData)
    }
  }));
}

