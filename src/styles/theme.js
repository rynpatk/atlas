import { extendTheme } from '@chakra-ui/react';

import colors from './colors';

export const theme = extendTheme({
  colors,
  fonts: {
    heading: 'Titillium Web',
    body: 'Titillium Web',
  },
});

export default theme;
