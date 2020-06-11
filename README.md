# uniCloud-uni-id


## 用户注册

```
uniCloud.callFunction({
    name: 'uni-id',
    data: {
        action:'register',
        params:{
            username: '小吕',
            password:'123456'
        }
    },
    success(e) {
        uni.showModal({
            content: JSON.stringify(e.result)
        })
    },
    fail(e) {
        uni.showModal({
            content: JSON.stringify(e)
        })
    }
})
```


## 用户登录

**示例代码：**

```
uniCloud.callFunction({
    name: 'uni-id',
    data: {
        action:'login',
        params:{
            username: '小吕',
            password:'123456'
        }
    },
    success(e) {
        uni.setStorageSync('uni_token',e.result.token)
        uni.setStorageSync('uid',e.result.uid)
    },
    fail(e) {
        uni.showModal({
            content: JSON.stringify(e)
        })
    }
})
```

## 用户退出

```
uniCloud.callFunction({
    name: 'uni-id',
    data: {
        action:'logout',
        params:{
            uid: '',
        },
        uni-id-token:''
    },
    success(e) {
        uni.removeStorageSync('token',e.result.token)
        uni.removeStorageSync('uid',e.result.uid)
    },
    fail(e) {
        uni.showModal({
            content: JSON.stringify(e)
        })
    }
})
```


## 修改密码

```
uniCloud.callFunction({
    name: 'uni-id',
    data: {
        action:'upatePassword',
        params:{
            uid: '',
            oldPassword:'1234',
            newPassword:'5678',
            password_confirmation:'5678'
        },
        uni-id-token:''
    },
    success(e) {
    },
    fail(e) {
        uni.showModal({
            content: JSON.stringify(e)
        })
    }
})
```


## 设置头像

```
uniCloud.callFunction({
    name: 'uni-id',
    data: {
        action:'setAvatar',
        params:{
            uid: '',
            token:'123456',
            avatar:''
        }
    },
    success(e) {
        
    },
    fail(e) {
        uni.showModal({
            content: JSON.stringify(e)
        })
    }
})
```



## 数据表示例数据

```
{
  "_id": "f2a60d815ee1da3900823d45541bb162",
  "username": "小吕"
  "password": "503005d4dd16dd7771b2d0a47aaef927e9dba89e",
  "mobile":"",
  "mobile_confirmed":0,
  "avatar":"https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/unicloudlogo.png"
  "register_ip": "123.120.11.128",
  "last_login_ip": "123.120.11.128",
  
}
```