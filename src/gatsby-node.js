import {getLicenses} from './utils/license-utils';
import {sep} from 'path';

export async function sourceNodes({actions: {createNode}, createNodeId, createContentDigest}, options) {
  const results = await getLicenses(`${__dirname}${sep}..${sep}..${sep}`, options);
  return results.map(fieldData => createNode({
    ...fieldData,
    id: createNodeId(fieldData.label),
    internal: {
      type: `SoftwareLicenseLibrary`,
      contentDigest: createContentDigest(fieldData)
    }
  }));
}

