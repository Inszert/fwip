export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        credentials: {
          accessKeyId: env('CF_ACCESS_KEY_ID'),
          secretAccessKey: env('CF_SECRET_ACCESS_KEY'),
        },
        region: 'auto',
        endpoint: env('CF_ENDPOINT'),
        forcePathStyle: true,
        params: {
          Bucket: env('CF_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});