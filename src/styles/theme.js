import { extendTheme } from '@chakra-ui/react';

import colors from './colors';

export const theme = extendTheme({
  colors,
  fonts: {
    heading: 'Sora',
    body: 'Sora',
  },
});

export default theme;
