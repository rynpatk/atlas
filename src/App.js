import { Box, Flex, Text } from '@chakra-ui/react';

// TODO: theme
const CYBER_YELLOW = '#FFEE00';

function App() {
  return (
    <Box bg={CYBER_YELLOW} height="100vh">
      <Flex direction="column" height="100%" align="center" justify="center">
        <Text fontWeight="black" fontSize="7xl" >Atlas</Text>
        <Text fontSize="3xl" pt={1}>Coming Soon</Text>
      </Flex>
    </Box>
  );
}

export default App;
