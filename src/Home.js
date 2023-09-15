import React, { useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Box, Center, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [order, setOrder] = useState(true);

  const { data } = useQuery(["getArticleList", inputValue, order], async () => {
    const { data } = await axios.get(
      // `${process.env.REACT_APP_BASE_URL}/search?query=${inputValue}&desc=${order}`
      `${process.env.REACT_APP_BASE_URL}/search?q=${inputValue}`
    );
    return data;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      target: {
        elements: {
          searchInput: { value },
        },
      },
    } = e;

    setInputValue(value);
  };

  const handleClick = (e) => {
    const { name } = e.target;

    if (name === "asc") {
      return setOrder(false); // 오름차순
    }

    if (name === "desc") {
      return setOrder(true); // 내림차순
    }
  };
  return (
    <>
      <Flex alignItems="center" justifyContent="center" margin="40px">
        <Center>
          <form onSubmit={handleSubmit}>
            <SearchBar />
          </form>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              margin={"0 10px"}
            >
              정렬
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleClick} name="asc">
                오름차순
              </MenuItem>
              <MenuItem onClick={handleClick} name="desc">
                내림차순
              </MenuItem>
            </MenuList>
          </Menu>
        </Center>
      </Flex>

      <Flex direction="column" alignItems="center" margin="40px" height="800px">
        {data?.map((articles, _) => {
          const { link, title, date, content } = articles;

          return (
            <Box
              key={link}
              w="800px"
              mx="auto"
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              bg="white"
              margin={5}
            >
              <Link
                href={link}
                color="teal.500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Heading as="h2" size="lg" noOfLines={1} mb="2">
                  {title || "제목없음"}
                </Heading>

                <Text color="gray.600" fontSize="sm" textAlign={"right"}>
                  {date || "날짜없음"}
                </Text>
                <Text mt="4" noOfLines={3}>
                  {content || "내용없음"}
                </Text>
              </Link>
            </Box>
          );
        })}
      </Flex>
    </>
  );
}

export default Home;
