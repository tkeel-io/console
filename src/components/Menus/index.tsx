import React from 'react';
// import { Link as ReactRouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import { Item, List, Title, Wrapper } from './index.styled';

import { IMenu } from '@/mock/types';

type Props = {
  data: IMenu[];
};

function Menus({ data }: Props): JSX.Element {
  return (
    <Wrapper>
      <Title>Menus</Title>
      <List>
        {/* <Item>
          <Link as={ReactRouterLink} to="/">
            home
          </Link>
        </Item> */}
        {data.map(({ id, name, path }) => {
          return (
            <Item key={id}>
              {/* <Link as={ReactRouterLink} to={path}>
                {name}
              </Link> */}
              <Button
                onClick={() => window.history.pushState(null, name, path)}
              >
                {name}
              </Button>
            </Item>
          );
        })}
      </List>
    </Wrapper>
  );
}

export default Menus;
