export default {
  parts: ['tablist', 'tab'],
  baseStyle: {
    tablist: {
      width: 'max-content',
      padding: '4px',
      borderRadius: '30px',
      bg: '#eff4f9',
      border: '1px solid #e3e9ef',
    },
    tab: {
      borderRadius: '29px',
      _selected: {
        color: '#fff',
        bg: '#242E42',
        boxShadow: 'none',
        border: 'none',
      },
    },
  },
  defaultProps: {
    size: 'sm',
  },
};
