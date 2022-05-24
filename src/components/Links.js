import React from 'react';
import { Flex } from '@chakra-ui/react';

import useStore from 'store/useStore';
import HighlightedText from 'components/HighlightedText';

export const LinkListItem = ({ link, inputTerm, onClick, activeTool }) => {
  return (
    <Flex
      m={[1, 1, 2]}
      onClick={() => {
        onClick(link);
      }}
      _hover={
        activeTool
          ? {
              cursor: 'pointer',
              fontWeight: 600,
              // TODO: have color change based on mode
              color: activeTool === 'delete' ? 'orange.500' : 'blue.500',
            }
          : {}
      }
    >
      <HighlightedText str={link.url} substr={inputTerm} />
    </Flex>
  );
};

export const Links = ({ deleteLink, links, inputTerm }) => {
  const activeTool = useStore((state) => state.activeTool);

  if (!links) {
    // TODO: loading spinner
    return null;
  }

  const onClick = async (link) => {
    if (activeTool === 'open') {
      if (
        link.url.indexOf('http://') === 0 ||
        link.url.indexOf('https://') === 0
      ) {
        window.open(link.url, '_blank');
      } else {
        window.open(`http://${link.url}`, '_blank');
      }
    } else if (activeTool === 'delete') {
      deleteLink(link.id);
    }
  };

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
          <LinkListItem
            key={link.id}
            link={link}
            inputTerm={inputTerm}
            onClick={onClick}
            activeTool={activeTool}
          />
        );
      })}
    </Flex>
  );
};

export default Links;
