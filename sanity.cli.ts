import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'do4k1nvo',
    dataset: 'production'
  },
  studioHost: 'guruvells',
  deployment: {
    appId: 'lmrkpno2os2ktlli1xj0yi6t',
  },
  autoUpdates: false,
} as any);
