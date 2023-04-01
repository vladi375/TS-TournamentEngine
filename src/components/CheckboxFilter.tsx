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
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { getCountries } from '../services/lookupService';
import { useSearchParams } from 'react-router-dom';

interface CheckboxFilterProperties {
  name: string;
}

const CheckboxFilter: FC<CheckboxFilterProperties> = ({ name }) => {
  const [countries, setCountries] = useState([] as any);
  const [selectedCountries, setSelectedCountries] = useState([] as any);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChange = (e: any) => {
    if (!selectedCountries.includes(e.target.value)) {
      setSelectedCountries((selectedCountries: any) => [
        ...selectedCountries,
        e.target.value,
      ]);
      setSearchParams({ country: [...selectedCountries, e.target.value] });
    } else {
      setSelectedCountries((selectedCountries: any) => [
        ...selectedCountries.filter(
          (country: any) => country !== e.target.value
        ),
      ]);
      setSearchParams({
        country: [
          ...selectedCountries.filter(
            (country: any) => country !== e.target.value
          ),
        ],
      });
    }
  };

  useEffect(() => {
    (async () => {
      const countries = await getCountries();

      setCountries(countries);
    })();
  }, []);

  return (
    <Menu>
      <MenuButton
        as={Button}
        px={4}
        py={2}
        transition='all 0.2s'
        borderRadius='md'
        borderWidth='1px'
        rightIcon={<ChevronDownIcon />}
      >
        Filter by Country
      </MenuButton>
      <MenuList maxW={'container.lg'}>
        {countries && (
          <CheckboxGroup>
            <Grid templateColumns='repeat(5, 1fr)' gap={1} px={2}>
              {countries.map((country: any) => {
                return (
                  <GridItem key={country.id}>
                    <Checkbox
                      colorScheme='teal'
                      value={country.value}
                      onChange={e => handleOnChange(e)}
                    >
                      {country.value}
                    </Checkbox>
                  </GridItem>
                );
              })}
            </Grid>
          </CheckboxGroup>
        )}
      </MenuList>
    </Menu>
  );
};

export default CheckboxFilter;
