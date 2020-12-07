const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext)

const svg = require.context('@/assets/icons', false, /\.svg$/)

requireAll(svg)
