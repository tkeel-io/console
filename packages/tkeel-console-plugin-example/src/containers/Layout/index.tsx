import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  return <div>{children}</div>;
}

export default Layout;
