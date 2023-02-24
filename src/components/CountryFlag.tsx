import { Image } from '@chakra-ui/react';

interface CountryFlagProps {
  countryCode: string;
}

const CountryFlag = ({ countryCode }: CountryFlagProps) => {
  return (
    <Image
      boxShadow={'0 0 0 1px rgba(0, 0, 0, 0.1)'}
      width={'1rem'}
      src={require(`../assets/flags/${countryCode}.svg`)}
    />
  );
};

export default CountryFlag;
