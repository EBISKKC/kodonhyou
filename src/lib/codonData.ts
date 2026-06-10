// 標準遺伝暗号（コドン表）のデータ定義

export type Base = "U" | "C" | "A" | "G";

export const BASES: Base[] = ["U", "C", "A", "G"];

// アミノ酸（および終止コドン）の情報
export interface AminoAcid {
  three: string; // 3文字略称（例: Phe）。終止コドンは "Stop"
  one: string; // 1文字略称（例: F）。終止コドンは "*"
  name: string; // 英語の正式名称（例: Phenylalanine）。終止コドンは "Stop (terminator)"
  ja: string; // 日本語名（例: フェニルアラニン）
}

// 各コドン（キーは "UUU" 形式）に対応するアミノ酸
export const CODON_TABLE: Record<string, AminoAcid> = (() => {
  const aa = {
    Phe: { three: "Phe", one: "F", name: "Phenylalanine", ja: "フェニルアラニン" },
    Leu: { three: "Leu", one: "L", name: "Leucine", ja: "ロイシン" },
    Ile: { three: "Ile", one: "I", name: "Isoleucine", ja: "イソロイシン" },
    Met: { three: "Met", one: "M", name: "Methionine", ja: "メチオニン" },
    Val: { three: "Val", one: "V", name: "Valine", ja: "バリン" },
    Ser: { three: "Ser", one: "S", name: "Serine", ja: "セリン" },
    Pro: { three: "Pro", one: "P", name: "Proline", ja: "プロリン" },
    Thr: { three: "Thr", one: "T", name: "Threonine", ja: "トレオニン" },
    Ala: { three: "Ala", one: "A", name: "Alanine", ja: "アラニン" },
    Tyr: { three: "Tyr", one: "Y", name: "Tyrosine", ja: "チロシン" },
    His: { three: "His", one: "H", name: "Histidine", ja: "ヒスチジン" },
    Gln: { three: "Gln", one: "Q", name: "Glutamine", ja: "グルタミン" },
    Asn: { three: "Asn", one: "N", name: "Asparagine", ja: "アスパラギン" },
    Lys: { three: "Lys", one: "K", name: "Lysine", ja: "リシン" },
    Asp: { three: "Asp", one: "D", name: "Aspartic Acid", ja: "アスパラギン酸" },
    Glu: { three: "Glu", one: "E", name: "Glutamic Acid", ja: "グルタミン酸" },
    Cys: { three: "Cys", one: "C", name: "Cysteine", ja: "システイン" },
    Trp: { three: "Trp", one: "W", name: "Tryptophan", ja: "トリプトファン" },
    Arg: { three: "Arg", one: "R", name: "Arginine", ja: "アルギニン" },
    Gly: { three: "Gly", one: "G", name: "Glycine", ja: "グリシン" },
    Stop: { three: "Stop", one: "*", name: "Stop (terminator)", ja: "終止コドン" },
  } as const;

  return {
    // U--
    UUU: aa.Phe, UUC: aa.Phe, UUA: aa.Leu, UUG: aa.Leu,
    UCU: aa.Ser, UCC: aa.Ser, UCA: aa.Ser, UCG: aa.Ser,
    UAU: aa.Tyr, UAC: aa.Tyr, UAA: aa.Stop, UAG: aa.Stop,
    UGU: aa.Cys, UGC: aa.Cys, UGA: aa.Stop, UGG: aa.Trp,
    // C--
    CUU: aa.Leu, CUC: aa.Leu, CUA: aa.Leu, CUG: aa.Leu,
    CCU: aa.Pro, CCC: aa.Pro, CCA: aa.Pro, CCG: aa.Pro,
    CAU: aa.His, CAC: aa.His, CAA: aa.Gln, CAG: aa.Gln,
    CGU: aa.Arg, CGC: aa.Arg, CGA: aa.Arg, CGG: aa.Arg,
    // A--
    AUU: aa.Ile, AUC: aa.Ile, AUA: aa.Ile, AUG: aa.Met,
    ACU: aa.Thr, ACC: aa.Thr, ACA: aa.Thr, ACG: aa.Thr,
    AAU: aa.Asn, AAC: aa.Asn, AAA: aa.Lys, AAG: aa.Lys,
    AGU: aa.Ser, AGC: aa.Ser, AGA: aa.Arg, AGG: aa.Arg,
    // G--
    GUU: aa.Val, GUC: aa.Val, GUA: aa.Val, GUG: aa.Val,
    GCU: aa.Ala, GCC: aa.Ala, GCA: aa.Ala, GCG: aa.Ala,
    GAU: aa.Asp, GAC: aa.Asp, GAA: aa.Glu, GAG: aa.Glu,
    GGU: aa.Gly, GGC: aa.Gly, GGA: aa.Gly, GGG: aa.Gly,
  };
})();

// 下の表（20アミノ酸 + Stop）の一覧。表示順を固定
export const AMINO_ACID_LIST: AminoAcid[] = [
  { three: "Ala", one: "A", name: "Alanine", ja: "アラニン" },
  { three: "Arg", one: "R", name: "Arginine", ja: "アルギニン" },
  { three: "Asn", one: "N", name: "Asparagine", ja: "アスパラギン" },
  { three: "Asp", one: "D", name: "Aspartic Acid", ja: "アスパラギン酸" },
  { three: "Cys", one: "C", name: "Cysteine", ja: "システイン" },
  { three: "Gln", one: "Q", name: "Glutamine", ja: "グルタミン" },
  { three: "Glu", one: "E", name: "Glutamic Acid", ja: "グルタミン酸" },
  { three: "Gly", one: "G", name: "Glycine", ja: "グリシン" },
  { three: "His", one: "H", name: "Histidine", ja: "ヒスチジン" },
  { three: "Ile", one: "I", name: "Isoleucine", ja: "イソロイシン" },
  { three: "Leu", one: "L", name: "Leucine", ja: "ロイシン" },
  { three: "Lys", one: "K", name: "Lysine", ja: "リシン" },
  { three: "Met", one: "M", name: "Methionine", ja: "メチオニン" },
  { three: "Phe", one: "F", name: "Phenylalanine", ja: "フェニルアラニン" },
  { three: "Pro", one: "P", name: "Proline", ja: "プロリン" },
  { three: "Ser", one: "S", name: "Serine", ja: "セリン" },
  { three: "Thr", one: "T", name: "Threonine", ja: "トレオニン" },
  { three: "Trp", one: "W", name: "Tryptophan", ja: "トリプトファン" },
  { three: "Tyr", one: "Y", name: "Tyrosine", ja: "チロシン" },
  { three: "Val", one: "V", name: "Valine", ja: "バリン" },
];

// 正規化して比較（大文字小文字・前後空白を無視）
export function normalize(s: string): string {
  return s.trim().toLowerCase();
}
