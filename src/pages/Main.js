import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Input, InputGroup, Flex, Text } from '@chakra-ui/react';
import supabase from 'supabase';

import Links from 'components/Links';
import openLink from 'utils/openLink';

const MAX_OPENABLE_LINKS = 10;

export const Main = ({ user }) => {
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [activeLinkId, setActiveLinkId] = useState(null);
  const [inputTerm, setInputTerm] = useState(null);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [links, setLinks] = useState(null);
  const [topics, setTopics] = useState(null);

  const activeTopic = topics?.find((topic) => topic.id === activeTopicId);

  // TODO: filter to active topic prior to input term filtering
  const filteredLinks = useMemo(() => {
    // note: duplication of logic with HighlightedText internal code...
    if (!inputTerm) return links || [];

    return links?.filter((link) => {
      return link?.url.toLowerCase().indexOf(inputTerm.toLowerCase()) >= 0;
    });
  }, [inputTerm, links]);

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
      .order('id', { ascending: true });

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

  // example
  // const toggleCompleted = async () => {
  //   const { data, error } = await supabase
  //     .from('todos')
  //     .update({ is_complete: !isCompleted })
  //     .eq('id', todo.id)
  //     .single();
  //   if (error) {
  //     console.error(error);
  //   }
  //   setIsCompleted(data.is_complete);
  // };

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
              All Links
            </Text>
          </Box>

          {topics?.map((topic) => {
            const { id: topicId, name } = topic;
            return (
              <Box
                key={topicId}
                width='100%'
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
                  alignSelf='flex-start'
                  fontWeight={activeTopicId === topicId ? 'bold' : null}
                  onClick={() => {
                    setActiveTopicId(topicId);
                  }}
                >
                  {name || 'Untitled'}
                </Text>
              </Box>
            );
          })}
          <Button position='absolute' bottom={10} onClick={createTopic}>
            Create Topic
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
          <Flex direction='row' pb={[4, 4, 2]} pt={5} px={3}>
            <InputGroup>
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
            <Button
              p={3}
              variant='link'
              color={inputTerm ? 'HalfBaked' : 'gray.100'}
              onClick={addLink}
              disabled={!inputTerm || isCreatingLink}
              borderRadius={2}
              _hover={{
                textDecoration: 'none',
              }}
            >
              Add
            </Button>
          </Flex>

          <Flex
            direction='column'
            height='calc(100vh - 72px)'
            overflowY='scroll'
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
              <Text fontSize='xl' fontWeight={600}>
                {(activeTopicId
                  ? activeTopic?.name || 'Untitled'
                  : 'All Links'
                ).toUpperCase()}
              </Text>
              <Flex width='10%' mr={6}>
                <Button
                  width='100px'
                  borderRadius='8px'
                  colorScheme='orange'
                  color='warning'
                  fontSize='sm'
                  variant='ghost'
                  disabled={
                    !filteredLinks?.length ||
                    filteredLinks?.length > MAX_OPENABLE_LINKS
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    openAllLinksInActiveTopic();
                  }}
                >
                  Open All
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
