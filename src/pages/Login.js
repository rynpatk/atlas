import { Button, Flex, Text } from '@chakra-ui/react';

import { supabase } from 'supabase';

// workaround for routing when deploying to gh pages
// const isLocalDevelopment = process.env.NODE_ENV === 'development';
// const BASE_ROUTE = isLocalDevelopment ? '' : '/atlas';

export const Login = () => {
  const signInWithGithub = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: 'github',
      },
      {
        redirectTo: 'https://rynpatk.github.io/atlas/dashboard',
      },
    );

    console.log({ user, session, error });
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
