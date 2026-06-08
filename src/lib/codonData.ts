// 標準遺伝暗号（コドン表）のデータ定義

export type Base = "U" | "C" | "A" | "G";

export const BASES: Base[] = ["U", "C", "A", "G"];

// アミノ酸（および終止コドン）の情報
export interface AminoAcid {
  three: string; // 3文字略称（例: Phe）。終止コドンは "Stop"
  one: string; // 1文字略称（例: F）。終止コドンは "*"
  name: string; // 英語の正式名称（例: Phenylalanine）。終止コドンは "Stop (terminator)"
}

// 各コドン（キーは "UUU" 形式）に対応するアミノ酸
export const CODON_TABLE: Record<string, AminoAcid> = (() => {
  const aa = {
    Phe: { three: "Phe", one: "F", name: "Phenylalanine" },
    Leu: { three: "Leu", one: "L", name: "Leucine" },
    Ile: { three: "Ile", one: "I", name: "Isoleucine" },
    Met: { three: "Met", one: "M", name: "Methionine" },
    Val: { three: "Val", one: "V", name: "Valine" },
    Ser: { three: "Ser", one: "S", name: "Serine" },
    Pro: { three: "Pro", one: "P", name: "Proline" },
    Thr: { three: "Thr", one: "T", name: "Threonine" },
    Ala: { three: "Ala", one: "A", name: "Alanine" },
    Tyr: { three: "Tyr", one: "Y", name: "Tyrosine" },
    His: { three: "His", one: "H", name: "Histidine" },
    Gln: { three: "Gln", one: "Q", name: "Glutamine" },
    Asn: { three: "Asn", one: "N", name: "Asparagine" },
    Lys: { three: "Lys", one: "K", name: "Lysine" },
    Asp: { three: "Asp", one: "D", name: "Aspartic acid" },
    Glu: { three: "Glu", one: "E", name: "Glutamic acid" },
    Cys: { three: "Cys", one: "C", name: "Cysteine" },
    Trp: { three: "Trp", one: "W", name: "Tryptophan" },
    Arg: { three: "Arg", one: "R", name: "Arginine" },
    Gly: { three: "Gly", one: "G", name: "Glycine" },
    Stop: { three: "Stop", one: "*", name: "Stop (terminator)" },
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
  { three: "Ala", one: "A", name: "Alanine" },
  { three: "Arg", one: "R", name: "Arginine" },
  { three: "Asn", one: "N", name: "Asparagine" },
  { three: "Asp", one: "D", name: "Aspartic acid" },
  { three: "Cys", one: "C", name: "Cysteine" },
  { three: "Gln", one: "Q", name: "Glutamine" },
  { three: "Glu", one: "E", name: "Glutamic acid" },
  { three: "Gly", one: "G", name: "Glycine" },
  { three: "His", one: "H", name: "Histidine" },
  { three: "Ile", one: "I", name: "Isoleucine" },
  { three: "Leu", one: "L", name: "Leucine" },
  { three: "Lys", one: "K", name: "Lysine" },
  { three: "Met", one: "M", name: "Methionine" },
  { three: "Phe", one: "F", name: "Phenylalanine" },
  { three: "Pro", one: "P", name: "Proline" },
  { three: "Ser", one: "S", name: "Serine" },
  { three: "Thr", one: "T", name: "Threonine" },
  { three: "Trp", one: "W", name: "Tryptophan" },
  { three: "Tyr", one: "Y", name: "Tyrosine" },
  { three: "Val", one: "V", name: "Valine" },
  { three: "Stop", one: "*", name: "Stop (terminator)" },
];

// 正規化して比較（大文字小文字・前後空白を無視）
export function normalize(s: string): string {
  return s.trim().toLowerCase();
}
