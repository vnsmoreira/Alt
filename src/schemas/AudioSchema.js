export default {
  name: 'Audio',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', indexed: true },
    title: 'string',
    duration: 'string',
    author: 'string',
    thumbnailUri: 'string',
    uri: 'string',
  },
};
