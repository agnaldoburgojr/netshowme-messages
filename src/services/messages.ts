import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid-random';

export type MessageType = {
  id: string,
  name: string,
  email: string,
  phone: string,
  message: string,
  date: Date
}

const MESSAGES_LIST = '@NetshowmeMessages:list'

export const get = async (): Promise<MessageType[]> => {
  const messagesList = await AsyncStorage.getItem(MESSAGES_LIST)
  return messagesList ?JSON.parse(messagesList) : [] as MessageType[]
}

export const save = async (data: Omit<MessageType, 'id' | 'date'>): Promise<MessageType | Error> => {
  try {
    const date = new Date()
    const messages = await get()
    const newMessage = {...data, date, id: uuid() }

    await AsyncStorage.setItem(MESSAGES_LIST, JSON.stringify([...messages, newMessage]))
    return newMessage
  } catch(err) {
    throw new Error('Problem to save data')
  }
}

export default {
  save, get
}