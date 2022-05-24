import React from 'react';
import { IconButton, Flex } from '@chakra-ui/react';
import { BsCursor, BsHandIndexThumb, BsTrash } from 'react-icons/bs';

import useStore from 'store/useStore';

export const Tools = () => {
  const activeTool = useStore((state) => state.activeTool);
  const setActiveTool = useStore((state) => state.setActiveTool);

  return (
    <Flex direction='row'>
      <IconButton
        mr={3}
        variant={activeTool === 'open' ? 'solid' : 'outline'}
        onClick={() => setActiveTool('open')}
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
        variant={activeTool === 'select' ? 'solid' : 'outline'}
        onClick={() => setActiveTool('select')}
        colorScheme='green'
        aria-label='select links'
        fontSize='25px'
        p={2}
        borderRadius={2}
        icon={<BsHandIndexThumb />}
      />
      <IconButton
        variant={activeTool === 'delete' ? 'solid' : 'outline'}
        onClick={() => setActiveTool('delete')}
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
