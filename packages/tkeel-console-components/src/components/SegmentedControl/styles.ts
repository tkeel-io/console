import type { StyleProps } from '@chakra-ui/react';

export const root: StyleProps = {
  display: 'inline-flex',
  borderRadius: '16px',
  border: '1px solid',
  borderTopColor: 'gray.200',
  borderRightColor: 'gray.200',
  borderBottomColor: 'gray.200',
  borderLeftColor: 'gray.200',
  padding: '2px',
  backgroundColor: 'gray.50',
};

export const label: StyleProps = {
  border: '0',
  borderColor: 'none',
  borderRadius: '16px',
  margin: '0',
  padding: '4px 12px',
  minWidth: '124px',
  minHeight: '28px',
  fontWeight: '600',
  fontSize: '12px',
  lineHeight: '20px',
  color: 'gray.800',
};

export const labelActive: StyleProps = {
  backgroundColor: 'gray.800',
  color: 'white',
};

export const labelDisabled: StyleProps = {
  opacity: '0.4',
  cursor: 'not-allowed',
};
