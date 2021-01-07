import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import colors from '../../styles/colors';
import messages, { MessageType } from '../../services/messages'
import { LoadingContainer, Container, } from './styles'

const MessageListScreen: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [messagesList, setMessagesList] = useState<MessageType[]>([])

  useEffect(()=> {
    messages.get()
      .then(response => setMessagesList(response))
      .finally(() => setLoading(false))
  }, [])

  return isLoading ? (
    <LoadingContainer>
      <ActivityIndicator size="large" color={colors.primary}/>
    </LoadingContainer>
  ) : (
    <Container>
      <FlatList
        data={messagesList}
        keyExtractor={message => message.id}
        renderItem={({item: message})=> (<Text>{message.name}</Text>)}
      />

     
    </Container>
  )
}

export default MessageListScreen;