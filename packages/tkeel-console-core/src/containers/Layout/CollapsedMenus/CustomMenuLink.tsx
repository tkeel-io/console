import React from 'react';
import {
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { Center, Link } from '@chakra-ui/react';
import { AppsAddFilledIcon } from '@tkeel/console-icons';

function CustomMenuLink({ path }: { path: string }) {
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: false });
  return (
    <Link
      marginTop="10px"
      borderRadius="4px"
      backgroundColor={match ? 'gray.800' : 'inherit'}
      boxShadow={
        match
          ? '0 20px 25px -5px rgb(113 128 150 / 10%), 0 10px 10px -5px rgb(113 128 150 / 4%)'
          : 'none'
      }
      _focus={{ boxShadow: 'none' }}
      _hover={{ backgroundColor: match ? 'gray.800' : 'gray.100' }}
      as={ReactRouterLink}
      to={path}
    >
      <Center width="48px" height="48px">
        <AppsAddFilledIcon mode={match ? 'dark' : 'light'} />
      </Center>
    </Link>
  );
}

export default CustomMenuLink;
