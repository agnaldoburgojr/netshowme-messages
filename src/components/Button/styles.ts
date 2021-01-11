import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import colors from '../../styles/colors';

export const Container = styled(RectButton)`
  width: 100%;
  height: 52px;
  background: ${colors.primary};
  border-radius: 4px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
`;