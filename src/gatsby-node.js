import {getLicenses} from './utils/license-utils';

export async function sourceNodes({actions: {createNode}, createNodeId, createContentDigest}, options) {
  await getLicenses(__dirname, options);
}

