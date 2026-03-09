import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'do4k1nvo',
    dataset: 'production'
  },
  studioHost: 'guruvells',
  autoUpdates: false,
});
