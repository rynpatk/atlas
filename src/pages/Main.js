import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Input, InputGroup, Flex, Text } from '@chakra-ui/react';
import supabase from 'supabase';
import { EditText } from 'react-edit-text';

import Links from 'components/Links';
import TopicListItem from 'components/TopicListItem';
import openLink from 'utils/openLink';

const MAX_OPENABLE_LINKS = 10;
const UNCATEGORIZED = 'Uncategorized';

export const Main = ({ user }) => {
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [activeLinkId, setActiveLinkId] = useState(null);
  const [inputTerm, setInputTerm] = useState(null);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [links, setLinks] = useState(null);
  const [topics, setTopics] = useState(null);

  const activeTopic = topics?.find((topic) => topic.id === activeTopicId);
  const [newTopicName, setNewTopicName] = useState(activeTopic?.name || '');

  const filteredLinks = useMemo(() => {
    return links?.filter((link) => {
      if (activeTopicId) {
        if (activeTopicId === UNCATEGORIZED) {
          if (link?.group_id) {
            return false;
          }
        } else {
          if (link?.group_id !== activeTopicId) {
            return false;
          }
        }
      }

      if (inputTerm) {
        if (link?.url.toLowerCase().indexOf(inputTerm.toLowerCase()) < 0) {
          return false;
        }
      }

      return true;
    });
  }, [inputTerm, activeTopicId, links]);

  const topicLinkCountsMap = useMemo(() => {
    return topics?.reduce((acc, topic) => {
      const { id: topicId } = topic;
      const linksForTopic = links?.filter((link) => {
        return link.group_id === topicId;
      });

      return {
        ...acc,
        [topicId]: linksForTopic?.length || 0,
      };
    }, {});
  }, [topics, links]);

  const uncategorizedLinksCount = useMemo(() => {
    return links?.filter((link) => !link.group_id)?.length || 0;
  }, [links]);

  useEffect(() => {
    if (activeTopic?.name) {
      setNewTopicName(activeTopic.name);
    }
  }, [activeTopic]);

  // const signOut = () => {
  //   supabase.auth.signOut();
  // };

  const fetchTopics = async () => {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.log('error', error);
    } else {
      setTopics(data);
    }
  };

  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.log('error', error);
    } else {
      setLinks(data);
    }
  };

  const deleteLink = async (id) => {
    try {
      await supabase.from('links').delete().eq('id', id);
      setLinks(links.filter((link) => link.id !== id));
    } catch (error) {
      console.log('error', error);
    }
  };

  const addLink = async () => {
    if (!inputTerm) return;

    setIsCreatingLink(true);
    const { data: newLink, error } = await supabase
      .from('links')
      .insert({ url: inputTerm, user_id: user.id })
      .single();

    if (error) {
      console.log(error);
      setIsCreatingLink(false);
    } else {
      setLinks([...links, newLink]);
      setInputTerm(null);
      setIsCreatingLink(false);
    }
  };

  // "topics" in the UI; "groups" in the DB
  const createTopic = async () => {
    const { data: newTopic, error } = await supabase
      .from('groups')
      .insert({ name: null, user_id: user.id })
      .single();

    if (error) {
      console.log(error);
    } else {
      setTopics([...topics, newTopic]);
    }
  };

  // 1. disable when max links exceeded
  // 2. switch to open "starred" links
  const openAllLinksInActiveTopic = () => {
    for (let i = 0; i < filteredLinks.length; i++) {
      openLink(filteredLinks[i]);
    }
  };

  const editTopicName = async ({ topicId, newTopicName }) => {
    const { data: updatedTopic, error } = await supabase
      .from('groups')
      .update({ name: newTopicName })
      .eq('id', topicId)
      .single();

    if (error) {
      console.error(error);
    } else {
      const updatedTopics = topics.map((topic) => {
        if (topic.id === updatedTopic.id) {
          return updatedTopic;
        }
        return topic;
      });

      setTopics(updatedTopics);
    }
  };

  const editLinkName = async ({ linkId, newLinkName }) => {
    const { data: updatedLink, error } = await supabase
      .from('links')
      .update({ name: newLinkName })
      .eq('id', linkId)
      .single();

    if (error) {
      console.error(error);
    } else {
      const updatedLinks = links.map((link) => {
        if (link.id === updatedLink.id) {
          return updatedLink;
        }
        return link;
      });

      setLinks(updatedLinks);
    }
  };

  const addLinkToTopic = async ({ linkId, topicId }) => {
    const { data: updatedLink, error } = await supabase
      .from('links')
      .update({ group_id: topicId })
      .eq('id', linkId)
      .single();

    if (error) {
      console.error(error);
    } else {
      const updatedLinks = links.map((link) => {
        if (link.id === updatedLink.id) {
          return updatedLink;
        }
        return link;
      });

      setLinks(updatedLinks);
    }
  };

  useEffect(() => {
    if (!topics) {
      fetchTopics();
    }

    if (!links) {
      fetchLinks();
    }
  }, [topics, links]);

  const renderSideContent = () => {
    return (
      <Flex
        direction='column'
        width='17%'
        height='100%'
        justify='flex-start'
        align='center'
        p={5}
      >
        <Flex
          bg='light'
          width='100%'
          height='100%'
          direction='column'
          align='center'
          borderRadius={10}
          boxShadow='base'
        >
          <Text
            color='cyan.500'
            fontWeight='black'
            fontSize='2xl'
            pt={4}
            pb='40px'
          >
            🌐 Atlas
          </Text>
          <Box
            width='100%'
            bg={!activeTopicId ? 'gray.50' : null}
            onClick={() => {
              setActiveTopicId(null);
            }}
            _hover={{
              bg: 'gray.100',
              cursor: 'pointer',
            }}
          >
            <Text
              py={2}
              px={6}
              alignSelf='flex-start'
              fontWeight={!activeTopicId ? 'bold' : null}
            >
              All Links ({links?.length})
            </Text>
          </Box>
          <Box
            width='100%'
            bg={activeTopicId === UNCATEGORIZED ? 'gray.50' : null}
            onClick={() => {
              setActiveTopicId(UNCATEGORIZED);
            }}
            _hover={{
              bg: 'gray.100',
              cursor: 'pointer',
            }}
          >
            <Text
              py={2}
              px={6}
              alignSelf='flex-start'
              fontWeight={activeTopicId === UNCATEGORIZED ? 'bold' : null}
            >
              Uncategorized ({uncategorizedLinksCount})
            </Text>
          </Box>
          {topics?.map((topic) => {
            return (
              <TopicListItem
                key={topic.id}
                topic={topic}
                activeTopicId={activeTopicId}
                setActiveTopicId={setActiveTopicId}
                topicLinksCount={topicLinkCountsMap[topic.id]}
                addLinkToTopic={addLinkToTopic}
              />
            );
          })}
          <Button
            fontSize='sm'
            bg='gray.200'
            position='absolute'
            bottom={10}
            onClick={createTopic}
            borderRadius={8}
          >
            NEW GROUP
          </Button>
        </Flex>
      </Flex>
    );
  };

  const renderMainContent = () => {
    return (
      <Flex
        direction='column'
        alignItems='flex-start'
        width='83%'
        height='100%'
      >
        <Flex direction='column' width='100%'>
          <Flex
            direction='row'
            justify='flex-start'
            pb={[4, 4, 2]}
            pt={5}
            px={3}
          >
            <InputGroup flex={0}>
              <Input
                width={['95vw', '95vw', '50vw']}
                borderRadius={10}
                borderWidth='0px'
                boxShadow='base'
                bg='light'
                type='text'
                placeholder='Search links...'
                value={inputTerm || ''}
                onChange={(e) => setInputTerm(e.target.value)}
                disabled={isCreatingLink}
              />
            </InputGroup>
            {inputTerm ? (
              <Button
                ml={2}
                onClick={addLink}
                disabled={isCreatingLink}
                colorScheme='teal'
                fontSize='sm'
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Create link
              </Button>
            ) : null}
          </Flex>

          <Flex
            direction='column'
            height='calc(100vh - 72px)'
            overflowY='scroll'
            overflowX='hidden'
            pt={[1, 1, 2]}
          >
            <Flex
              direction='row'
              align='center'
              justify='space-between'
              width='100%'
              my={2}
              mx={2}
              pb={2}
            >
              {!activeTopicId || activeTopicId === UNCATEGORIZED ? (
                <Text fontSize='xl' fontWeight={600}>
                  {activeTopicId ? UNCATEGORIZED : 'All Links'}
                </Text>
              ) : (
                <EditText
                  style={{ width: '300px', fontSize: '20px', fontWeight: 600 }}
                  value={newTopicName || ''}
                  placeholder='Enter topic name...'
                  onChange={(e) => {
                    setNewTopicName(e.target.value);
                  }}
                  onBlur={() => {
                    editTopicName({ topicId: activeTopic.id, newTopicName });
                  }}
                  readonly={!activeTopicId || activeTopicId === UNCATEGORIZED}
                />
              )}

              <Flex mr={10}>
                <Button
                  width='100px'
                  borderRadius={8}
                  fontSize='sm'
                  bg='gray.200'
                  disabled={
                    !filteredLinks?.length ||
                    filteredLinks?.length > MAX_OPENABLE_LINKS
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    openAllLinksInActiveTopic();
                  }}
                >
                  OPEN ALL
                </Button>
              </Flex>
            </Flex>

            <Links
              category={null}
              links={filteredLinks}
              inputTerm={inputTerm}
              deleteLink={deleteLink}
              activeLinkId={activeLinkId}
              setActiveLinkId={setActiveLinkId}
              editLinkName={editLinkName}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex direction='row' bg='canvas' height='100vh' overflowY='hidden'>
      {renderSideContent()}
      {renderMainContent()}
    </Flex>
  );
};
