import styled, { css } from 'styled-components/native';
import colors from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  hasMultline: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${props => props.hasMultline ? 84 : 52 }px;
  padding: 0 16px;
  background: ${colors.white};
  border-radius: 4px;
  margin-bottom: 8px;
  border-width: 1.5px;
  border-color: ${colors.primary};

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.error};
      border-width: 2.0px;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.accent};
      border-width: 2.0px;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Error = styled.Text`
  margin-top: -8px;
  margin-bottom: 12px;
  padding: 0 12px;
  color: ${colors.error}
`

