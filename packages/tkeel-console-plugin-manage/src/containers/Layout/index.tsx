import React from 'react';
import { Container } from '@tkeel/console-components';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}

export default Layout;
