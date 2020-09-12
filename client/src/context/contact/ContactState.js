import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import axios from 'axios'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACT
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);
  const url = 'http://contact-keeper-app-2020';

  // Get contact
  const getContact = async () => {
    try {
      const res = await axios.get(`${url}/api/contacts`);
      dispatch({ type: GET_CONTACTS, payload: res.data })
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
    }
  }

  // Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      const res = await axios.post(`${url}/api/contacts`, contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data })
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
    }
  }

  // Delete contact
  const deleteContact = async id => {
    try {
      const res = await axios.delete(`${url}/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id })
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
    }
  }

  // Update  contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`${url}/api/contacts/${contact._id}`, contact, config);
      dispatch({ type: UPDATE_CONTACT, payload: res.data })
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
    }
  }

  // Set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACT })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        setCurrent,
        clearCurrent,
        addContact,
        deleteContact,
        updateContact,
        filterContacts,
        getContact,
        clearFilter,
        clearContacts
      }}>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState