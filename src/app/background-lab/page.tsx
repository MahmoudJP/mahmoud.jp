import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background directions | Mahmoud Adel",
  robots: { index: false, follow: false },
};

const options = [
  {
    id: "aurora",
    name: "01 — Aurora Grid",
    description: "شبكة هادئة مع وهج سماوي وبنفسجي؛ امتداد طبيعي للهوية الحالية.",
    note: "الأكثر اتزانًا للموقع المهني",
  },
  {
    id: "constellation",
    name: "02 — Constellation",
    description: "نقاط وخطوط دقيقة كخريطة اتصالات بين اللغات والأفكار.",
    note: "الأكثر تميزًا وارتباطًا بفكرة العمل متعدد اللغات",
  },
  {
    id: "tokyo",
    name: "03 — Tokyo Night",
    description: "خطوط ضوئية رأسية ولمسات نيون دافئة مستوحاة من طوكيو ليلًا.",
    note: "الأكثر شخصية وحيوية",
  },
  {
    id: "paper",
    name: "04 — Editorial Paper",
    description: "ملمس ورق داكن وخطوط طباعية دقيقة، مناسب جدًا لخلفية DTP والكتابة.",
    note: "الأكثر هدوءًا وفخامة",
  },
];

export default function BackgroundLabPage() {
  return (
    <main className="background-lab min-h-screen px-5 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/70">
          mahmoud.jp / visual exploration
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
          اختر الخلفية التي تشبه الموقع أكثر.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
          هذه معاينات للخلفية فقط. العناصر الأمامية ستظل واضحة، مع حركة هادئة واحترام إعداد
          تقليل الحركة في النظام.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {options.map((option) => (
            <article key={option.id} className="background-option-card">
              <div className={`background-swatch background-swatch--${option.id}`}>
                <div className="background-swatch__nav">
                  <span>Mahmoud Adel</span>
                  <span>Projects · Writing · Uses</span>
                </div>
                <div className="background-swatch__content">
                  <span className="background-swatch__pill">Multilingual product builder</span>
                  <h2>Work between<br />languages.</h2>
                  <p>خلفية ثابتة وخفيفة تبني عمقًا بدون أن تنافس المحتوى.</p>
                </div>
                <div className="background-swatch__card">DTP Master · Product work</div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-mono text-xs tracking-[0.16em] text-cyan-200/75">{option.name}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{option.description}</p>
                <p className="mt-4 text-xs font-medium text-slate-500">{option.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
