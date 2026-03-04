import { useState } from "react";
import type { MenuConditions, MealType } from "../types";

interface Props {
  onSubmit: (conditions: MenuConditions) => void;
  isLoading: boolean;
}

const GENRES = ["和食", "洋食", "中華", "エスニック", "イタリアン", "その他"];
const MEAL_OPTIONS: { value: MealType; label: string; emoji: string }[] = [
  { value: "breakfast", label: "朝食", emoji: "☀️" },
  { value: "lunch", label: "昼食", emoji: "🌿" },
  { value: "dinner", label: "夕食", emoji: "🌙" },
];
const COOKING_TIMES = ["15分以内", "30分以内", "1時間以内", "こだわらない"];

const labelStyle = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#9C8F93",
  marginBottom: "8px",
  letterSpacing: "0.05em",
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #EDE0E3",
  borderRadius: "12px",
  fontSize: "0.875rem",
  color: "#5C5055",
  backgroundColor: "#FDFBFB",
  outline: "none",
  resize: "none" as const,
};

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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (conditions.mealTypes.length === 0) return;
    onSubmit(conditions);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 食事の種類 */}
      <div>
        <label style={labelStyle}>食事の種類</label>
        <div className="flex gap-2">
          {MEAL_OPTIONS.map(({ value, label, emoji }) => {
            const selected = conditions.mealTypes.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleMealType(value)}
                className="flex-1 py-2.5 rounded-2xl text-sm font-medium transition-all"
                style={
                  selected
                    ? {
                        border: "1.5px solid #C9A0A4",
                        backgroundColor: "#F5EDEE",
                        color: "#C9A0A4",
                      }
                    : {
                        border: "1.5px solid #EDE0E3",
                        backgroundColor: "#FDFBFB",
                        color: "#9C8F93",
                      }
                }
              >
                <span className="block text-base">{emoji}</span>
                {label}
              </button>
            );
          })}
        </div>
        {conditions.mealTypes.length === 0 && (
          <p className="text-xs mt-1" style={{ color: "#C9A0A4" }}>
            食事を1つ以上選んでね
          </p>
        )}
      </div>

      {/* 手持ち食材 */}
      <div>
        <label style={labelStyle}>手持ち食材</label>
        <textarea
          value={conditions.ingredients}
          onChange={(e) =>
            setConditions((prev) => ({ ...prev, ingredients: e.target.value }))
          }
          placeholder="例: 鶏肉、玉ねぎ、じゃがいも"
          rows={2}
          style={inputStyle}
        />
      </div>

      {/* 人数 & 調理時間 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={labelStyle}>人数</label>
          <select
            value={conditions.servings}
            onChange={(e) =>
              setConditions((prev) => ({ ...prev, servings: Number(e.target.value) }))
            }
            style={{ ...inputStyle, resize: undefined }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}人</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>調理時間</label>
          <select
            value={conditions.cookingTime}
            onChange={(e) =>
              setConditions((prev) => ({ ...prev, cookingTime: e.target.value }))
            }
            style={{ ...inputStyle, resize: undefined }}
          >
            {COOKING_TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ジャンル */}
      <div>
        <label style={labelStyle}>好みのジャンル</label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => {
            const selected = conditions.genres.includes(genre);
            return (
              <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                className="py-1.5 px-4 rounded-full text-sm transition-all"
                style={
                  selected
                    ? {
                        border: "1.5px solid #B5A8C8",
                        backgroundColor: "#F0ECF6",
                        color: "#B5A8C8",
                      }
                    : {
                        border: "1.5px solid #EDE0E3",
                        backgroundColor: "#FDFBFB",
                        color: "#9C8F93",
                      }
                }
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* 避けたい食材 */}
      <div>
        <label style={labelStyle}>避けたい食材</label>
        <input
          type="text"
          value={conditions.avoidIngredients}
          onChange={(e) =>
            setConditions((prev) => ({ ...prev, avoidIngredients: e.target.value }))
          }
          placeholder="例: ピーマン、セロリ"
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || conditions.mealTypes.length === 0}
        className="w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #C9A0A4 0%, #B5A8C8 100%)",
          letterSpacing: "0.05em",
        }}
      >
        {isLoading ? "考え中... ✨" : "🍽️ 献立を生成する"}
      </button>
    </form>
  );
}
