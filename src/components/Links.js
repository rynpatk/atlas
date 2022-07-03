import React, { useState } from 'react';
import format from 'date-fns/format';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { EditText } from 'react-edit-text';
import { useDrag } from 'react-dnd';
// import { IoArrowRedoOutline } from 'react-icons/io5';
import { FiTrash, FiNavigation } from 'react-icons/fi';

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
  deleteLink,
}) => {
  const [newLinkName, setNewLinkName] = useState(link?.name || '');
  const [{ isDragging }, dragRef] = useDrag({
    type: 'link',
    item: link,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const {
    id: linkId,
    url,
    created_at: createdAt,
    name,
    // group_id: groupId,
  } = link;
  const linkIsActive = linkId === activeLinkId;
  const formattedDate = format(new Date(createdAt), 'MMM d');

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
      bg={isDragging ? 'gray.200' : linkIsActive ? 'light' : null}
      minHeight={linkIsActive ? '100px' : null}
      boxShadow={linkIsActive ? 'base' : null}
      mb={2}
      py={2}
      px={2}
      borderRadius={10}
      ref={dragRef}
    >
      {linkIsActive ? (
        <EditText
          py={1}
          style={{ width: '200px', fontSize: '18px' }}
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
        <Text
          py={1}
          width='200px'
          color={name ? 'black' : 'gray'}
          fontSize={['sm', 'sm', 'lg']}
        >
          {name || 'Unnamed'}
        </Text>
      )}
      <Text py={1} color='gray' width='200px' fontSize={['sm', 'sm', 'lg']}>
        Added {formattedDate}
      </Text>

      <Box py={1} width='50%'>
        <HighlightedText str={url} substr={inputTerm} />
      </Box>

      <Flex align='center' justify='flex-end' flex={1}>
        <Stack direction='row' spacing={2} align='center'>
          {linkIsActive ? (
            <Button
              width='100px'
              borderRadius={8}
              colorScheme='red'
              color={linkIsActive ? 'white' : 'warning'}
              fontSize='md'
              variant={linkIsActive ? 'solid' : 'ghost'}
              rightIcon={<FiTrash size='18px' />}
              onClick={(e) => {
                e.stopPropagation();
                deleteLink(link.id);
              }}
            >
              DELETE
            </Button>
          ) : null}
          <Button
            width='100px'
            borderRadius={8}
            colorScheme={linkIsActive ? 'teal' : null}
            color={linkIsActive ? 'white' : 'gray.600'}
            fontSize='md'
            variant={linkIsActive ? 'solid' : 'ghost'}
            rightIcon={<FiNavigation size='20px' />}
            onClick={(e) => {
              e.stopPropagation();
              openLink(link);
            }}
          >
            OPEN
          </Button>
        </Stack>
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
  deleteLink,
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
            deleteLink={deleteLink}
          />
        );
      })}
    </Flex>
  );
};

export default Links;
