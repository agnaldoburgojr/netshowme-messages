import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import colors from '../../styles/colors';
import contactService, { ContactType } from '../../services/contacts'
import { 
  LoadingContainer, 
  Container,
  ContactsList,
  ContactContainer,
} from './styles'
import { ContactItem } from '../../components'

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
  }, [contacts])

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
            <ContactItem 
               id={contact.id}
               avatarUri={contact.avatarUri}
               name={contact.name}
               message={contact.message}
               email={contact.email}
               phone={contact.phone}
               date={contact.date}
               isDeletable={true}
               deleteSelf={deleteContact}
            />
          </ContactContainer>
        )}
      />
    </Container>
  )
}

export default Contacts;