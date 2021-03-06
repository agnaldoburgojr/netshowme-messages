import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid-random';

export type ContactType = {
  id: string,
  name: string,
  email: string,
  phone: string,
  message: string,
  avatarUri: string,
  date: Date
}

const CONTACTS_LIST = '@NetshowmeContacts:list'

export const get = async (): Promise<ContactType[]> => {
  const contacts = await AsyncStorage.getItem(CONTACTS_LIST)
  return contacts ?JSON.parse(contacts) : [] as ContactType[]
}

export const save = async (data: Omit<ContactType, 'id' | 'date'>): Promise<ContactType> => {
  try {
    const date = new Date()
    const contacts = await get()
    const newContact = {...data, date, id: uuid() }

    await AsyncStorage.setItem(CONTACTS_LIST, JSON.stringify([...contacts, newContact]))
    return newContact
  } catch(err) {
    throw new Error('Problem to save data')
  }
}

export const update = async(list: ContactType[]): Promise<null> => {
  await AsyncStorage.setItem(CONTACTS_LIST, JSON.stringify(list))
  return null
}

export default {
  save, get, update
}