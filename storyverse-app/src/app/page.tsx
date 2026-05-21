import { Dice5, Trees, Flame, Trophy, Sparkles, Users, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 导航栏 */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-cyan to-primary-blue flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
              Storyverse
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/start" className="text-slate-700 dark:text-slate-300 hover:text-primary-cyan transition-colors">
              随机开局
            </Link>
            <Link href="/forest" className="text-slate-700 dark:text-slate-300 hover:text-primary-cyan transition-colors">
              故事林
            </Link>
            <Link href="/profile" className="text-slate-700 dark:text-slate-300 hover:text-primary-cyan transition-colors">
              我的离谱
            </Link>
          </div>
        </nav>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero 区域 */}
        <section className="text-center max-w-3xl mx-auto mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                全球首个无限分支式文字接龙共创娱乐平台
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-slate-900 dark:text-white">今天你</span>
              <span className="bg-gradient-to-r from-primary-cyan via-primary-blue to-accent-purple bg-clip-text text-transparent">
                离谱了吗？
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
              一句话创造一个宇宙！基于离谱开头，大家共同续写，枝繁叶茂的故事树等你来探索
            </p>
          </div>

          {/* 大按钮区域 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              href="/start"
              className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-cyan to-primary-blue text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
              <Dice5 className="h-6 w-6 group-hover:animate-spin" />
              <span>🎲 随机开局</span>
              <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>

            <Link
              href="/forest"
              className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
              <Trees className="h-6 w-6" />
              <span>🌳 逛故事林</span>
              <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary-cyan">1,234</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">已生成故事分支</div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary-blue">5,678</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">累计离谱文字</div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-accent-purple">892</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">活跃创作者</div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-accent-pink">3,456</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">总点赞数</div>
            </div>
          </div>
        </section>

        {/* 热门主题板块 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Flame className="h-7 w-7 text-orange-500" />
            今日热门主题
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "当我的猫开始说话",
                description: "我的猫突然开口说话，说要和我谈谈关于投喂的问题",
                branches: 42,
                likes: 189,
                category: "搞笑",
                color: "from-yellow-400 to-orange-500"
              },
              {
                title: "死亡笔记快递",
                description: "我在厕所里捡到了一本死亡笔记，上面写着我的名字",
                branches: 28,
                likes: 156,
                category: "悬疑",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "外星人公司",
                description: "上班第一天，老板告诉我公司其实是外星人的秘密基地",
                branches: 35,
                likes: 212,
                category: "科幻",
                color: "from-blue-500 to-cyan-400"
              },
            ].map((story, idx) => (
              <Link
                key={idx}
                href={`/tree/${idx + 1}`}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${story.color}`}>
                      {story.category}
                    </div>
                  </div>
                  <div className="text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
                    {idx === 0 ? '🐱' : idx === 1 ? '📖' : '👽'}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {story.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                  {story.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Trees className="h-4 w-4" />
                      {story.branches} 分支
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      {story.likes} 点赞
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 离谱排行榜 */}
        <section className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Trophy className="h-7 w-7 text-accent-yellow" />
            离谱排行榜
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 最离谱作者 */}
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-cyan" />
                最离谱作者 TOP 5
              </h3>
              <div className="space-y-4">
                {[
                  { name: "离谱小王子", level: "宇宙级离谱王", score: 1254, avatar: "👑" },
                  { name: "沙雕大师", level: "沙雕大师", score: 987, avatar: "🤡" },
                  { name: "脑洞少女", level: "脑洞达人", score: 765, avatar: "👩‍🎨" },
                  { name: "反转专家", level: "反转之王", score: 543, avatar: "🔄" },
                  { name: "接龙新手", level: "离谱新手", score: 321, avatar: "🐣" },
                ].map((author, idx) => (
                  <Link
                    key={idx}
                    href={`/profile/${idx + 1}`}
                    className="block p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{author.avatar}</div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white group-hover:text-primary-cyan transition-colors">{author.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">{author.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary-blue">{author.score}</div>
                        <div className="text-xs text-slate-500">离谱值</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 最长故事树 */}
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Trees className="h-5 w-5 text-accent-purple" />
                最长故事树 TOP 5
              </h3>
              <div className="space-y-4">
                {[
                  { title: "我的猫开始统治世界", length: 234, branches: 89, avatar: "🐱👑" },
                  { title: "在13层电梯里的秘密", length: 189, branches: 67, avatar: "🛗👻" },
                  { title: "外卖来自前世", length: 156, branches: 54, avatar: "🍱👻" },
                  { title: "时间旅行者的早晨", length: 123, branches: 45, avatar: "⏰🧭" },
                  { title: "魔法火柴的诅咒", length: 98, branches: 32, avatar: "🔥🧙" },
                ].map((story, idx) => (
                  <Link
                    key={idx}
                    href={`/tree/${idx + 6}`}
                    className="block p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{story.avatar}</div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white group-hover:text-primary-cyan transition-colors">
                            {story.title}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <span>{story.length} 句</span>
                            <span>{story.branches} 分支</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-cyan transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p className="mb-2">Storyverse - 全球首个无限分支式文字接龙共创娱乐平台</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/about" className="hover:text-primary-cyan transition-colors">
                关于我们
              </Link>
              <Link href="/terms" className="hover:text-primary-cyan transition-colors">
                用户协议
              </Link>
              <Link href="/privacy" className="hover:text-primary-cyan transition-colors">
                隐私政策
              </Link>
              <Link href="/report" className="hover:text-primary-cyan transition-colors">
                内容举报
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
