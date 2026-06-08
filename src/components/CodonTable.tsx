"use client";

import { BASES, Base, CODON_TABLE, normalize } from "@/lib/codonData";

type Mode = "study" | "test";

interface Props {
  mode: Mode;
  answers: Record<string, string>;
  onChange: (codon: string, value: string) => void;
  graded: boolean;
}

// 判定結果に応じたセルの枠線・背景色クラスを返す
function cellStateClass(
  graded: boolean,
  correct: AnswerState
): string {
  if (!graded) return "border-slate-300 bg-white";
  if (correct === "correct") return "border-green-500 bg-green-50";
  if (correct === "wrong") return "border-red-400 bg-red-50";
  return "border-slate-300 bg-white";
}

type AnswerState = "correct" | "wrong" | "empty";

function judge(input: string, expected: string): AnswerState {
  if (normalize(input) === "") return "empty";
  return normalize(input) === normalize(expected) ? "correct" : "wrong";
}

export default function CodonTable({ mode, answers, onChange, graded }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="border border-slate-400 bg-slate-100 px-2 py-1 text-xs"
            >
              1文字目
              <br />↓
            </th>
            <th
              colSpan={4}
              className="border border-slate-400 bg-slate-100 px-2 py-1"
            >
              2文字目
            </th>
            <th
              rowSpan={2}
              className="border border-slate-400 bg-slate-100 px-2 py-1 text-xs"
            >
              3文字目
              <br />↓
            </th>
          </tr>
          <tr>
            {BASES.map((b) => (
              <th
                key={b}
                className="border border-slate-400 bg-slate-100 px-3 py-1 font-mono text-base"
              >
                {b}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BASES.map((first) =>
            BASES.map((third, thirdIdx) => (
              <tr key={`${first}-${third}`}>
                {/* 1文字目: 各 first ブロックの先頭行にのみ表示 */}
                {thirdIdx === 0 && (
                  <td
                    rowSpan={4}
                    className="border border-slate-400 bg-slate-50 px-3 text-center font-mono text-base font-bold"
                  >
                    {first}
                  </td>
                )}
                {/* 2文字目 × 4列 */}
                {BASES.map((second) => {
                  const codon = `${first}${second}${third}`;
                  const aa = CODON_TABLE[codon];
                  const value = answers[codon] ?? "";
                  const state = judge(value, aa.three);
                  return (
                    <td
                      key={codon}
                      className="border border-slate-300 px-1 py-1"
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs text-slate-500">
                          {codon}
                        </span>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => onChange(codon, e.target.value)}
                          placeholder={aa.three === "Stop" ? "Stop" : "___"}
                          className={`w-14 rounded border px-1 py-0.5 text-center text-xs outline-none focus:border-blue-500 ${cellStateClass(
                            graded,
                            state
                          )}`}
                        />
                      </div>
                      {/* 暗記モードでは答えを薄く表示 */}
                      {mode === "study" && (
                        <div className="text-center text-[10px] text-blue-600">
                          {aa.three}
                        </div>
                      )}
                      {/* 採点後、間違いには正解を表示 */}
                      {graded && state === "wrong" && (
                        <div className="text-center text-[10px] text-red-600">
                          → {aa.three}
                        </div>
                      )}
                    </td>
                  );
                })}
                {/* 3文字目 */}
                <td className="border border-slate-400 bg-slate-50 px-3 text-center font-mono text-base font-bold">
                  {third}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
