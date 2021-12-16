export default {
  global: {
    html: {
      fontSize: '16px',
    },

    body: {
      '& > #root': {
        height: '100%',
      },
    },

    'ol, li': {
      listStyle: 'none',
    },

    a: {
      _hover: {
        textDecoration: 'none!important',
      },
    },
  },
};
