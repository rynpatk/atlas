import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  Text,
  Span,
} from '@chakra-ui/react';

import supabase from 'supabase';
import { MOCK_DATA } from 'mockData';

// const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
//   return (
//     <Flex
//       bg='#E0C9A5'
//       height='100%'
//       width='100%'
//       direction='column'
//       border='1px solid'
//       borderColor='softBlack'
//       p={3}
//     >
//       {categories.map((category) => {
//         const isSelected = selectedCategory === category;

//         return (
//           <Text
//             key={category}
//             fontWeight={isSelected ? 'bold' : null}
//             onClick={() => {
//               if (isSelected) {
//                 setSelectedCategory(null);
//               } else {
//                 setSelectedCategory(category);
//               }
//             }}
//             _hover={{
//               fontWeight: 'bold',
//               cursor: 'pointer',
//             }}
//           >
//             {category}
//           </Text>
//         );
//       })}
//     </Flex>
//   );
// };

// const Tile = ({ url }) => {
//   return (
//     <Flex
//       height='150px'
//       width='250px'
//       mt={2}
//       mr={3}
//       border='1px solid'
//       borderColor='softBlack'
//       _hover={{
//         borderWidth: '2px',
//         cursor: 'pointer',
//       }}
//     >
//       <Text pl={3} pt={2}>
//         {url}
//       </Text>
//     </Flex>
//   );
// };

// TODO: get this working properly
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
      onClick={() => window.open(url, '_blank')}
      _hover={{
        cursor: 'pointer',
        fontWeight: 600,
        color: 'Keppel',
      }}
    >
      <HighlightedText str={url} substr={inputTerm} />
    </Flex>
  );
};

const Grid = ({ category, links, inputTerm }) => {
  if (!links) {
    // TODO: loading spinner
    return null;
  }

  return (
    <>
      <Flex
        direction='row'
        flexWrap='wrap'
        justify='center'
        align='center'
        pr={3}
      >
        {links.map((link) => {
          return (
            <LinkListItem key={link.id} url={link.url} inputTerm={inputTerm} />
          );
        })}
      </Flex>
    </>
  );
};

export const Main = ({ user }) => {
  const [inputTerm, setInputTerm] = useState(null);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [links, setLinks] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = Object.keys(MOCK_DATA);
  const contents = selectedCategory ? MOCK_DATA[selectedCategory] : null;

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
  }, []);

  return (
    <Flex direction='column' bg='paper' height='100vh' overflowY='hidden'>
      <Flex direction='column' width='100%' justify='flex-start' pl={5}>
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
              color='Keppel'
              onClick={addLink}
              disabled={!inputTerm || isCreatingLink}
              _hover={{
                textDecoration: 'none',
              }}
            >
              Add
            </Button>
          </Flex>

          <Flex direction='column' width='100%' height='100%'>
            <Grid category={null} links={links} inputTerm={inputTerm} />
          </Flex>
        </Flex>
      </Flex>
      <Button
        zIndex={100}
        position='absolute'
        bottom={10}
        right={10}
        bg='Terracotta'
        onClick={signOut}
      >
        Logout
      </Button>
    </Flex>
  );
};
