"use client";

import { useState, useCallback } from "react";
import { Heart } from "lucide-react";

interface StoryNode {
  id: string;
  content: string;
  author?: string;
  likes?: number;
  children?: StoryNode[];
}

interface StoryTreeProps {
  data: StoryNode;
}

// 递归计算树的深度和节点位置
function calculateTreeLayout(node: StoryNode, x = 0, y = 0, depth = 0): any[] {
  const nodes: any[] = [];
  const nodeWidth = 260;
  const nodeHeight = 80;
  const horizontalGap = 320;
  const verticalGap = 100;

  nodes.push({
    id: node.id,
    x: x + depth * horizontalGap,
    y: y,
    data: node,
    depth,
  });

  if (node.children && node.children.length > 0) {
    const totalHeight = (node.children.length - 1) * verticalGap;
    let startY = y - totalHeight / 2;

    node.children.forEach((child, index) => {
      const childY = startY + index * verticalGap;
      nodes.push(...calculateTreeLayout(child, x, childY, depth + 1));
    });
  }

  return nodes;
}

// 计算边
function calculateEdges(node: StoryNode, parentId?: string): any[] {
  const edges: any[] = [];

  if (parentId) {
    edges.push({ source: parentId, target: node.id });
  }

  if (node.children) {
    node.children.forEach((child) => {
      edges.push(...calculateEdges(child, node.id));
    });
  }

  return edges;
}

export default function StoryTree({ data }: StoryTreeProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 50, y: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());

  // 计算可见节点
  const getVisibleNodes = useCallback((node: StoryNode, depth = 0): StoryNode[] => {
    const nodes: StoryNode[] = [{ ...node }];

    if (node.children && !collapsedNodes.has(node.id)) {
      node.children.forEach((child) => {
        nodes.push(...getVisibleNodes(child, depth + 1));
      });
    }

    return nodes;
  }, [collapsedNodes]);

  // 计算节点位置
  const getNodePositions = useCallback(() => {
    const positions = new Map<string, { x: number; y: number }>();
    const processed = new Set<string>();

    const calculatePosition = (node: StoryNode, parentX: number, parentY: number, depth: number) => {
      if (processed.has(node.id)) return;
      processed.add(node.id);

      const x = depth * 320;
      let y = parentY;

      if (node.children && !collapsedNodes.has(node.id)) {
        const visibleChildren = node.children.filter((c) => !processed.has(c.id));
        if (visibleChildren.length > 0) {
          const firstChild = visibleChildren[0];
          const lastChild = visibleChildren[visibleChildren.length - 1];

          calculatePosition(firstChild, x, y, depth + 1);
          calculatePosition(lastChild, x, y, depth + 1);

          const firstY = positions.get(firstChild.id)?.y || 0;
          const lastY = positions.get(lastChild.id)?.y || 0;
          y = (firstY + lastY) / 2;
        }
      }

      // 根节点特殊处理
      if (depth === 0) {
        y = 0;
      }

      positions.set(node.id, { x, y });
    };

    // 简单布局：按层级排列
    const levelNodes = new Map<number, StoryNode[]>();
    const collectByLevel = (node: StoryNode, level: number) => {
      if (!levelNodes.has(level)) levelNodes.set(level, []);
      levelNodes.get(level)!.push(node);

      if (node.children && !collapsedNodes.has(node.id)) {
        node.children.forEach((child) => collectByLevel(child, level + 1));
      }
    };

    collectByLevel(data, 0);

    // 计算每个节点的位置
    let maxY = 0;
    levelNodes.forEach((nodes, level) => {
      const x = level * 320;
      nodes.forEach((node, index) => {
        const y = (index - (nodes.length - 1) / 2) * 120;
        positions.set(node.id, { x, y });
        if (Math.abs(y) > maxY) maxY = Math.abs(y);
      });
    });

    return { positions, maxY };
  }, [data, collapsedNodes]);

  const { positions } = getNodePositions();
  const visibleNodes = getVisibleNodes(data);

  // 鼠标事件
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.max(0.3, Math.min(3, scale + (e.deltaY > 0 ? -0.1 : 0.1)));
    setScale(newScale);
  };

  const toggleCollapse = (nodeId: string) => {
    setCollapsedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  return (
    <div
      className="relative w-full h-[600px] bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* 缩放控制 */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setScale((s) => Math.min(3, s + 0.2))}
          className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-md flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => setScale((s) => Math.max(0.3, s - 0.2))}
          className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-md flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
        >
          -
        </button>
        <button
          onClick={() => { setScale(1); setOffset({ x: 50, y: 300 }); }}
          className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg shadow-md flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-xs"
        >
          重置
        </button>
      </div>

      {/* 缩放比例显示 */}
      <div className="absolute bottom-4 left-4 z-10 text-sm text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-700/80 px-3 py-1 rounded-full">
        {Math.round(scale * 100)}%
      </div>

      {/* SVG 画布 */}
      <svg
        width="100%"
        height="100%"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: "0 0" }}
      >
        {/* 边 */}
        {visibleNodes.map((node) => {
          const pos = positions.get(node.id);
          if (!pos) return null;

          return node.children?.map((child) => {
            const childPos = positions.get(child.id);
            if (!childPos || collapsedNodes.has(node.id)) return null;

            return (
              <line
                key={`${node.id}-${child.id}`}
                x1={pos.x + 240}
                y1={pos.y + 40}
                x2={childPos.x}
                y2={childPos.y + 40}
                stroke="#A3B1BF"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
              />
            );
          });
        })}

        {/* 箭头标记 */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#A3B1BF" />
          </marker>
        </defs>

        {/* 节点 */}
        {visibleNodes.map((node) => {
          const pos = positions.get(node.id);
          if (!pos) return null;

          const hasChildren = node.children && node.children.length > 0;
          const isCollapsed = collapsedNodes.has(node.id);
          const likes = node.likes || 0;

          return (
            <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
              {/* 节点卡片 */}
              <foreignObject width="240" height="80">
                <div className="w-full h-full">
                  <div
                    className={`relative w-full h-full rounded-xl p-3 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                      likes > 50
                        ? "bg-orange-50 border-2 border-orange-400"
                        : "bg-white dark:bg-slate-700 border-2 border-blue-400"
                    }`}
                  >
                    {/* 根节点标识 */}
                    {node.id === data.id && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-xl" />
                    )}

                    {/* 内容 */}
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 truncate">
                      @{node.author || "匿名"}
                    </div>
                    <div className="text-sm text-slate-900 dark:text-white font-medium line-clamp-2 leading-tight">
                      {node.content}
                    </div>

                    {/* 点赞徽章 */}
                    {likes > 0 && (
                      <div
                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white ${
                          likes > 50 ? "bg-orange-500" : "bg-blue-500"
                        }`}
                      >
                        <Heart className="w-3 h-3" />
                      </div>
                    )}

                    {/* 折叠按钮 */}
                    {hasChildren && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCollapse(node.id);
                        }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600 transition-colors"
                      >
                        {isCollapsed ? "+" : "−"}
                      </button>
                    )}
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
