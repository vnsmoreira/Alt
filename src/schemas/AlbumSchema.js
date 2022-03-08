export default {
  name: 'Album',
  primaryKey: 'id',
  properties: {
    id: { type: 'uuid', indexed: true },
    name: 'string',
    audioList: 'string[]',
  },
};
