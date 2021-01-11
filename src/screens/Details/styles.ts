import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 16px ${Platform.OS === 'android' ? 100 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin: 24px 0 24px;
  text-align: left;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 84px;
`;

export const ContainerContact = styled.View`
  flex: 1;
`;
