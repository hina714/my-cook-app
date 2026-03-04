import { useState } from "react";
import { ConditionForm } from "./components/ConditionForm";
import { MenuResult } from "./components/MenuResult";
import { generateMenu } from "./api/generateMenu";
import type { MenuConditions, GeneratedMenu } from "./types";

type AppState = "input" | "loading" | "result";

export default function App() {
  const [appState, setAppState] = useState<AppState>("input");
  const [menu, setMenu] = useState<GeneratedMenu | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastConditions, setLastConditions] = useState<MenuConditions | null>(null);

  const handleGenerate = async (conditions: MenuConditions) => {
    setAppState("loading");
    setError(null);
    setLastConditions(conditions);

    try {
      const result = await generateMenu(conditions);
      setMenu(result);
      setAppState("result");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "エラーが発生しました。";
      setError(message);
      setAppState("input");
    }
  };

  const handleRegenerate = async () => {
    if (!lastConditions) return;
    await handleGenerate(lastConditions);
  };

  const handleReset = () => {
    setAppState("input");
    setMenu(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="font-bold text-gray-800">今日のこんだて</span>
          </button>
          {appState === "result" && (
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              条件を変える
            </button>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Loading */}
        {appState === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-gray-700 font-medium">AIが献立を考えています</p>
              <p className="text-sm text-gray-400 mt-1">少々お待ちください...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Input Form */}
        {appState === "input" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-base font-bold text-gray-800 mb-4">
              条件を入力してください
            </h2>
            <ConditionForm onSubmit={handleGenerate} isLoading={false} />
          </div>
        )}

        {/* Result */}
        {appState === "result" && menu && (
          <MenuResult
            menu={menu}
            onRegenerate={handleRegenerate}
            isLoading={false}
          />
        )}
      </main>
    </div>
  );
}
