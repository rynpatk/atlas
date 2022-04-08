import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

import supabase from 'supabase';

export const Login = () => {
  const isLocalDevelopment = process.env.NODE_ENV === 'development';

  // TODO: additional login channels
  const signInWithGithub = () => {
    supabase.auth.signIn(
      {
        provider: 'github',
      },
      {
        redirectTo: isLocalDevelopment
          ? 'http://localhost:3000/atlas'
          : 'https://rynpatk.github.io/atlas',
      },
    );
  };

  return (
    <Flex direction='column' bg='#E0C9A5' height='100vh'>
      <Flex
        align='center'
        justify='center'
        direction='row'
        width='100%'
        height='100%'
      >
        <Flex direction='column' align='center'>
          <Text
            color='black'
            fontFamily='Lora'
            fontWeight={700}
            fontSize='6xl'
            pb={3}
          >
            Atlas
          </Text>
          <Button colorScheme='teal' onClick={signInWithGithub}>
            Login with Github
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
