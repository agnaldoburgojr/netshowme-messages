import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Error } from './styles';

interface InputProps extends TextInputProps {
  containerStyle?: {};
  error?: string
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { error = '', containerStyle = {}, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
 
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  return (
    <>
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error} hasMultline={rest.multiline || false}>
      <TextInput
        {...rest}
        ref={inputElementRef}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      </Container>
      {!!error && <Error>{error}</Error>}
    </>
  );
};

export default forwardRef(Input);
