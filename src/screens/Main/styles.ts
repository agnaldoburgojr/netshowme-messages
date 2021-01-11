import styled from 'styled-components/native';
import { Platform } from 'react-native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 64px 16px;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

export const Logo = styled.Image``;

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