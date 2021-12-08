const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  // eslint-disable-next-line unicorn/no-array-callback-reference
  requireContext.keys().map(requireContext);
const svgs = require.context('./svg', false, /\.svg$/);
requireAll(svgs);
