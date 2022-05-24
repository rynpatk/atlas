import React from 'react';
import { Text } from '@chakra-ui/react';

export const HighlightedText = ({ str, substr = '' }) => {
  if (!substr || !substr.trim()) {
    return <Text fontSize={['sm', 'sm', 'md']}>{str}</Text>;
  }

  const startIndex = str.toLowerCase().indexOf(substr.toLowerCase());

  if (startIndex > -1) {
    const endIndex = startIndex + substr.length;
    const startText = str.slice(0, startIndex);
    const highlightedText = str.slice(startIndex, endIndex);
    const endText = str.slice(endIndex, str.length);

    return (
      <Text fontSize={['sm', 'sm', 'md']}>
        {startText}
        <Text as='span' fontWeight={600} color='blue.500'>
          {highlightedText}
        </Text>
        {endText}
      </Text>
    );
  } else {
    return null;
    // return (
    //   <Text fontSize={['sm', 'sm', 'md']} color='gray.400'>
    //     {str}
    //   </Text>
    // );
  }
};

export default HighlightedText;
