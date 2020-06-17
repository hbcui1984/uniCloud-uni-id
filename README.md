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





## 数据表设计



### 用户表

表名：uni-id-users


|字段			|类型		|必填	|描述									|
|--				|--			|--		|--										|
|_id			|Object ID	|是		|存储文档ID（用户ID），系统自动生成		|
|username		|String		|是		|用户名，不允许重复						|
|password		|String		|否		|密码，加密存储							|
|status			|Integer	|是		|用户状态：0正常 1禁用 2审核中 3审核拒绝|
|mobile			|String		|否		|手机号码								|
|mobileConfirmed|Integer	|否		|手机号验证状态：0未验证 1已验证		|
|email			|String		|否		|邮箱地址								|
|emailConfirmed	|Integer	|否		|邮箱验证状态：0未验证 1已验证			|
|avatar			|String		|否		|头像地址								|
|realNameAuth	|Object		|否		|实名认证信息								|
|register_at	|Timestamp	|否		|注册时间								|
|register_ip	|String		|否		|注册时IP地址							|
|last_login_at	|Timestamp	|否		|最后登录时间							|
|last_login_ip	|String		|否		|最后登录时IP地址						|

**realNameAuth 字段定义**

|字段			|类型	|必填	|描述											|
|--				|--		|--		|--												|
|type			|Integer|是		|用户类型：0个人用户 1企业用户					|
|authStatus		|Integer|是		|认证状态：0未认证 1等待认证 2认证通过 3认证失败|
|realName		|String	|否		|真实姓名/企业名称								|
|identity		|String	|否		|身份证号码/营业执照号码						|
|idCardFront	|String	|否		|身份证正面照URL								|
|idCardBack		|String	|否		|身份证反面照URL								|
|idCardInHand	|String	|否		|手持身份证照片URL								|
|license		|String	|否		|营业执照URL									|
|contactPerson	|String	|否		|联系人姓名										|
|contactMobile	|String	|否		|联系人手机号码									|
|contactEmail	|String	|否		|联系人邮箱										|

用户集合示例：

```
{
  "_id": "f2a60d815ee1da3900823d45541bb162",
  "username": "姓名"
  "password": "503005d4dd16dd7771b2d0a47aaef927e9dba89e",
  "status":0,//用户状态：0正常 1禁用 2审核中 3审核拒绝
  "mobile":"",
  "mobile_confirmed":0, //手机号是否验证，0为未验证，1为已验证
  "email":"amdin@domain.com",
  "email_confirmed":0, //邮箱是否验证，0为未验证，1为已验证
  "avatar":"https://cdn.domain.com/avatar.png"
  "register_ip": "123.120.11.128", //注册IP
  "last_login_ip": "123.120.11.128", //最后登录IP 
  
}
```

### 短信验证码

// TODO 验证码是通用业务，表名前缀应该是什么？`uni-verify`

// 和`uni-id`模块如何耦合？`uni-id`依赖`uni-verify` ？

表名：`uni-verify-mobile-codes`


|字段		|类型		|必填	|描述									|
|--			|--			|--		|--										|
|_id		|Object ID	|是		|存储文档ID（验证码 ID），系统自动生成	|
|mobile		|String		|是		|手机号									|
|code		|String		|是		|验证码									|
|type		|Integer	|是		|验证类型：1注册 2登录 3支付			|
|state		|Integer	|是		|验证状态：0未验证 1已验证				|
|ip			|String		|否		|请求时IP地址							|
|created_at	|Timestamp	|否		|创建时间								|
|expired_at	|Timestamp	|否		|验证码过期时间							|

## 遗留问题

1. 账号类型：是否区分个人、公司账号？

2. 注册模式：

- 掘金：同时需填写手机号、邮箱、密码三项
- 知识星球：邮箱地址、密码、确认密码
- Keep：手机号获取验证码自动注册，注册登录流程合并

3. token 刷新机制


