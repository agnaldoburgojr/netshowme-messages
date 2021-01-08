import React, { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';
import formatDate from '../../utils/formatDate'
import contactService, { ContactType } from '../../services/contacts'
import { 
  LoadingContainer, 
  Container,
  ContactsList,
  ContactContainer,
  Avatar,
  Name,
  Message,
  MessageText,
  Quotes1,
  Quotes2,
  Email,
  EmailText,
  Phone,
  PhoneText,
  Footer,
  CreationDate,
  Icon,
} from './styles'

const Contacts: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<ContactType[]>([])

  useFocusEffect(
    useCallback(() => {
      contactService.get()
      .then(response => setContacts(response.reverse()))
      .finally(() => setLoading(false))
    }, [])
  )

  const deleteContact = useCallback(async (id: string) => {
    const newContacts = contacts.filter(contact => contact.id !== id)
    await contactService.update(newContacts)
    setContacts(newContacts)
  }, [])

  const formattedDate = useCallback((date: string): string => {
    return `Criado em ${formatDate(date)}`
  }, []);
  
  return isLoading ? (
    <LoadingContainer>
      <ActivityIndicator size="large" color={colors.primary}/>
    </LoadingContainer>
  ) : (
    <Container>
      <ContactsList
        data={contacts}
        keyExtractor={(contact: any) => contact.id}
        renderItem={({item: contact}: any)=> (
          <ContactContainer>
            <Avatar source={{uri: contact.avatarUri}}/>
            <Name>{contact.name}</Name>
            <Message>
              <Quotes1>"</Quotes1>
              <MessageText>{contact.message}</MessageText>
              <Quotes2>"</Quotes2>
            </Message>
            <Email>
              <Icon
                name='mail'
                size={14}
                color={colors.accent}
              />
              <EmailText>{contact.email}</EmailText>
            </Email>
            <Phone>
              <Icon
                name='phone'
                size={14}
                color={colors.accent}
              />
              <PhoneText>{contact.phone}</PhoneText>
            </Phone>
            <Footer>
              <CreationDate>{formattedDate(contact.date)}</CreationDate>
              <TouchableOpacity onPress={() => deleteContact(contact.id)}>
                <FeatherIcon
                  name='trash'
                  size={20}
                  color={colors.lightGrey}
                />
              </TouchableOpacity>
            </Footer>
          </ContactContainer>
        )}
      />
    </Container>
  )
}

export default Contacts;