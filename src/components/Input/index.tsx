import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import { useState, useEffect, useCallback } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";

import { ForwardRefRenderFunction, forwardRef } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}
type inputVariationOptions = {
  [key: string]: string;
};
const inputVariation: inputVariationOptions = {
  error: "error",
  default: "gray",
  focus: "gray",
  filled: "secondary",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, icon: Icon, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [variation, setVariation] = useState("default");

  useEffect(() => {
    if (error) {
      setVariation("error");
    }
  }, [error]);
  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation("focus");
    }
  }, [error]);
  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl marginBottom="0px" isInvalid={!!error}>
      {!!label && <FormLabel>{label}</FormLabel>}

      <InputGroup flexDirection="column">
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} mt="2.5">
            <Icon />
          </InputLeftElement>
        )}
        <ChakraInput
          name={name}
          bg="gray.50"
          variant="outline"
          _hover={{ bgColor: "#e0e0e0" }}
          _placeholder={{ color: "text" }}
          size="lg"
          h={["50px", "60px", "60px"]}
          color={inputVariation[variation]}
          borderColor={inputVariation[variation]}
          ref={ref}
          onFocus={handleInputFocus}
          onBlurCapture={handleInputBlur}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          {...rest}
        />
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
