import React from 'react';
import { IconButton, Flex } from '@chakra-ui/react';
import { BsCursor, BsHandIndexThumb, BsTrash } from 'react-icons/bs';

export const Tools = () => {
  return (
    <Flex direction='row'>
      <IconButton
        // disabled
        mr={3}
        // use variant as a select mode
        // variant='outline'
        variant='solid'
        colorScheme='blue'
        aria-label='open links'
        fontSize='25px'
        p={2}
        borderRadius={2}
        icon={<BsCursor />}
      />
      <IconButton
        disabled
        mr={3}
        variant='outline'
        colorScheme='green'
        aria-label='select links'
        fontSize='25px'
        p={2}
        borderRadius={2}
        icon={<BsHandIndexThumb />}
      />
      <IconButton
        disabled
        variant='outline'
        colorScheme='orange'
        aria-label='delete links'
        fontSize='25px'
        p={2}
        borderRadius={2}
        icon={<BsTrash />}
      />
    </Flex>
  );
};

export default Tools;
