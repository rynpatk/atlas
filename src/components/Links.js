import React, { useState } from 'react';
import format from 'date-fns/format';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { EditText } from 'react-edit-text';

import useStore from 'store/useStore';
import HighlightedText from 'components/HighlightedText';
import openLink from 'utils/openLink';

import 'react-edit-text/dist/index.css';

export const LinkListItem = ({
  link,
  inputTerm,
  onClick,
  activeLinkId,
  openLink,
  editLinkName,
}) => {
  const {
    id: linkId,
    url,
    created_at: createdAt,
    name,
    // group_id: groupId,
  } = link;
  const [newLinkName, setNewLinkName] = useState(link?.name || '');
  const linkIsActive = linkId === activeLinkId;
  const formattedDate = format(new Date(createdAt), 'MM/dd/yyyy');

  return (
    <Flex
      onClick={() => {
        onClick(link);
      }}
      _hover={{
        cursor: 'pointer',
        bg: !linkIsActive ? 'gray.200' : null,
      }}
      direction='row'
      align={linkIsActive ? 'flex-start' : 'center'}
      width='100%'
      bg={linkIsActive ? 'light' : null}
      minHeight={linkIsActive ? '100px' : null}
      boxShadow={linkIsActive ? 'base' : null}
      mb={2}
      py={1}
      px={3}
      borderRadius={10}
    >
      {linkIsActive ? (
        <EditText
          py={1}
          style={{ width: '200px' }}
          value={newLinkName || ''}
          placeholder='Enter name...'
          onChange={(e) => {
            setNewLinkName(e.target.value);
          }}
          onBlur={() => {
            editLinkName({ linkId: link.id, newLinkName });
          }}
        />
      ) : (
        <Text py={1} width='200px' color={name ? 'black' : 'gray'}>
          {name || 'Unnamed'}
        </Text>
      )}
      <Box py={1} width='50%'>
        <HighlightedText str={url} substr={inputTerm} />
      </Box>
      <Text py={1} width='20%'>
        {formattedDate}
      </Text>
      <Flex align='center' justify='flex-end' flex={1}>
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
  links,
  inputTerm,
  activeLinkId,
  setActiveLinkId,
  editLinkName,
}) => {
  const activeTool = useStore((state) => state.activeTool);

  if (!links) {
    // TODO: loading spinner
    return null;
  }

  const onClick = (link) => {
    if (activeLinkId === link.id) {
      // setActiveLinkId(null);
    } else {
      setActiveLinkId(link.id);
    }
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
            editLinkName={editLinkName}
          />
        );
      })}
    </Flex>
  );
};

export default Links;
