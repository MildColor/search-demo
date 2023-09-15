import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

function SearchBar() {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        type="text"
        placeholder="검색어를 입력하세요"
        w="600px"
        name="searchInput"
      />
    </InputGroup>
  );
}

export default SearchBar;
