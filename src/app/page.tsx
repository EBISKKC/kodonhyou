"use client";

import { useMemo, useState } from "react";
import CodonTable from "@/components/CodonTable";
import AminoAcidTable from "@/components/AminoAcidTable";
import {
  AMINO_ACID_LIST,
  CODON_TABLE,
  normalize,
} from "@/lib/codonData";

type Mode = "study" | "test";

export default function Home() {
  const [mode, setMode] = useState<Mode>("study");
  const [graded, setGraded] = useState(false);

  // コドン表の解答（キー: コドン文字列）
  const [codonAnswers, setCodonAnswers] = useState<Record<string, string>>({});
  // アミノ酸一覧の解答（キー: `${index}-${field}`）
  const [aaAnswers, setAaAnswers] = useState<Record<string, string>>({});

  const handleCodonChange = (codon: string, value: string) => {
    setCodonAnswers((prev) => ({ ...prev, [codon]: value }));
  };
  const handleAaChange = (key: string, value: string) => {
    setAaAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // スコア集計
  const score = useMemo(() => {
    let codonCorrect = 0;
    const codonTotal = Object.keys(CODON_TABLE).length;
    for (const [codon, aa] of Object.entries(CODON_TABLE)) {
      const v = normalize(codonAnswers[codon] ?? "");
      const accepted =
        aa.three === "Stop" ? ["stop", "*"] : [normalize(aa.one)];
      if (accepted.includes(v)) {
        codonCorrect++;
      }
    }

    let aaCorrect = 0;
    const aaTotal = AMINO_ACID_LIST.length * 2;
    AMINO_ACID_LIST.forEach((aa, idx) => {
      (["one", "name"] as const).forEach((field) => {
        if (
          normalize(aaAnswers[`${idx}-${field}`] ?? "") ===
          normalize(aa[field])
        ) {
          aaCorrect++;
        }
      });
    });

    return { codonCorrect, codonTotal, aaCorrect, aaTotal };
  }, [codonAnswers, aaAnswers]);

  const handleReset = () => {
    setCodonAnswers({});
    setAaAnswers({});
    setGraded(false);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setGraded(false);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 text-slate-800">
      <h1 className="text-2xl font-bold">コドン表 穴埋めクイズ</h1>
      <p className="mt-1 text-sm text-slate-500">
        標準遺伝暗号表のコドンに対応するアミノ酸を覚えましょう。
      </p>

      {/* コントロールバー */}
      <div className="sticky top-0 z-10 mt-4 flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white/90 py-3 backdrop-blur">
        <div className="flex overflow-hidden rounded-lg border border-slate-300">
          <button
            onClick={() => switchMode("study")}
            className={`px-4 py-1.5 text-sm font-medium ${
              mode === "study"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            暗記モード
          </button>
          <button
            onClick={() => switchMode("test")}
            className={`px-4 py-1.5 text-sm font-medium ${
              mode === "test"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            テストモード
          </button>
        </div>

        <button
          onClick={() => setGraded(true)}
          className="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700"
        >
          採点する
        </button>
        <button
          onClick={handleReset}
          className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          リセット
        </button>

        {graded && (
          <div className="ml-auto flex gap-4 text-sm font-medium">
            <span className="text-slate-600">
              コドン表:{" "}
              <span className="text-green-600">{score.codonCorrect}</span>/
              {score.codonTotal}
            </span>
            <span className="text-slate-600">
              アミノ酸表:{" "}
              <span className="text-green-600">{score.aaCorrect}</span>/
              {score.aaTotal}
            </span>
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {mode === "study"
          ? "暗記モード: 各セルに青字で正解が表示されています。見ながら入力して覚えましょう。"
          : "テストモード: 正解は表示されません。自力で入力して「採点する」を押してください。"}
      </p>

      {/* 上の表: コドン表 */}
      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">
          1. コドン表（アミノ酸の1文字記号を埋める／終止コドンは Stop）
        </h2>
        <CodonTable
          mode={mode}
          answers={codonAnswers}
          onChange={handleCodonChange}
          graded={graded}
        />
      </section>

      {/* 下の表: アミノ酸一覧 */}
      <section className="mt-10">
        <h2 className="mb-2 text-lg font-semibold">
          2. アミノ酸一覧（日本語名を見て 1文字記号 / 英語正式名称を埋める）
        </h2>
        <AminoAcidTable
          mode={mode}
          answers={aaAnswers}
          onChange={handleAaChange}
          graded={graded}
        />
      </section>
    </main>
  );
}
