import styled from 'styled-components/native';
import { Platform } from 'react-native';
import colors from '../../styles/colors';

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

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const UserAvatar = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: ${colors.primary};
  align-self: center;
`;

export const ImageError = styled.Text`
  margin-top: 16px;
  padding: 0 16px;
  text-align: center;
  color: ${colors.error}
`;