/**
 * 三道 CTF 题的配置。
 *
 * - content：题干内容，支持使用 \n 换行。
 * - flagHash：正确答案的 SHA-256 哈希，仓库中不保存明文答案。
 *
 * 生成哈希：
 * printf '%s' 'flag{your_answer}' | shasum -a 256
 *
 * 注意：纯前端哈希校验可以避免直接暴露明文 flag，但无法抵御离线枚举。
 * 对安全性要求较高的正式比赛，应改为服务端校验。
 */
const quizConfig = [
  {
    id: 1,
    title: "梦中的景色",
    content: "Attitly 旅游时候随手拍（薅）的照片，你知道这是哪里吗？",
    flagHash: "ac8254189ac31e92dbd07d54f53fa307b626f3b860702800b277bd31c3e6cac6",
  },
  {
    id: 2,
    title: "漂亮的回旋踢！",
    content: [
      "EMT 在拳皇中使用火舞杀的",
      "天翻地覆的时候，遇到了一",
      "个五秒四酒的杰米，被回旋",
      "踢踢得蒙头转向，胡言乱语",
      "下画了一个神秘二维码，你",
      "知道他到底想说什么吗？",
    ].join("\n"),
    flagHash: "feda20f37531a489304d37a2b31f92b5a736e33a0d41b11e2aac7da5bc5ebece",
  },
  {
    id: 3,
    title: "嘟嘟咯嘟嘟唔",
    content: [
      "嘟嗒嗒嘟嘟嘟嗒嗒",
      "嘟嗒嘟嘟嘟嗒 嗒嘟",
      "嗒嘟嘟 嘟嗒嘟嘟嗒",
      "嗒嗒 嘟嘟嘟嗒嘟",
    ].join("\n"),
    flagHash: "3862956598ba9ed452f3d288aed5721278ef2c273b2ec531bcbbfce52c4be0f1",
  },
];
