"use client";

import { useState } from "react";
import { Search, Filter, ArrowLeft, Trees, Flame, Users, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";

// 模拟故事树数据
const storyTrees = [
  {
    id: 1,
    title: "死亡笔记快递",
    firstSentence: "我在厕所里捡到了一本死亡笔记，上面写着我的名字",
    branches: 42,
    likes: 189,
    author: "离谱小王子",
    avatar: "👑",
    category: "悬疑",
    length: 234,
    createdAt: "2小时前",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "外星人公司",
    firstSentence: "上班第一天，老板告诉我公司其实是外星人的秘密基地",
    branches: 28,
    likes: 156,
    author: "沙雕大师",
    avatar: "🤡",
    category: "搞笑",
    length: 189,
    createdAt: "3小时前",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 3,
    title: "说话猫",
    firstSentence: "我的猫突然开口说话，说要和我谈谈关于投喂的问题",
    branches: 35,
    likes: 212,
    author: "脑洞少女",
    avatar: "👩‍🎨",
    category: "搞笑",
    length: 156,
    createdAt: "5小时前",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 4,
    title: "13层电梯",
    firstSentence: "电梯停在 13 层，但这栋楼只有 12 层",
    branches: 19,
    likes: 98,
    author: "反转专家",
    avatar: "🔄",
    category: "悬疑",
    length: 123,
    createdAt: "8小时前",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "时间旅行",
    firstSentence: "时间旅行者告诉我，我明天会改变历史",
    branches: 56,
    likes: 345,
    author: "宇宙级离谱王",
    avatar: "🧙",
    category: "科幻",
    length: 267,
    createdAt: "1天前",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 6,
    title: "勇者魔王",
    firstSentence: "我被选为勇者，但魔王是我的高中班主任",
    branches: 67,
    likes: 423,
    author: "沙雕大师",
    avatar: "🤡",
    category: "奇幻",
    length: 198,
    createdAt: "1天前",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 7,
    title: "后悔便利店",
    firstSentence: "便利店老板说今天的特价商品是'后悔'",
    branches: 23,
    likes: 134,
    author: "接龙新手",
    avatar: "🐣",
    category: "日常",
    length: 87,
    createdAt: "1天前",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 8,
    title: "头顶乌云",
    firstSentence: "下雨天，所有人都撑伞，只有我头顶有一朵云",
    branches: 45,
    likes: 267,
    author: "脑洞少女",
    avatar: "👩‍🎨",
    category: "日常",
    length: 145,
    createdAt: "2天前",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 9,
    title: "死亡笔记2",
    firstSentence: "我在厕所里捡到了一本死亡笔记，上面写着别人的名字",
    branches: 12,
    likes: 78,
    author: "离谱小王子",
    avatar: "👑",
    category: "悬疑",
    length: 67,
    createdAt: "2天前",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 10,
    title: "外星人2",
    firstSentence: "我告诉外星人，地球其实是我的秘密基地",
    branches: 89,
    likes: 567,
    author: "宇宙级离谱王",
    avatar: "🧙",
    category: "科幻",
    length: 289,
    createdAt: "3天前",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 11,
    title: "魔法火柴",
    firstSentence: "卖火柴的小女孩其实卖的是魔法火柴",
    branches: 34,
    likes: 198,
    author: "沙雕大师",
    avatar: "🤡",
    category: "奇幻",
    length: 156,
    createdAt: "3天前",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 12,
    title: "手机壁纸",
    firstSentence: "我的手机壁纸突然变成了我十年后的照片",
    branches: 56,
    likes: 345,
    author: "脑洞少女",
    avatar: "👩‍🎨",
    category: "日常",
    length: 178,
    createdAt: "4天前",
    color: "from-pink-400 to-rose-500",
  },
];

const categories = ["全部", "搞笑", "悬疑", "科幻", "奇幻", "日常"];
const sortBy = ["最新", "最热", "本周", "本月"];
const lengthFilter = ["全部", "短故事", "中故事", "长故事"];

export default function ForestPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedSort, setSelectedSort] = useState("最新");
  const [selectedLength, setSelectedLength] = useState("全部");
  const [showFilters, setShowFilters] = useState(false);

  // 过滤逻辑
  const filteredStories = storyTrees.filter((story) => {
    // 搜索过滤
    if (searchQuery && !story.title.includes(searchQuery) && !story.firstSentence.includes(searchQuery)) {
      return false;
    }

    // 分类过滤
    if (selectedCategory !== "全部" && story.category !== selectedCategory) {
      return false;
    }

    // 长度过滤
    if (selectedLength === "短故事" && story.length >= 10) return false;
    if (selectedLength === "中故事" && (story.length < 10 || story.length > 50)) return false;
    if (selectedLength === "长故事" && story.length <= 50) return false;

    return true;
  });

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
            <Trees className="h-5 w-5 text-primary-cyan" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
              故事林
            </span>
          </div>
          <div className="w-20" /> {/* 占位符 */}
        </nav>
      </header>

      {/* 筛选栏 */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg">
          {/* 搜索框 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索故事开头、关键词、作者..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-cyan text-slate-900 dark:text-white placeholder-slate-400"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-primary-cyan/10 hover:bg-primary-cyan/20 rounded-xl transition-colors"
            >
              <Filter className="h-5 w-5 text-primary-cyan" />
            </button>
          </div>

          {/* 展开筛选 */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              {/* 分类筛选 */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">按主题筛选</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-primary-cyan text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 排序 */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">按时间排序</h4>
                <div className="flex flex-wrap gap-2">
                  {sortBy.map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSelectedSort(sort)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedSort === sort
                          ? "bg-primary-blue text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>

              {/* 长度筛选 */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">按长度筛选</h4>
                <div className="flex flex-wrap gap-2">
                  {lengthFilter.map((len) => (
                    <button
                      key={len}
                      onClick={() => setSelectedLength(len)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedLength === len
                          ? "bg-accent-purple text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      }`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 活跃筛选标签 */}
          {(selectedCategory !== "全部" || selectedLength !== "全部") && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              {selectedCategory !== "全部" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-cyan/20 text-primary-cyan text-sm">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("全部")} className="ml-1">
                    ×
                  </button>
                </span>
              )}
              {selectedLength !== "全部" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple text-sm">
                  {selectedLength}
                  <button onClick={() => setSelectedLength("全部")} className="ml-1">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 瀑布流内容区 */}
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <Link
              key={story.id}
              href={`/tree/${story.id}`}
              className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* 故事缩略图 */}
              <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-20`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
                    {story.avatar}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${story.color}`}>
                    {story.category}
                  </span>
                </div>
              </div>

              {/* 故事信息 */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-cyan transition-colors">
                {story.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {story.firstSentence}
              </p>

              {/* 统计数据 */}
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
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
              </div>

              {/* 作者信息 */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="text-lg">{story.avatar}</div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{story.author}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  {story.createdAt}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 空状态 */}
        {filteredStories.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌲</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">没有找到故事</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">试试调整筛选条件，或者创建一个新的故事</p>
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-cyan to-primary-blue text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Trees className="h-5 w-5" />
              创建新故事
            </Link>
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
