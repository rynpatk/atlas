import { Flex, Text } from '@chakra-ui/react';

export const Dashboard = () => {
  return (
    <Flex bg='paper' height='100vh'>
      <Flex direction='column' width='100px' bg='paper' />
      <Flex direction='column' width='100%' height='100%'>
        <Text
          alignSelf='flex-end'
          color='softPink'
          fontWeight='black'
          fontSize='5xl'
          pt={1}
          pr={7}
        >
          Atlas
        </Text>
      </Flex>
    </Flex>
  );
};
