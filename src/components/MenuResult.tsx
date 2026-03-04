import type { GeneratedMenu } from "../types";
import { DishCard } from "./DishCard";

interface Props {
  menu: GeneratedMenu;
  onRegenerate: () => void;
  isLoading: boolean;
}

const MEAL_LABELS: Record<string, string> = {
  breakfast: "朝食",
  lunch: "昼食",
  dinner: "夕食",
};

export function MenuResult({ menu, onRegenerate, isLoading }: Props) {
  const entries = (["breakfast", "lunch", "dinner"] as const).filter(
    (key) => menu[key]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">今日の献立</h2>
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isLoading ? "生成中..." : "再生成"}
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((key) => (
          <DishCard
            key={key}
            title={MEAL_LABELS[key]}
            dish={menu[key]!}
          />
        ))}
      </div>
    </div>
  );
}
