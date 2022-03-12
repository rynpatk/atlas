import { Button, Flex, Text } from '@chakra-ui/react';

import { supabase } from 'supabase';

const { REACT_APP_SUPA_API_URL, REACT_APP_SUPA_API_KEY } = process.env;
// const OAUTH_REDIRECT_URI = `${REACT_APP_SUPA_API_URL}/auth/v1/callback`;

export const Login = () => {
  const signInWithGithub = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: 'github',
      },
      {
        redirectTo: '/atlas/test-redirect',
      },
    );

    console.log(user);
    console.log(session);
    console.log(error);
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
