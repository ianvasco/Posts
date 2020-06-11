import React, {createContext, useContext, useReducer, Dispatch} from 'react'
import {IPosts} from '../services/api'
import {PostStatus} from '../components/PostPreview'

export enum Actions {
  updatePosts,
  deletePosts,
}
interface UpdatePostsAction {
  type: Actions.updatePosts
  payload: IPosts[]
}

interface DeletePostsAction {
  type: Actions.deletePosts
}

interface ContextProps {
  postsState: IPosts[]
  dispatch: Dispatch<AuthReducerActions>
}

type AuthReducerActions = UpdatePostsAction | DeletePostsAction

const initialState: IPosts[] = []
const StoreContext = createContext({} as ContextProps)

const reducer = (postsState: IPosts[], action: AuthReducerActions) => {
  switch (action.type) {
    case Actions.updatePosts:
      return [...action.payload]
    case Actions.deletePosts:
      return []
    default:
      throw new Error('action type does not exist')
  }
}

export const StoreProvider = ({children}: any) => {
  const [postsState, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{postsState, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
