import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  // FormHelperText,
  Input,
} from '@chakra-ui/react';

import { Field } from 'formik';

interface CustomFieldProperties {
  fieldLabel: string;
  fieldName: string;
  inputType: string;
  placeholder: string;
  marginTop?: string;
}

const CustomField = ({
  fieldLabel,
  fieldName,
  inputType,
  placeholder,
  marginTop,
}: any) => {
  const validateField = (value: string) => {
    let error;
    if (!value) {
      error = 'Name is required';
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  };

  return (
    <Field name={fieldName} validate={validateField}>
      {({ field, form }: any) => (
        <FormControl mt={marginTop}>
          <FormLabel>{fieldLabel}:</FormLabel>
          <Input type={inputType} placeholder={placeholder} {...field} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomField;
