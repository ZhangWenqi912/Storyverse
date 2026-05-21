"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Send, Lightbulb, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import "./dice.css"; // 导入CSS文件

// 模拟从 API 获取随机开头
const randomPrompts = [
  { content: "我在厕所里捡到了一本死亡笔记，上面写着我的名字", category: "搞笑" },
  { content: "上班第一天，老板告诉我公司其实是外星人的秘密基地", category: "搞笑" },
  { content: "买彩票中奖后，我发现号码是我昨晚梦到的车牌号", category: "搞笑" },
  { content: "我的猫突然开口说话，说要和我谈谈关于投喂的问题", category: "搞笑" },
  { content: "快递员送来一个箱子，打开后发现是十年前消失的我", category: "搞笑" },
  { content: "凌晨三点，我收到一条短信：别回头，他在你身后", category: "悬疑" },
  { content: "电梯停在 13 层，但这栋楼只有 12 层", category: "悬疑" },
  { content: "镜子里的我，做了一个我没有做的动作", category: "悬疑" },
  { content: "系统提示：地球副本即将关闭，请做好准备", category: "科幻" },
  { content: "我醒来发现自己成了 AI，而 AI 成了我", category: "科幻" },
  { content: "卖火柴的小女孩其实卖的是魔法火柴", category: "奇幻" },
  { content: "我被选为勇者，但魔王是我的高中班主任", category: "奇幻" },
  { content: "便利店老板说今天的特价商品是'后悔'", category: "日常" },
  { content: "下雨天，所有人都撑伞，只有我头顶有一朵云", category: "日常" },
];

const categoryColors: Record<string, string> = {
  搞笑: "from-yellow-400 to-orange-500",
  悬疑: "from-purple-500 to-pink-500",
  科幻: "from-blue-500 to-cyan-400",
  奇幻: "from-green-400 to-emerald-500",
  日常: "from-pink-400 to-rose-500",
};

const inspirationTips = [
  "试试加入一个意想不到的反转！",
  "让主角做出最离谱的选择！",
  "引入一个超自然的元素！",
  "让故事发生在一个奇怪的场景！",
  "加入一个沙雕的角色！",
  "让时间/空间发生扭曲！",
];

// 3D骰子面点数配置
const diceFaces = {
  1: [
    [2, 2],
  ],
  2: [
    [0, 0],
    [4, 4],
  ],
  3: [
    [0, 0],
    [2, 2],
    [4, 4],
  ],
  4: [
    [0, 0],
    [0, 4],
    [4, 0],
    [4, 4],
  ],
  5: [
    [0, 0],
    [0, 4],
    [2, 2],
    [4, 0],
    [4, 4],
  ],
  6: [
    [0, 0],
    [0, 4],
    [2, 0],
    [2, 4],
    [4, 0],
    [4, 4],
  ],
};

// 3D骰子组件 - 真正的六面骰子
function Dice3D({ value, isRolling }: { value: number; isRolling: boolean }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [currentFace, setCurrentFace] = useState(value);

  // 计算显示哪个面
  const faceToShow = isRolling ? Math.floor(Math.random() * 6) + 1 : value;

  useEffect(() => {
    if (isRolling) {
      // 旋转动画
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < duration) {
          const progress = elapsed / duration;
          // 更快的旋转速度
          setRotation({
            x: progress * 1080 + Math.random() * 360,
            y: progress * 1080 + Math.random() * 360,
          });

          // 随机快速切换显示的面
          if (Math.random() < 0.1) {
            setCurrentFace(Math.floor(Math.random() * 6) + 1);
          }
          requestAnimationFrame(animate);
        } else {
          // 旋转结束，根据实际值计算正确的旋转角度
          const rotations = {
            1: { x: 0, y: 0 },
            2: { x: 0, y: 90 },
            3: { x: 0, y: 180 },
            4: { x: 0, y: -90 },
            5: { x: -90, y: 0 },
            6: { x: 90, y: 0 },
          };

          const targetRotation = rotations[value as keyof typeof rotations];
          const baseRotation = Math.floor(rotation.x / 360) * 360;
          setRotation({
            x: baseRotation + targetRotation.x,
            y: baseRotation + targetRotation.y,
          });
          setCurrentFace(value);
        }
      };
      animate();
    }
  }, [isRolling, value]);

  // 渲染所有六个面
  return (
    <div className="perspective-1000">
      <div
        className={`dice-3d ${isRolling ? 'rolling' : ''}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isRolling ? 'none' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* 面1 - 正面 */}
        <div className="dice-face face-1">
          {diceFaces[1]?.map(([row, col], idx) => (
            <div key={idx} className="dice-dot" style={{ gridRow: row + 1, gridColumn: col + 1 }} />
          ))}
        </div>

        {/* 面2 - 右侧 */}
        <div className="dice-face face-2">
          {diceFaces[2]?.map(([row, col], idx) => (
            <div key={idx} className="dice-dot" style={{ gridRow: row + 1, gridColumn: col + 1 }} />
          ))}
        </div>

        {/* 面3 - 背面 */}
        <div className="dice-face face-3">
          {diceFaces[3]?.map(([row, col], idx) => (
            <div key={idx} className="dice-dot" style={{ gridRow: row + 1, gridColumn: col + 1 }} />
          ))}
        </div>

        {/* 面4 - 左侧 */}
        <div className="dice-face face-4">
          {diceFaces[4]?.map(([row, col], idx) => (
            <div key={idx} className="dice-dot" style={{ gridRow: row + 1, gridColumn: col + 1 }} />
          ))}
        </div>

        {/* 面5 - 顶部 */}
        <div className="dice-face face-5">
          {diceFaces[5]?.map(([row, col], idx) => (
            <div key={idx} className="dice-dot" style={{ gridRow: row + 1, gridColumn: col + 1 }} />
          ))}
        </div>

        {/* 面6 - 底部 */}
        <div className="dice-face face-6">
          {diceFaces[6]?.map(([row, col], idx) => (
            <div key={idx} className="dice-dot" style={{ gridRow: row + 1, gridColumn: col + 1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StartPage() {
  const [currentPrompt, setCurrentPrompt] = useState(randomPrompts[0]);
  const [isRolling, setIsRolling] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [tip, setTip] = useState(inspirationTips[0]);
  const [diceValue, setDiceValue] = useState(5);

  // 随机换一个开头
  const handleRoll = () => {
    setIsRolling(true);
    // 生成新的随机骰子点数
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);

    // 模拟骰子动画时间
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomPrompts.length);
      setCurrentPrompt(randomPrompts[randomIndex]);
      setIsRolling(false);
    }, 1500);
  };

  // 随机换一个灵感提示
  useEffect(() => {
    const randomTipIndex = Math.floor(Math.random() * inspirationTips.length);
    setTip(inspirationTips[randomTipIndex]);
  }, [currentPrompt]);

  // 发布接龙
  const handleSubmit = () => {
    if (userInput.trim()) {
      alert(`发布成功！\n开头：${currentPrompt.content}\n你的接龙：${userInput}`);
      setUserInput("");
      // TODO: 调用 API 保存到数据库
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* 导航栏 */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-yellow" />
            <span className="text-white/80">离谱宇宙生成器</span>
          </div>
        </nav>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          {/* 骰子动画区域 */}
          <div className="mb-8 relative">
            {/* 发光效果 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-r from-primary-cyan to-primary-blue rounded-full blur-3xl opacity-40 animate-pulse" />
            </div>

            {/* 3D骰子 */}
            <div className="relative z-10 scale-[1.2]">
              <Dice3D value={diceValue} isRolling={isRolling} />
            </div>

            {isRolling && (
              <p className="text-center text-white/70 mt-8 animate-pulse">正在生成离谱宇宙...</p>
            )}
          </div>

          {/* 离谱开头卡片 */}
          {!isRolling && (
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${
                    categoryColors[currentPrompt.category] || "from-primary-cyan to-primary-blue"
                  }`}
                >
                  {currentPrompt.category}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
                离谱开头
              </h2>

              <p className="text-xl text-white/90 text-center leading-relaxed">
                {currentPrompt.content}
              </p>
            </div>
          )}

          {/* 输入框区域 */}
          {!isRolling && (
            <div className="w-full max-w-2xl">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                <label className="block text-white/80 text-lg mb-4 text-center">
                  ✍️ 接下一句，越离谱越好
                </label>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="发挥你的想象力，让故事更加离谱..."
                  className="w-full h-32 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent resize-none transition-all"
                  maxLength={200}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/50 text-sm">
                    最多 200 字，还能输入 {200 - userInput.length} 字
                  </span>
                </div>
              </div>

              {/* 按钮区域 */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <button
                  onClick={handleSubmit}
                  disabled={!userInput.trim()}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-cyan to-primary-blue text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  发布接龙
                </button>

                <button
                  onClick={handleRoll}
                  className="w-full sm:w-auto px-8 py-4 bg-white/20 text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`h-5 w-5 ${isRolling ? "animate-spin" : ""}`} />
                  换一个开头
                </button>
              </div>

              {/* 灵感提示 */}
              <div className="bg-gradient-to-r from-primary-cyan/20 to-primary-blue/20 backdrop-blur-sm rounded-xl p-4 border border-primary-cyan/30">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-accent-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">灵感提示</h4>
                    <p className="text-white/70 text-sm">{tip}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
