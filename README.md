# CTF 三题答题页

一个无依赖的静态 CTF 答题网页，共三道题。用户提交正确的 flag 后，页面会提示“回答正确”，并记录本题进度。

## 本地运行

直接打开 `index.html`，或在当前目录启动静态服务器：

```bash
python3 -m http.server 4173
```

然后访问 <http://127.0.0.1:4173/>。

## 配置题目和答案

编辑 `quiz-config.js` 中对应题目的 `content` 和 `flag` 字段：

```js
{
  id: 1,
  title: "第一题",
  content: "题目内容",
  flag: "flag{your_answer}",
}
```

> 当前实现是纯前端页面，答案会随源码发送到浏览器，仅适合练习或非正式场景。正式比赛应将答案校验迁移到服务端。

## GitHub Pages

站点通过 `main` 分支根目录发布。
