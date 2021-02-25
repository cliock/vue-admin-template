const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  demo: {
    token: 'demo-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'demo-token': {
    menu: [
      {
        name: '测试测试测试',
        key: 'test',
        children: [
          {name: '效果展示', key: 'one'},
          {name: '随便写', key: 'two'}
        ]
      },
      {
        name: '设备',
        key: 'device',
        icon: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        children: []
      },
      {
        name: '三次测试',
        key: 'table',
        children: [
          {name: '测试显示菜单', key: 'aaa'},
          {name: '测试显示菜单', key: 'test'}
        ]
      }
    ],
    from: {
      'device': [
        {
          'type': 'text',
          'label': '设备名称',
          'key': 'name',
          'require': true
        },
        {
          'type': 'select',
          'label': '当前状态',
          'option': [
            {'label': '正常', value: 'normal'},
            {'label': '损坏', value: 'bad'}
          ]
        },
        {
          'type': 'select',
          'label': '厂家',
          'option': [
            {'label': '广州', value: 'normal'},
            {'label': '北京', value: 'bad'}
          ]
        },
        {
          'type': 'text',
          'label': '禁止输入',
          'key': 'test',
          'disabled': true
        },
      ]
    },
    introduction: 'I am a super demo',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'demo'
  }
}

module.exports = [
  // user login
  {
    url: '/project-api/api/user/login',
    type: 'post',
    response: config => {
      const {userName} = config.body
      const token = tokens[userName]
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const {token} = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }

]
