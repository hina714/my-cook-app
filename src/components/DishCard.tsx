import type { Dish } from "../types";

interface Props {
  title: string;
  dish: Dish;
}

export function DishCard({ title, dish }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-green-600 px-4 py-2">
        <span className="text-white text-xs font-semibold uppercase tracking-wide">
          {title}
        </span>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{dish.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{dish.description}</p>
          <span className="inline-block mt-2 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
            調理時間: {dish.cookingTime}
          </span>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">食材</h4>
          <ul className="grid grid-cols-2 gap-1">
            {dish.ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">作り方</h4>
          <ol className="space-y-2">
            {dish.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
