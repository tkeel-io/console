import type { CSSProperties, ReactElement, SVGProps } from 'react';

interface Props {
  contentStyle: CSSProperties;
  itemStyle: CSSProperties;
  labelStyle: CSSProperties;
  cursor: boolean | ReactElement | SVGProps<SVGElement>;
}

export const DEFAULT_PROPS: Props = {
  contentStyle: {
    borderRadius: '4px',
    boxShadow:
      '0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)',
    padding: '4px 12px',
    opacity: ' 0.9',
  },
  itemStyle: {
    paddingTop: '0',
    paddingBottom: '0',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '20px',
  },
  labelStyle: { fontSize: '12px', lineHeight: '20px' },
  cursor: false,
};
