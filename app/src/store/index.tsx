import React, {createContext, useContext, useReducer, Dispatch} from 'react'
import {IPosts} from '../services/api'
import {PostStatus} from '../components/PostPreview'

export enum Actions {
  updatePosts,
}
interface UpdatePostsAction {
  type: Actions.updatePosts
  payload: IPosts[]
}

interface ContextProps {
  postsState: IPosts[]
  dispatch: Dispatch<AuthReducerActions>
}

type AuthReducerActions = UpdatePostsAction

const initialState: IPosts[] = [
  {userId: 0, id: 0, title: '', body: '', status: PostStatus.regular},
]
const StoreContext = createContext({} as ContextProps)

const reducer = (postsState: IPosts[], action: AuthReducerActions) => {
  switch (action.type) {
    case Actions.updatePosts:
      return [...action.payload]
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
