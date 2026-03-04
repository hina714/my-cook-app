import type { Dish } from "../types";

interface Props {
  title: string;
  dish: Dish;
  mealKey: "breakfast" | "lunch" | "dinner";
}

const MEAL_STYLES = {
  breakfast: {
    gradient: "linear-gradient(135deg, #E8BCA8 0%, #D4A898 100%)",
    light: "#FDF5F1",
    accent: "#D4A898",
    badge: "#FCE8E0",
    badgeText: "#C8907C",
    emoji: "☀️",
  },
  lunch: {
    gradient: "linear-gradient(135deg, #A8B8A5 0%, #8FA88C 100%)",
    light: "#F0F5EF",
    accent: "#8FA88C",
    badge: "#E4EDE3",
    badgeText: "#6E9469",
    emoji: "🌿",
  },
  dinner: {
    gradient: "linear-gradient(135deg, #C9A0A4 0%, #B5A8C8 100%)",
    light: "#F5EDEE",
    accent: "#C9A0A4",
    badge: "#F0ECF6",
    badgeText: "#B5A8C8",
    emoji: "🌙",
  },
};

export function DishCard({ title, dish, mealKey }: Props) {
  const style = MEAL_STYLES[mealKey];

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden"
      style={{ boxShadow: "0 4px 20px rgba(180,150,160,0.12)", border: "1px solid #EDE0E3" }}
    >
      {/* Card Header */}
      <div className="px-5 py-3 flex items-center gap-2" style={{ background: style.gradient }}>
        <span className="text-base">{style.emoji}</span>
        <span className="text-white text-sm font-semibold">{title}</span>
      </div>

      <div className="p-5 space-y-4">
        {/* 料理名 & 説明 */}
        <div>
          <h3 className="text-lg font-bold" style={{ color: "#5C5055" }}>
            {dish.name}
          </h3>
          <p className="text-sm mt-1" style={{ color: "#9C8F93" }}>
            {dish.description}
          </p>
          <span
            className="inline-block mt-2 text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: style.badge, color: style.badgeText }}
          >
            ⏱ {dish.cookingTime}
          </span>
        </div>

        {/* 食材 */}
        <div>
          <h4 className="text-xs font-semibold mb-2" style={{ color: style.accent, letterSpacing: "0.08em" }}>
            INGREDIENTS
          </h4>
          <ul className="grid grid-cols-2 gap-1">
            {dish.ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm" style={{ color: "#7A6568" }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: style.accent }}>◦</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* 作り方 */}
        <div>
          <h4 className="text-xs font-semibold mb-2" style={{ color: style.accent, letterSpacing: "0.08em" }}>
            HOW TO MAKE
          </h4>
          <ol className="space-y-2">
            {dish.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: "#7A6568" }}>
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: style.light, color: style.accent }}
                >
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
