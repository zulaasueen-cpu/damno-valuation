import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Үйлчилгээний нөхцөл | ДАМНО ҮНЭЛГЭЭ",
  description: "ДАМНО ҮНЭЛГЭЭ ХХК-ийн үйлчилгээний нөхцөл.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Үйлчилгээний нөхцөл</h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            ДАМНО ҮНЭЛГЭЭ ХХК-ийн вэб сайтад зочилж, мэдээлэл авах, үйлчилгээ захиалахдаа дараах нөхцлийг хүлээн зөвшөөрч байгаа болно.
          </p>
          <h2 className="text-xl font-semibold text-white">1. Ерөнхий нөхцөл</h2>
          <p>Бид Монгол Улсын Хөрөнгийн үнэлгээний тухай хууль, YOVC, НБОУС, STOУС стандартаар үйлчилгээ үзүүлнэ.</p>
          <h2 className="text-xl font-semibold text-white">2. Үнэлгээний захиалга</h2>
          <p>Захиалгыг баталгаажуулсны дараа хариуцсан мэргэжилтэн томилогдож, хөрөнгийн байршилд очиж үнэлгээ хийнэ.</p>
          <h2 className="text-xl font-semibold text-white">3. Тайлан болон хариуцлага</h2>
          <p>Үнэлгээний тайланг тухайн хөрөнгийн байдлад үндэслэн бэлтгэж, мэргэжлийн хариуцлагын даатгалд хамрагдсан байна.</p>
        </div>
      </div>
    </div>
  );
}
