import styled from 'styled-components/native';
import { Platform } from 'react-native';
import colors from '../../styles/colors';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center
`;

export const Container = styled.View`
  flex: 1;
  padding-top: 24px;
  justify-content: center;
  padding: 0 16px ${Platform.OS === 'android' ? 100 : 40}px;
  background-color: ${colors.background};
`;

export const Title = styled.Text`
  font-size: 20px;
  margin: 24px 0 24px;
  text-align: left;
`;
