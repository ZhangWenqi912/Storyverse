"use client";

import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Heart,
  Award,
  PenLine,
  TreePine,
  Flame,
  Crown,
  Star,
  Trophy,
  Zap,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";

// 模拟用户数据
const userData = {
  name: "沙雕大师",
  level: "沙雕大师",
  levelNum: 5,
  avatar: "🤡",
  joinDate: "2026年1月",
  stats: {
    totalNodes: 156,
    totalBranches: 42,
    totalLikes: 1289,
    favorites: 23,
  },
};

// 模拟创作记录
const myCreations = [
  {
    id: 1,
    content: "外星人说他们来地球是为了开火锅店的",
    likes: 234,
    branches: 8,
    createdAt: "2小时前",
    storyTitle: "外星人公司",
  },
  {
    id: 2,
    content: "老板拿出一张宇宙地图，说这是公司的全球战略",
    likes: 189,
    branches: 5,
    createdAt: "5小时前",
    storyTitle: "外星人公司",
  },
  {
    id: 3,
    content: "我的猫说它其实是一个时间旅行者",
    likes: 456,
    branches: 12,
    createdAt: "1天前",
    storyTitle: "说话猫",
  },
  {
    id: 4,
    content: "电梯门打开后，我看到了另一个世界的自己",
    likes: 123,
    branches: 6,
    createdAt: "2天前",
    storyTitle: "13层电梯",
  },
];

// 模拟收藏
const myFavorites = [
  {
    id: 1,
    title: "时间旅行者的早晨",
    firstSentence: "时间旅行者告诉我，我明天会改变历史",
    branches: 56,
    likes: 345,
    color: "from-blue-500 to-cyan-400",
    avatar: "⏰",
  },
  {
    id: 2,
    title: "魔法火柴的诅咒",
    firstSentence: "卖火柴的小女孩其实卖的是魔法火柴",
    branches: 34,
    likes: 198,
    color: "from-green-400 to-emerald-500",
    avatar: "🔥",
  },
  {
    id: 3,
    title: "后悔便利店",
    firstSentence: "便利店老板说今天的特价商品是'后悔'",
    branches: 23,
    likes: 134,
    color: "from-pink-400 to-rose-500",
    avatar: "🍱",
  },
];

// 模拟成就
const achievements = [
  {
    name: "初来乍到",
    description: "注册成为离谱宇宙居民",
    icon: "🌟",
    condition: "注册账号",
    earned: true,
    earnedAt: "2026年1月",
  },
  {
    name: "第一句话",
    description: "写下人生中第一句离谱接龙",
    icon: "✍️",
    condition: "发布第一个接龙",
    earned: true,
    earnedAt: "2026年1月",
  },
  {
    name: "分支大师",
    description: "创造了一个分支点",
    icon: "🌿",
    condition: "第一个节点被他人接龙",
    earned: true,
    earnedAt: "2026年2月",
  },
  {
    name: "百赞神句",
    description: "一句话获得100个点赞",
    icon: "🔥",
    condition: "单节点点赞数达到100",
    earned: true,
    earnedAt: "2026年3月",
  },
  {
    name: "故事林守护者",
    description: "创造了10个故事树",
    icon: "🌳",
    condition: "创建10个根节点",
    earned: false,
    progress: 3,
    target: 10,
  },
  {
    name: "宇宙级离谱王",
    description: "获得1000个点赞",
    icon: "👑",
    condition: "累计点赞数达到1000",
    earned: false,
    progress: 1289,
    target: 10000,
  },
  {
    name: "收藏家",
    description: "收藏了50个故事树",
    icon: "📚",
    condition: "收藏数达到50",
    earned: false,
    progress: 23,
    target: 50,
  },
  {
    name: "评论达人",
    description: "留下了100条评论",
    icon: "💬",
    condition: "评论数达到100",
    earned: false,
    progress: 67,
    target: 100,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"creations" | "favorites" | "achievements">("creations");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* 导航栏 */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary-cyan transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-accent-yellow" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
              个人中心
            </span>
          </div>
          <div className="w-20" />
        </nav>
      </header>

      {/* 用户信息头部 */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* 头像 */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-cyan to-primary-blue flex items-center justify-center text-4xl shadow-lg">
                {userData.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-accent-yellow text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                Lv.{userData.levelNum}
              </div>
            </div>

            {/* 基本信息 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{userData.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Crown className="h-4 w-4 text-accent-yellow" />
                  {userData.level}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  加入于 {userData.joinDate}
                </span>
              </div>

              {/* 等级进度条 */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <span>{userData.level} → 宇宙级离谱王</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-cyan to-primary-blue h-2 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary-cyan">{userData.stats.totalNodes}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">创作数</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary-blue">{userData.stats.totalBranches}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">分支数</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-accent-purple">{userData.stats.totalLikes}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">总点赞</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-accent-pink">{userData.stats.favorites}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">收藏</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("creations")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "creations"
                ? "border-primary-cyan text-primary-cyan"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <PenLine className="h-5 w-5" />
              我的创作
            </div>
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "favorites"
                ? "border-primary-cyan text-primary-cyan"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              我的收藏
            </div>
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "achievements"
                ? "border-primary-cyan text-primary-cyan"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              我的成就
            </div>
          </button>
        </div>
      </div>

      {/* Tab 内容 */}
      <main className="container mx-auto px-4 pb-12">
        {/* 我的创作 */}
        {activeTab === "creations" && (
          <div className="space-y-4">
            {myCreations.map((creation) => (
              <div
                key={creation.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {creation.content}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      来自故事：{creation.storyTitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <Clock className="h-4 w-4" />
                    {creation.createdAt}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                      <Flame className="h-4 w-4 text-primary-cyan" />
                      {creation.likes} 点赞
                    </span>
                    <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                      <TreePine className="h-4 w-4 text-primary-blue" />
                      {creation.branches} 分支
                    </span>
                  </div>
                  <Link
                    href="/tree/1"
                    className="text-sm text-primary-cyan hover:text-primary-blue transition-colors"
                  >
                    查看详情 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 我的收藏 */}
        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myFavorites.map((story) => (
              <Link
                key={story.id}
                href={`/tree/${story.id}`}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-24 mb-4 rounded-xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-20`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">
                      {story.avatar}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-cyan transition-colors">
                  {story.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 text-sm">
                  {story.firstSentence}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <TreePine className="h-4 w-4" />
                      {story.branches} 分支
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      {story.likes} 点赞
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 我的成就 */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg transition-all ${
                  achievement.earned
                    ? "hover:shadow-xl"
                    : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-4xl ${
                      achievement.earned ? "" : "grayscale"
                    }`}
                  >
                    {achievement.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {achievement.name}
                      </h3>
                      {achievement.earned && <Award className="h-5 w-5 text-accent-yellow" />}
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                      {achievement.description}
                    </p>

                    <div className="text-xs text-slate-500 dark:text-slate-500 mb-2">
                      条件：{achievement.condition}
                    </div>

                    {achievement.earned ? (
                      <div className="text-xs text-primary-cyan">
                        ✅ 已达成 · {achievement.earnedAt}
                      </div>
                    ) : (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                          <span>进度</span>
                          <span>
                            {achievement.progress} / {achievement.target}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-primary-cyan to-primary-blue h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(100, (achievement.progress! / achievement.target!) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
