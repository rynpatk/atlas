import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Input,
  InputGroup,
  IconButton,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import supabase from 'supabase';
import { BsCursor, BsHandIndexThumb, BsTrash } from 'react-icons/bs';

const HighlightedText = ({ str, substr = '' }) => {
  const startIndex = str.indexOf(substr);

  if (!substr || !substr.trim()) {
    return <Text fontSize={['sm', 'sm', 'md']}>{str}</Text>;
  }

  if (startIndex > -1) {
    const startStr = str.slice(0, startIndex);
    const endStr = str.slice(startIndex + substr.length, str.length);

    return (
      <Text fontSize={['sm', 'sm', 'md']}>
        {startStr}
        <Text as='span' fontWeight={600} color='Keppel'>
          {substr}
        </Text>
        {endStr}
      </Text>
    );
  } else {
    return (
      <Text fontSize={['sm', 'sm', 'md']} color='gray.400'>
        {str}
      </Text>
    );
  }
};

const LinkListItem = ({ url, inputTerm }) => {
  return (
    <Flex
      m={[1, 1, 2]}
      // TODO: open as background tab
      onClick={() => {
        if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
          window.open(url, '_blank');
        } else {
          window.open(`http://${url}`, '_blank');
        }
      }}
      _hover={{
        cursor: 'pointer',
        fontWeight: 600,
        // TODO: have color change based on mode
        color: 'blue.500',
        // color: 'Keppel',
      }}
    >
      <HighlightedText str={url} substr={inputTerm} />
    </Flex>
  );
};

const Links = ({ category, links, inputTerm }) => {
  if (!links) {
    // TODO: loading spinner
    return null;
  }

  return (
    <Flex
      direction='row'
      flexWrap='wrap'
      justify='center'
      align='center'
      overflowY='scroll'
      overflowX='hidden'
      pb={20}
    >
      {links.map((link) => {
        return (
          <LinkListItem key={link.id} url={link.url} inputTerm={inputTerm} />
        );
      })}
    </Flex>
  );
};

const Tools = () => {
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

  // const deleteLink = async (id) => {
  //   try {
  //     await supabase.from('todos').delete().eq('id', id);
  //     setTodos(todos.filter((x) => x.id !== id));
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

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
            <Links category={null} links={links} inputTerm={inputTerm} />
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
