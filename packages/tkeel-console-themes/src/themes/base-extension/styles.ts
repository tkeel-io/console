export default {
  global: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      border: 0,
    },

    body: {
      '& > #root': {
        height: '100vh',
      },
    },

    'ol, li': {
      listStyle: 'none',
    },

    a: {
      textDecoration: 'none',

      _hover: {
        textDecoration: 'none',
      },
    },
  },
};
