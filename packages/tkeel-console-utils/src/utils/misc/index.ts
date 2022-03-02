export function isEnvDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function isEnvProduction() {
  return process.env.NODE_ENV === 'production';
}
