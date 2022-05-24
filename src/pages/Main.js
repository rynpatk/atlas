import React, { useEffect, useState, useRef } from 'react';
import { Box, Input, InputGroup, Button, Flex, Text } from '@chakra-ui/react';
import supabase from 'supabase';

import Links from 'components/Links';
import Tools from 'components/Tools';

export const Main = ({ user }) => {
  const inputRef = useRef();
  const [inputTerm, setInputTerm] = useState(null);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [links, setLinks] = useState(null);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const categories = Object.keys(MOCK_DATA);
  // const contents = selectedCategory ? MOCK_DATA[selectedCategory] : null;

  const signOut = () => {
    supabase.auth.signOut();
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
    if (!links) {
      fetchLinks();
    }
  }, [links]);

  return (
    <Flex direction='column' bg='paper' height='100vh' overflowY='hidden'>
      <Flex direction='column' width='100%' justify='flex-start'>
        <Flex direction='row' px={5} justify='space-between' align='center'>
          <Flex direction='column'>
            <Text
              color='softBlack'
              fontWeight='black'
              fontSize={['3xl', '3xl', '4xl']}
              pt={2}
            >
              Atlas
            </Text>
            <Text
              color='gray.400'
              fontWeight='black'
              fontSize={['xl', 'xl', '2xl']}
              mt={-2}
            >
              アトラス
            </Text>
          </Flex>
          <Tools />
        </Flex>
      </Flex>
      <Flex direction='column' alignItems='center' width='100%' height='100%'>
        <Flex
          direction='column'
          justify='center'
          align='center'
          width='100vw'
          px={3}
        >
          <Flex
            direction='column'
            pb={[4, 4, 8]}
            pt={4}
            width={['95vw', '95vw', '65vw']}
          >
            <InputGroup justifySelf='center'>
              <Input
                type='text'
                placeholder='Enter link...'
                value={inputTerm || ''}
                onChange={(e) => setInputTerm(e.target.value)}
                disabled={isCreatingLink}
              />
            </InputGroup>
            <Button
              pt={3}
              alignSelf='flex-end'
              variant='link'
              color='OrientalPink'
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
            width='100%'
            // height='100%'
            // playing with mobile scroll
            height='calc(100vh - 105px - 75px)'
            overflowY='scroll'
            pt={[2, 2, 5]}
          >
            <Links
              category={null}
              links={links}
              inputTerm={inputTerm}
              deleteLink={deleteLink}
            />
          </Flex>
        </Flex>
      </Flex>
      {/* replace bottom buttons with an account page */}
      <Button
        zIndex={100}
        position='absolute'
        bottom={[5, 5, 10]}
        left={[5, 5, 10]}
        bg='Terracotta'
        onClick={signOut}
        borderRadius={2}
      >
        Logout
      </Button>
      <Box
        zIndex={100}
        position='absolute'
        bottom={[5, 5, 10]}
        right={[5, 5, 10]}
      >
        <input
          type='file'
          ref={inputRef}
          style={{ display: 'none' }}
          // onChange={(e) => onChange(e.target.files[0])}
          // accept={acceptedFileTypes}
          // name={name}
          // {...inputProps}
        />
        <Button
          onClick={() => inputRef.current.click()}
          bg='HalfBaked'
          disabled
          borderRadius={2}
          // placeholder={placeholder || 'Your file ...'}
          // onChange={(e) => {}}
          // readOnly={true}
          // value={(value && value.name) || ''}
        >
          Import
        </Button>
      </Box>
    </Flex>
  );
};
