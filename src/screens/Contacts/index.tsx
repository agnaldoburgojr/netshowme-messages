import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';
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

  useFocusEffect(()=> {
    contactService.get()
      .then(response => setContacts(response.reverse()))
      .finally(() => setLoading(false))
  })

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
            <Avatar source={{}}/>
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
              <CreationDate>{contact.date}</CreationDate>
              <FeatherIcon
                name='trash'
                size={20}
                color={colors.lightGrey}
              />
            </Footer>

          </ContactContainer>
        )}
      />
    </Container>
  )
}

export default Contacts;