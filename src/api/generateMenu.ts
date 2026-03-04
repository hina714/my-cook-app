import Anthropic from "@anthropic-ai/sdk";
import type { MenuConditions, GeneratedMenu } from "../types";

function getClient() {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error(".env ファイルに VITE_ANTHROPIC_API_KEY が設定されていません。サーバーを再起動してください。");
  }
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
}

const SYSTEM_PROMPT = `あなたは料理の専門家です。ユーザーの条件に基づいて献立を提案してください。
必ず以下のJSON形式のみで返してください。余分なテキスト、コードブロック記号、説明は一切含めないでください。

形式:
{
  "breakfast": {
    "name": "料理名",
    "description": "料理の説明（1〜2文）",
    "ingredients": ["食材と分量1", "食材と分量2"],
    "steps": ["手順1", "手順2", "手順3"],
    "cookingTime": "XX分"
  },
  "lunch": { ... },
  "dinner": { ... }
}

リクエストされた食事の種類のみJSONに含めてください（"breakfast", "lunch", "dinner"のキー名を使用）。`;

const MEAL_LABELS: Record<string, string> = {
  breakfast: "朝食",
  lunch: "昼食",
  dinner: "夕食",
};

export async function generateMenu(
  conditions: MenuConditions
): Promise<GeneratedMenu> {
  const selectedMeals = conditions.mealTypes
    .map((t) => MEAL_LABELS[t])
    .join("、");
  const genres =
    conditions.genres.length > 0 ? conditions.genres.join("、") : "こだわらない";

  const userPrompt = `以下の条件で${selectedMeals}の献立を提案してください。

手持ち食材: ${conditions.ingredients || "特になし"}
人数: ${conditions.servings}人前
調理時間: ${conditions.cookingTime}
好みのジャンル: ${genres}
避けたい食材: ${conditions.avoidIngredients || "特になし"}`;

  const stream = getClient().messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const message = await stream.finalMessage();
  const text =
    message.content.find((b) => b.type === "text")?.text ?? "";

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("献立の生成に失敗しました。もう一度お試しください。");
  }

  try {
    return JSON.parse(jsonMatch[0]) as GeneratedMenu;
  } catch {
    throw new Error("献立データの解析に失敗しました。もう一度お試しください。");
  }
}
