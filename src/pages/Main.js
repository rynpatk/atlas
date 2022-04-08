import React, { useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

import supabase from 'supabase';
import { MOCK_DATA } from 'mockData';

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <Flex
      bg='paper'
      height='100%'
      width='100%'
      direction='column'
      border='1px solid'
      borderColor='softBlack'
      p={3}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <Text
            key={category}
            fontWeight={isSelected ? 'bold' : null}
            onClick={() => {
              if (isSelected) {
                setSelectedCategory(null);
              } else {
                setSelectedCategory(category);
              }
            }}
            _hover={{
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {category}
          </Text>
        );
      })}
    </Flex>
  );
};

const Tile = ({ url }) => {
  return (
    <Flex
      height='150px'
      width='250px'
      mt={2}
      mr={3}
      border='1px solid'
      borderColor='softBlack'
      _hover={{
        borderWidth: '2px',
        cursor: 'pointer',
      }}
    >
      <Text pl={3} pt={2}>
        {url}
      </Text>
    </Flex>
  );
};

const Grid = ({ category, contents }) => {
  if (!contents) {
    return <Text>No category selected</Text>;
  }

  return (
    <>
      <Flex direction='row' flexWrap='wrap' justifyContent='flex-start' pr={3}>
        {Object.values(contents).map((site) => {
          return <Tile key={site} {...site} />;
        })}
      </Flex>
    </>
  );
};

export const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = Object.keys(MOCK_DATA);
  const contents = selectedCategory ? MOCK_DATA[selectedCategory] : null;

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <Flex direction='column' bg='paper' height='100vh'>
      <Flex direction='row' width='100%'>
        <Text
          alignSelf='flex-end'
          color='softPink'
          fontWeight='black'
          fontSize='3xl'
          pt={2}
          pl={5}
        >
          Atlas
        </Text>
      </Flex>
      <Flex direction='row' width='100%' height='100%'>
        <Flex
          direction='column'
          width='200px'
          bg='paper'
          mt={2}
          ml={5}
          mr={3}
          mb={5}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </Flex>
        <Flex direction='column' width='100%' height='100%'>
          <Grid category={selectedCategory} contents={contents} />
        </Flex>
      </Flex>
      <Button
        zIndex={100}
        position='absolute'
        bottom={10}
        right={10}
        colorScheme='teal'
        onClick={signOut}
      >
        Logout
      </Button>
    </Flex>
  );
};
