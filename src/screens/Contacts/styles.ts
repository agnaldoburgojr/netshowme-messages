import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center
`;

export const Container = styled.View`
  flex: 1;
  padding-top: 40px;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  height: 50px;
  justify-content: center;
  align-items: center
`;

export const ContactsList = styled.FlatList`
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

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center
`;

export const EmptyText = styled.Text`
  color: ${colors.lightGrey};
  margin: 12px 0 24px;
  text-align: center;
`;