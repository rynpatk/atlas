import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';

export const TopicListItem = ({
  topic,
  activeTopicId,
  setActiveTopicId,
  topicLinksCount,
  addLinkToTopic,
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'link',
    drop: (item) => {
      addLinkToTopic({ linkId: item.id, topicId: topic.id });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const { id: topicId, name } = topic;
  return (
    <Box
      ref={dropRef}
      key={topicId}
      width='100%'
      bg={isOver ? 'cyan.100' : activeTopicId === topicId ? 'gray.50' : null}
      _hover={{
        bg: 'gray.100',
        cursor: 'pointer',
      }}
      onClick={() => {
        setActiveTopicId(topicId);
      }}
    >
      <Text
        py={2}
        px={6}
        fontSize={['sm', 'sm', 'lg']}
        alignSelf='flex-start'
        fontWeight={activeTopicId === topicId ? 'bold' : null}
        onClick={() => {
          setActiveTopicId(topicId);
        }}
      >
        {name || 'Untitled'} ({topicLinksCount})
      </Text>
    </Box>
  );
};

export default TopicListItem;
