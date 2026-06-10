"use client";

import { AMINO_ACID_LIST, normalize } from "@/lib/codonData";

type Mode = "study" | "test";
type Field = "one" | "name";

interface Props {
  mode: Mode;
  // キーは `${index}-${field}`
  answers: Record<string, string>;
  onChange: (key: string, value: string) => void;
  graded: boolean;
}

type AnswerState = "correct" | "wrong" | "empty";

function judge(input: string, expected: string): AnswerState {
  if (normalize(input) === "") return "empty";
  return normalize(input) === normalize(expected) ? "correct" : "wrong";
}

function cellStateClass(graded: boolean, state: AnswerState): string {
  if (!graded) return "border-slate-300 bg-white";
  if (state === "correct") return "border-green-500 bg-green-50";
  if (state === "wrong") return "border-red-400 bg-red-50";
  return "border-slate-300 bg-white";
}

const FIELDS: { key: Field; label: string; width: string }[] = [
  { key: "one", label: "1文字記号", width: "w-16" },
  { key: "name", label: "英語正式名称", width: "w-56" },
];

export default function AminoAcidTable({
  mode,
  answers,
  onChange,
  graded,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-slate-400 bg-slate-100 px-3 py-1">
              #
            </th>
            <th className="border border-slate-400 bg-slate-100 px-3 py-1">
              日本語名
            </th>
            {FIELDS.map((f) => (
              <th
                key={f.key}
                className="border border-slate-400 bg-slate-100 px-3 py-1"
              >
                {f.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AMINO_ACID_LIST.map((aa, idx) => (
            <tr key={aa.three}>
              <td className="border border-slate-300 bg-slate-50 px-3 py-1 text-center text-xs text-slate-500">
                {idx + 1}
              </td>
              {/* 日本語名は問題文として固定表示 */}
              <td className="border border-slate-300 bg-slate-50 px-3 py-1 font-medium">
                {aa.ja}
              </td>
              {FIELDS.map((f) => {
                const key = `${idx}-${f.key}`;
                const expected = aa[f.key];
                const value = answers[key] ?? "";
                const state = judge(value, expected);
                return (
                  <td key={f.key} className="border border-slate-300 px-2 py-1">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => onChange(key, e.target.value)}
                      placeholder={f.key === "name" ? "正式名称" : "_"}
                      className={`${f.width} rounded border px-2 py-0.5 text-sm outline-none focus:border-blue-500 ${cellStateClass(
                        graded,
                        state
                      )}`}
                    />
                    {mode === "study" && (
                      <div className="mt-0.5 text-[11px] text-blue-600">
                        {expected}
                      </div>
                    )}
                    {graded && state === "wrong" && (
                      <div className="mt-0.5 text-[11px] text-red-600">
                        → {expected}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
