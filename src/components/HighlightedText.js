import React from 'react';
import { Text } from '@chakra-ui/react';

export const HighlightedText = ({ str, substr = '' }) => {
  if (!substr || !substr.trim()) {
    return (
      <>
        <Text mx={1} my={0.5} fontSize={['sm', 'sm', 'md']}>
          {str}
        </Text>
      </>
    );
  }

  const startIndex = str.toLowerCase().indexOf(substr.toLowerCase());

  if (startIndex > -1) {
    const endIndex = startIndex + substr.length;
    const startText = str.slice(0, startIndex);
    const highlightedText = str.slice(startIndex, endIndex);
    const endText = str.slice(endIndex, str.length);

    return (
      <Text fontSize={['sm', 'sm', 'md']} mx={1} my={0.5}>
        {startText}
        <Text as='span' fontWeight={600} color='teal'>
          {highlightedText}
        </Text>
        {endText}
      </Text>
    );
  } else {
    return null;
  }
};

export default HighlightedText;
