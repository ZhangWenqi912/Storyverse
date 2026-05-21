const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const promptTemplates = [
  { content: "我在厕所里捡到了一本死亡笔记，上面写着我的名字", category: "搞笑" },
  { content: "上班第一天，老板告诉我公司其实是外星人的秘密基地", category: "搞笑" },
  { content: "买彩票中奖后，我发现号码是我昨晚梦到的车牌号", category: "搞笑" },
  { content: "我的猫突然开口说话，说要和我谈谈关于投喂的问题", category: "搞笑" },
  { content: "快递员送来一个箱子，打开后发现是十年前消失的我", category: "搞笑" },
  { content: "凌晨三点，我收到一条短信：别回头，他在你身后", category: "悬疑" },
  { content: "电梯停在13层，但这栋楼只有12层", category: "悬疑" },
  { content: "镜子里的我，做了一个我没有做的动作", category: "悬疑" },
  { content: "邻居每晚准时敲墙三下，直到今晚变成了四下", category: "悬疑" },
  { content: "我发现日记里多了一页，上面写着我明天会死", category: "悬疑" },
  { content: "系统提示：地球副本即将关闭，请做好准备", category: "科幻" },
  { content: "我醒来发现自己成了AI，而AI成了我", category: "科幻" },
  { content: "时间旅行者告诉我，我明天会改变历史", category: "科幻" },
  { content: "手机突然显示：来自2077年的来电", category: "科幻" },
  { content: "新闻说太阳今天罢工了，全世界陷入永恒黑夜", category: "科幻" },
  { content: "卖火柴的小女孩其实卖的是魔法火柴", category: "奇幻" },
  { content: "我被选为勇者，但魔王是我的高中班主任", category: "奇幻" },
  { content: "龙突然出现在城市中心，但它只是想吃火锅", category: "奇幻" },
  { content: "精灵说我的猫其实是她变的，因为偷吃了魔法果实", category: "奇幻" },
  { content: "我在二手书店买了一本书，书里夹着一封来自魔法世界的信", category: "奇幻" },
  { content: "便利店老板说今天的特价商品是'后悔'", category: "日常" },
  { content: "下雨天，所有人都撑伞，只有我头顶有一朵云", category: "日常" },
  { content: "我的手机壁纸突然变成了我十年后的照片", category: "日常" },
  { content: "公交车司机突然说：下一站，你们的人生终点", category: "日常" },
  { content: "外卖小哥送餐时说：这是你前世订的餐", category: "日常" },
];

const achievements = [
  { name: "初来乍到", description: "注册成为离谱宇宙居民", icon: "🌟", condition: "注册账号" },
  { name: "第一句话", description: "写下人生中第一句离谱接龙", icon: "✍️", condition: "发布第一个接龙" },
  { name: "分支大师", description: "创造了一个分支点", icon: "🌿", condition: "第一个节点被他人接龙" },
  { name: "百赞神句", description: "一句话获得100个点赞", icon: "🔥", condition: "单节点点赞数达到100" },
  { name: "故事林守护者", description: "创造了10个故事树", icon: "🌳", condition: "创建10个根节点" },
  { name: "宇宙级离谱王", description: "获得1000个点赞", icon: "👑", condition: "累计点赞数达到1000" },
  { name: "收藏家", description: "收藏了50个故事树", icon: "📚", condition: "收藏数达到50" },
  { name: "评论达人", description: "留下了100条评论", icon: "💬", condition: "评论数达到100" },
];

async function main() {
  console.log("开始 seeding...");

  await prisma.promptTemplate.deleteMany();
  await prisma.achievement.deleteMany();

  for (const template of promptTemplates) {
    await prisma.promptTemplate.create({ data: template });
  }
  console.log(`已添加 ${promptTemplates.length} 个离谱开头模板`);

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
  }
  console.log(`已添加 ${achievements.length} 个成就徽章`);

  console.log("Seeding 完成!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });