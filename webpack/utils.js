const staticDirectory = process.env.PORTAL_NAME
  ? `portal-${process.env.PORTAL_NAME}/`
  : '';

module.exports = { staticDirectory };
