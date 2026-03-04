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
      const message = err instanceof Error ? err.message : "エラーが発生しました。";
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
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F5" }}>
      {/* Header */}
      <header className="bg-white sticky top-0 z-10" style={{ borderBottom: "1px solid #EDE0E3" }}>
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="font-bold text-lg" style={{ color: "#C9A0A4" }}>
              今日のこんだて
            </span>
          </button>
          {appState === "result" && (
            <button
              onClick={handleReset}
              className="text-sm px-3 py-1 rounded-full transition-colors"
              style={{ color: "#B5A8C8", border: "1px solid #DED6EC" }}
            >
              条件を変える
            </button>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Loading */}
        {appState === "loading" && (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div
              className="w-14 h-14 rounded-full animate-spin"
              style={{
                border: "4px solid #F5EDEE",
                borderTop: "4px solid #C9A0A4",
              }}
            />
            <div className="text-center space-y-1">
              <p className="font-medium" style={{ color: "#7A6568" }}>
                AIが献立を考えています ✨
              </p>
              <p className="text-sm" style={{ color: "#B5A0A5" }}>
                少々お待ちください...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="mb-4 p-4 rounded-2xl text-sm"
            style={{ backgroundColor: "#FEF0F0", color: "#C0726E", border: "1px solid #F5CFC E" }}
          >
            {error}
          </div>
        )}

        {/* Input Form */}
        {appState === "input" && (
          <div
            className="bg-white rounded-3xl p-6"
            style={{ boxShadow: "0 4px 24px rgba(201,160,164,0.1)", border: "1px solid #EDE0E3" }}
          >
            <p className="text-sm font-medium mb-5" style={{ color: "#B5A8C8" }}>
              ✦ 条件を入力してね
            </p>
            <ConditionForm onSubmit={handleGenerate} isLoading={false} />
          </div>
        )}

        {/* Result */}
        {appState === "result" && menu && (
          <MenuResult menu={menu} onRegenerate={handleRegenerate} isLoading={false} />
        )}
      </main>
    </div>
  );
}
