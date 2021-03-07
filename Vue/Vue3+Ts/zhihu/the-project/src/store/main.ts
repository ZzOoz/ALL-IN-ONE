import { createStore } from 'vuex'
import { testData, testPosts, PostProps, ColumnProps } from '@/testData'

interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
    columnId?: number;
}

export interface GlobalProps {
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
}

const store = createStore<GlobalProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false, columnId: 1 }
  },
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find(column => column.id === id)
    },
    getPostByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'Yteng' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  }
})

export default store
