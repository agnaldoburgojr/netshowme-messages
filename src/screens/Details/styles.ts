import styled from 'styled-components/native'
import { Platform } from 'react-native'
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 16px ${Platform.OS === 'android' ? 100 : 40}px;
  background-color: ${colors.background}
`;

export const BackButton = styled.TouchableOpacity`
  margin: 64px 0 84px;
  
`;

export const ContainerContact = styled.View`
  flex: 1;
  padding: 0 24px;
`;
