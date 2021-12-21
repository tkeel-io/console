export default {
  global: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      fontSize: '100%',
      border: 0,
    },

    body: {
      '& > #root': {
        // height: '100vh',
      },
    },

    img: {
      maxWidth: '100%',
      verticalAlign: 'middle',
    },

    'ol, li': {
      listStyle: 'none',
    },

    table: {
      borderCollapse: 'collapse',
    },
  },
};
