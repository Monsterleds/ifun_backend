export default {
  jwt: {
    secret: process.env.APP_SECRET || '29889be7c33cf3e2a4afd8b6c89efb50',
    expiresIn: '1d',
  }
}