import { Button, Flex, Text } from '@chakra-ui/react';

import { BASE_ROUTE } from 'app';
import { supabase } from 'supabase';

export const Login = () => {
  const signInWithGithub = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: 'github',
      },
      {
        redirectTo: `${BASE_ROUTE}/dashboard`,
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