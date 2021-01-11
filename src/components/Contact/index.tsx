import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import VMasker from 'vanilla-masker';
import formatDate from '../../utils/formatDate'
import colors from '../../styles/colors';
import { 
  Container, 
  Avatar, 
  Name, 
  Message, 
  FirstQuotes,
  LastQuotes,
  MessageText,
  Email,
  Icon,
  EmailText,
  Phone,
  PhoneText,
  Footer,
  CreationDate
} from './styles';

interface Contact {
  id: string,
  avatarUri: string,
  name: string,
  message: string,
  email: string,
  phone: string,
  date: string,
  isDeletable?: boolean,
  deleteSelf?: (id: string) => {}
}

const Contact: React.FC<Contact> = ({
  id,
  avatarUri,
  name,
  message,
  email,
  phone,
  date,
  isDeletable = false,
  deleteSelf = () => {}
}) => {
  const formattedDate = useCallback((date: string): string => {
    return `Criado em ${formatDate(date)}`
  }, []);

  const formattedPhone = useCallback((value: string): string => {
    if(!value) return ''
    return value.length === 10 
      ? VMasker.toPattern(value, '(99) 9999-9999')
      : VMasker.toPattern(value, '(99) 99999-9999')
  }, []);

  return (
    <Container>
      <Avatar source={{uri: avatarUri}}/>
        <Name>{name}</Name>
        <Message>
          <FirstQuotes>"</FirstQuotes>
          <MessageText>{message}</MessageText>
          <LastQuotes>"</LastQuotes>
        </Message>
        <Email>
          <Icon
            name='mail'
            size={14}
            color={colors.accent}
          />
          <EmailText>{email}</EmailText>
        </Email>
        <Phone>
          <Icon
            name='phone'
            size={14}
            color={colors.accent}
          />
          <PhoneText>{formattedPhone(phone)}</PhoneText>
        </Phone>
        <Footer>
          <CreationDate>{formattedDate(date)}</CreationDate>
          {isDeletable && (
            <TouchableOpacity onPress={() => deleteSelf(id)}>
              <FeatherIcon
                name='trash'
                size={20}
                color={colors.lightGrey}
              />
            </TouchableOpacity>
          )}
        </Footer>
    </Container>
  )
}

export default Contact;