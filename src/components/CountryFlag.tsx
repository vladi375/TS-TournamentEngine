import { Image } from '@chakra-ui/react';

interface CountryFlagProps {
  countryCode: string;
  width: string;
}

const CountryFlag = ({ countryCode, width }: CountryFlagProps) => {
  return (
    <Image
      boxShadow={'0 0 0 1px rgba(0, 0, 0, 0.1)'}
      width={width}
      src={require(`../assets/flags/${countryCode}.svg`)}
    />
  );
};

export default CountryFlag;
