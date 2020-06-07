# auto-template-html

auto.pro 的 html 模板，带有极简的通讯示例

# Usage

首次安装

```
npm i
```

生成 build 文件夹并监听 src 的变化

```
npm start
```

F1 + 运行项目，即可在模拟器或手机上运行本项目

## html 相关

如果不需要本地 html，可以注释掉`config/index.js`文件的`htmlConfig`，`system/index.js`里的`run`可直接用线上网站地址  
html 的本地源码可以在`src/html`文件夹内编写，已经做好打包处理

## 通讯

html 通过`prompt`函数向 auto 发送事件，`prompt`要携带参数的话必须给参数加上`JSON.stringify`处理（如示例）  
auto 通过`wv.on('xxx', Function)`来监听事件，耗时操作需要开新线程  
auto 可通过`wv.runHtmlFunction('xxx')`来执行 html 的函数，并得到一个`Promise`类型的返回值  
由于本程序添加了代码混淆处理，请确保执行时能找到正确的函数名（如挂载到 html 的`window```上）

# LICENSE

MIT
