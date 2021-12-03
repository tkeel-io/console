const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
const isEnvDevelopment = env === 'development';
const isEnvProduction = env === 'production';

module.exports = {
  env,
  isEnvDevelopment,
  isEnvProduction,
};
