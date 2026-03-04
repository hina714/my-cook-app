import { useState } from "react";
import type { MenuConditions, MealType } from "../types";

interface Props {
  onSubmit: (conditions: MenuConditions) => void;
  isLoading: boolean;
}

const GENRES = ["和食", "洋食", "中華", "エスニック", "イタリアン", "その他"];
const MEAL_OPTIONS: { value: MealType; label: string }[] = [
  { value: "breakfast", label: "朝食" },
  { value: "lunch", label: "昼食" },
  { value: "dinner", label: "夕食" },
];
const COOKING_TIMES = ["15分以内", "30分以内", "1時間以内", "こだわらない"];

export function ConditionForm({ onSubmit, isLoading }: Props) {
  const [conditions, setConditions] = useState<MenuConditions>({
    ingredients: "",
    servings: 2,
    cookingTime: "30分以内",
    genres: [],
    avoidIngredients: "",
    mealTypes: ["dinner"],
  });

  const toggleMealType = (meal: MealType) => {
    setConditions((prev) => ({
      ...prev,
      mealTypes: prev.mealTypes.includes(meal)
        ? prev.mealTypes.filter((m) => m !== meal)
        : [...prev.mealTypes, meal],
    }));
  };

  const toggleGenre = (genre: string) => {
    setConditions((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (conditions.mealTypes.length === 0) return;
    onSubmit(conditions);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 食事の種類 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          食事の種類 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-3">
          {MEAL_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleMealType(value)}
              className={`flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${
                conditions.mealTypes.includes(value)
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {conditions.mealTypes.length === 0 && (
          <p className="text-xs text-red-500 mt-1">食事を1つ以上選択してください</p>
        )}
      </div>

      {/* 手持ち食材 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          手持ち食材
        </label>
        <textarea
          value={conditions.ingredients}
          onChange={(e) =>
            setConditions((prev) => ({ ...prev, ingredients: e.target.value }))
          }
          placeholder="例: 鶏肉、玉ねぎ、じゃがいも、にんじん"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
      </div>

      {/* 人数 & 調理時間 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            人数
          </label>
          <select
            value={conditions.servings}
            onChange={(e) =>
              setConditions((prev) => ({
                ...prev,
                servings: Number(e.target.value),
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}人
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            調理時間
          </label>
          <select
            value={conditions.cookingTime}
            onChange={(e) =>
              setConditions((prev) => ({
                ...prev,
                cookingTime: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            {COOKING_TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ジャンル */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          好みのジャンル
        </label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => toggleGenre(genre)}
              className={`py-1 px-3 rounded-full border text-sm transition-colors ${
                conditions.genres.includes(genre)
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* 避けたい食材 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          避けたい食材
        </label>
        <input
          type="text"
          value={conditions.avoidIngredients}
          onChange={(e) =>
            setConditions((prev) => ({
              ...prev,
              avoidIngredients: e.target.value,
            }))
          }
          placeholder="例: ピーマン、セロリ"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || conditions.mealTypes.length === 0}
        className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "AIが考え中..." : "献立を生成する"}
      </button>
    </form>
  );
}
