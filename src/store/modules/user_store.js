export default {
  state: {
    userId: "123456",
    userName: "ibwei",
    openId: "456456df5sd5fd",
    avatarUrl:'https://www.ibwei.com/images/question.png',
  },
  mutations: {
    writeUserOpenId(state,openId) {
      state.openId = openId
    },
    writeUserName(state,userName) {
      state.userName= userName
    },
    writeUserId(state,userId) {
      state.userId = userId
    }
  }
}

