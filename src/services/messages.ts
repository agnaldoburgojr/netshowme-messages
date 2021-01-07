import AsyncStorage from '@react-native-community/async-storage';
import { v4 as uuidv4 } from 'uuid'

type MessageType = {
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

export const save = async (data: Omit<MessageType, 'date' | 'id'>): Promise<MessageType | Error> => {
  try {
    const date = new Date()
    const messages = await get()
    const newMessage = {...data, date, id: uuidv4() }

    await AsyncStorage.setItem(MESSAGES_LIST, JSON.stringify([...messages, newMessage]))
    return newMessage
  } catch(err) {
    return new Error('Problem to save data')
  }
}

export default {
  save, get
}