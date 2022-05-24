import React from 'react';
import { Flex } from '@chakra-ui/react';

import HighlightedText from 'components/HighlightedText';

export const LinkListItem = ({ url, inputTerm }) => {
  return (
    <Flex
      m={[1, 1, 2]}
      // TODO: open as background tab
      onClick={() => {
        if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
          window.open(url, '_blank');
        } else {
          window.open(`http://${url}`, '_blank');
        }
      }}
      _hover={{
        cursor: 'pointer',
        fontWeight: 600,
        // TODO: have color change based on mode
        color: 'blue.500',
      }}
    >
      <HighlightedText str={url} substr={inputTerm} />
    </Flex>
  );
};

export const Links = ({ category, links, inputTerm }) => {
  if (!links) {
    // TODO: loading spinner
    return null;
  }

  return (
    <Flex
      direction='row'
      flexWrap='wrap'
      justify='center'
      align='center'
      overflowY='scroll'
      overflowX='hidden'
      pb={20}
    >
      {links.map((link) => {
        return (
          <LinkListItem key={link.id} url={link.url} inputTerm={inputTerm} />
        );
      })}
    </Flex>
  );
};

export default Links;
