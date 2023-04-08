import React, { FC, useEffect, useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  CheckboxGroup,
  Checkbox,
  Grid,
  GridItem,
  Button,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { getCountries } from '../services/lookupService';
import { useSearchParams } from 'react-router-dom';
import { v4 } from 'uuid';

interface CheckboxFilterProperties {
  name: string;
  options: any;
  onChangeFilterType: (countries: any) => void;
}

const CheckboxFilter: FC<CheckboxFilterProperties> = ({
  name,
  options,
  onChangeFilterType,
}) => {
  const [selectedFilterOptions, setSelectedFilterOptions] = useState([] as any);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeFilterType = (filterType: any) => {
    onChangeFilterType(filterType);
  };

  const handleOnChange = (e: any, name: string) => {
    if (e.target.checked) {
      setSelectedFilterOptions((selectedFilterOptions: any) => [
        ...selectedFilterOptions,
        e.target.value,
      ]);
      setSearchParams({ [name]: [...selectedFilterOptions, e.target.value] });
    } else {
      setSelectedFilterOptions((selectedFilterOptions: any) => [
        ...selectedFilterOptions.filter(
          (option: any) => option !== e.target.value
        ),
      ]);
      setSearchParams({
        [name]: [
          ...selectedFilterOptions.filter(
            (option: any) => option !== e.target.value
          ),
        ],
      });
    }
  };

  useEffect(() => {
    if (name === 'country') {
      (async () => {
        const countries = await getCountries();

        handleChangeFilterType(countries);
      })();
    }
  }, [name]);

  return (
    <React.Fragment>
      <Menu>
        <MenuButton
          as={Button}
          px={4}
          py={2}
          mr={6}
          my={2}
          transition='all 0.2s'
          borderRadius='md'
          borderWidth='1px'
          rightIcon={<ChevronDownIcon />}
        >
          Filter by {name}
        </MenuButton>
        <MenuList maxW={'container.lg'}>
          {options && (
            <CheckboxGroup>
              <Grid templateColumns='repeat(5, 1fr)' gap={1} px={2}>
                {options.map((option: any) => {
                  return (
                    <GridItem key={option.id}>
                      <Checkbox
                        colorScheme='teal'
                        value={option.value}
                        onChange={e => handleOnChange(e, name)}
                      >
                        {option.value}
                      </Checkbox>
                    </GridItem>
                  );
                })}
              </Grid>
            </CheckboxGroup>
          )}
        </MenuList>
      </Menu>
      {selectedFilterOptions &&
        selectedFilterOptions.map((option: any) => {
          return (
            <Button
              as={Tag}
              key={v4()}
              size={'sm'}
              variant='solid'
              colorScheme='teal'
              mr={3}
              my={2}
            >
              <TagLabel>{option}</TagLabel>
              {/* <TagCloseButton /> */}
            </Button>
          );
        })}
    </React.Fragment>
  );
};

export default CheckboxFilter;
