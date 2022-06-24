import React from 'react';
import format from 'date-fns/format';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import useStore from 'store/useStore';
import HighlightedText from 'components/HighlightedText';
import openLink from 'utils/openLink';

export const LinkListItem = ({
  link,
  inputTerm,
  onClick,
  activeLinkId,
  setActiveLinkId,
  openLink,
}) => {
  const {
    id: linkId,
    url,
    created_at: createdAt,
    name,
    group_id: groupId,
  } = link;
  const linkIsActive = linkId === activeLinkId;
  const formattedDate = format(new Date(createdAt), 'MM/dd/yyyy');

  return (
    <Flex
      onClick={() => {
        onClick(link);
      }}
      _hover={{
        cursor: !linkIsActive ? 'pointer' : null,
        bg: !linkIsActive ? 'gray.200' : null,
      }}
      direction='row'
      width='100%'
      bg={linkIsActive ? 'light' : null}
      minHeight={linkIsActive ? '100px' : null}
      boxShadow={linkIsActive ? 'base' : null}
      mb={2}
      p={4}
      borderRadius={10}
    >
      <Text width='20%'>{name || 'Testing'}</Text>
      <Box width='50%'>
        <HighlightedText str={url} substr={inputTerm} />
      </Box>
      <Text width='20%'>{formattedDate}</Text>
      <Flex align='center' justify='center' width='10%'>
        <Button
          width='100px'
          borderRadius='8px'
          colorScheme='teal'
          fontSize='sm'
          variant={linkIsActive ? 'solid' : 'ghost'}
          onClick={(e) => {
            e.stopPropagation();
            openLink(link);
          }}
        >
          Open
        </Button>
      </Flex>
    </Flex>
  );
};

export const Links = ({
  deleteLink,
  links,
  inputTerm,
  activeLinkId,
  setActiveLinkId,
}) => {
  const activeTool = useStore((state) => state.activeTool);

  if (!links) {
    // TODO: loading spinner
    return null;
  }

  const onClick = (link) => {
    setActiveLinkId(link.id);
  };

  return (
    <Flex direction='column' flex={1} pl={2} mr={5} pb={2}>
      {links.map((link) => {
        return (
          <LinkListItem
            key={link.id}
            link={link}
            inputTerm={inputTerm}
            onClick={onClick}
            openLink={openLink}
            activeTool={activeTool}
            activeLinkId={activeLinkId}
            setActiveLinkId={setActiveLinkId}
          />
        );
      })}
    </Flex>
  );
};

export default Links;
