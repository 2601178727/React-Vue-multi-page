# 参考： https://github.com/cnu4/Webpack-Vue-MultiplePage/tree/v1

#### 开发

**开发只需关注source文件夹**

- 新建页面请拷贝a-defaultPage后修改文件名
- 一个页面对应一个文件夹下的index文件

#### 热更新
```
npm run dev
```

**访问地址：http://localhost:8080/message**
> 新建页面后需要重启热更新

#### 部署
```
npm run build
```

> http://[IP]/dist/view/message/


#### 插件 - index.js下引入
##### mint-UI
```
import 'mint-ui/lib/style.min.css'
import Mint from 'mint-ui'
Vue.use(Mint)
```

##### vuelidate
```
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
```