import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
`;

export const ContactContainer = styled.View`
  background-color: ${colors.white};
  padding: 24px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, .2);
  margin-bottom: 8px;
  height: 360px;
`;

export const Avatar = styled.Image`
  background-color: ${colors.accent};
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center; 
`;

export const Name = styled.Text`
  margin-top: 4px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;

export const Message = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0 12px;
  margin-bottom: 28px;
`;

export const MessageText = styled.Text`
  font-size: 20px;
  font-style: italic;
  color: ${colors.darkGrey};
  margin: 8px 0;
  
  text-align: center;
`;

export const FirstQuotes = styled.Text`
  margin-right: 8px;
  font-size: 36px;
  color: ${colors.primary};
`;

export const LastQuotes = styled.Text`
  margin-left: 8px;
  font-size: 36px;
  color: ${colors.primary};
`;

export const Email = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const EmailText = styled.Text``;

export const Phone = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const PhoneText = styled.Text``;

export const Footer = styled.View`
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CreationDate = styled.Text`
  color: ${colors.lightGrey}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;