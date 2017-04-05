export default {
  database: 'ssv-server',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: process.env.NODE_ENV ? 'test_ssv.sqlite' : 'ssv.sqlite',
    define: {
      underscored: true,
    },
  },
  jwtSecret: '$3cr3t',
  jetSession: { session: false },
};
