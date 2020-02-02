module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],

  lintOnSave: false,

  pluginOptions: {
    i18n: {
      locale: 'vn',
      fallbackLocale: 'vn',
      localeDir: 'translation',
      enableInSFC: true
    },
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'us-east-2',
      bucket: 'hcmus-lthd-19',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
}
