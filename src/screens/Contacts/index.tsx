import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import colors from '../../styles/colors';
import contactService, { ContactType } from '../../services/contacts'
import { LoadingContainer, Container, } from './styles'

const Contacts: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<ContactType[]>([])

  useEffect(()=> {
    contactService.get()
      .then(response => setContacts(response))
      .finally(() => setLoading(false))
  }, [])

  return isLoading ? (
    <LoadingContainer>
      <ActivityIndicator size="large" color={colors.primary}/>
    </LoadingContainer>
  ) : (
    <Container>
      <FlatList
        data={contacts}
        keyExtractor={contact => contact.id}
        renderItem={({item: contact})=> (<Text>{contact.name}</Text>)}
      />

     
    </Container>
  )
}

export default Contacts;