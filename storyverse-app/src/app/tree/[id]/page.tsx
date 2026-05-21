"use client";

import { useState } from "react";
import { ArrowLeft, Heart, Share2, MessageCircle, Plus, Trees } from "lucide-react";
import Link from "next/link";
import StoryTree from "@/components/StoryTree";

interface StoryNode {
  id: string;
  content: string;
  author?: string;
  likes?: number;
  children?: StoryNode[];
}

// 模拟故事树数据
const initialStoryData: StoryNode = {
  id: "1",
  content: "我在厕所里捡到了一本死亡笔记，上面写着我的名字",
  author: "离谱小王子",
  likes: 189,
  children: [
    {
      id: "1-1",
      content: "翻开第一页，发现上面写着一个熟悉的名字...是我自己！",
      author: "沙雕大师",
      likes: 67,
      children: [
        {
          id: "1-1-1",
          content: "突然笔记本发光了，一个幽灵从里面飘出来",
          author: "脑洞少女",
          likes: 45,
        },
        {
          id: "1-1-2",
          content: "我试着在笔记本上写下幽灵的名字",
          author: "接龙新手",
          likes: 28,
        },
      ],
    },
    {
      id: "1-2",
      content: "刚准备扔掉，手机响了，是死亡笔记的客服电话",
      author: "沙雕大师",
      likes: 89,
      children: [
        {
          id: "1-2-1",
          content: "'您的死亡笔记试用期已结束，请续费'",
          author: "脑洞少女",
          likes: 56,
        },
      ],
    },
    {
      id: "1-3",
      content: "仔细一看，这不是死亡笔记，是'生活笔记'",
      author: "宇宙级离谱王",
      likes: 123,
      children: [
        {
          id: "1-3-1",
          content: "上面的规则是：写下谁的名字，谁就会请我吃饭",
          author: "沙雕大师",
          likes: 78,
          children: [
            {
              id: "1-3-1-1",
              content: "我立刻写下了老板的名字",
              author: "离谱小王子",
              likes: 95,
            },
          ],
        },
      ],
    },
  ],
};

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

const initialComments: Comment[] = [
  { id: 1, author: "沙雕大师", avatar: "🤡", content: "这也太离谱了哈哈哈哈", time: "1 小时前" },
  { id: 2, author: "脑洞少女", avatar: "👩‍🎨", content: "我想到了另一个发展方向...", time: "2 小时前" },
  { id: 3, author: "反转专家", avatar: "🔄", content: "期待后续的分支！", time: "3 小时前" },
];

export default function TreePage() {
  const [storyData, setStoryData] = useState<StoryNode>(initialStoryData);
  const [newBranchContent, setNewBranchContent] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 生成唯一 ID
  const generateId = () => {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // 添加接龙分支
  const handleAddBranch = () => {
    if (!newBranchContent.trim()) return;

    setIsSubmitting(true);

    const newNode: StoryNode = {
      id: generateId(),
      content: newBranchContent.trim(),
      author: "当前用户",
      likes: 0,
    };

    // 在第一个子节点下添加（简化处理，实际应该让用户选择节点）
    setStoryData((prev) => {
      const updated = { ...prev };
      if (!updated.children) updated.children = [];
      updated.children = [...updated.children, newNode];
      return updated;
    });

    setNewBranchContent("");
    setIsSubmitting(false);
  };

  // 添加评论
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "当前用户",
      avatar: "👤",
      content: newComment.trim(),
      time: "刚刚",
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/forest"
              className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary-cyan transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>返回故事林</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary-cyan transition-colors">
                <Heart className="h-5 w-5" />
                <span className="hidden sm:inline">点赞</span>
              </button>
              <button className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary-cyan transition-colors">
                <Share2 className="h-5 w-5" />
                <span className="hidden sm:inline">分享</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 故事树头部 */}
      <div className="container mx-auto px-4 py-8">
        {/* 根节点卡片 */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">👑</div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">@{storyData.author}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">2 小时前发布</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Trees className="h-5 w-5 text-primary-cyan" />
                  {(storyData.children?.length || 0)} 分支
                </span>
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Heart className="h-5 w-5 text-primary-blue" />
                  {storyData.likes} 点赞
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-cyan to-primary-blue rounded-full" />
              <p className="text-xl text-slate-900 dark:text-white leading-relaxed pl-6">
                {storyData.content}
              </p>
            </div>
          </div>
        </div>

        {/* 故事树可视化 */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Trees className="h-6 w-6 text-primary-cyan" />
              故事树图谱
            </h2>
            <StoryTree data={storyData} />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center">
              💡 提示：可以拖拽、缩放、点击节点展开/收起分支
            </p>
          </div>
        </div>

        {/* 接龙输入区 */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary-cyan" />
              继续接龙
            </h3>
            <textarea
              value={newBranchContent}
              onChange={(e) => setNewBranchContent(e.target.value)}
              placeholder="在这个节点后面接一句，让故事更离谱..."
              className="w-full h-32 px-4 py-3 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-cyan text-slate-900 dark:text-white placeholder-slate-400 resize-none"
              maxLength={200}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {newBranchContent.length}/200 字
              </span>
              <button
                onClick={handleAddBranch}
                disabled={isSubmitting || !newBranchContent.trim()}
                className="px-6 py-3 bg-gradient-to-r from-primary-cyan to-primary-blue text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-5 w-5" />
                {isSubmitting ? "发布中..." : "发布接龙"}
              </button>
            </div>
          </div>
        </div>

        {/* 评论区 */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary-cyan" />
              评论 ({comments.length})
            </h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0"
                >
                  <div className="text-2xl">{comment.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900 dark:text-white">{comment.author}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{comment.time}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="发表评论..."
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-cyan text-slate-900 dark:text-white placeholder-slate-400"
              />
              <button
                onClick={handleAddComment}
                className="px-6 py-3 bg-primary-cyan text-white font-bold rounded-xl hover:bg-primary-blue transition-colors"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
