import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Нууцлалын бодлого | ДАМНО ҮНЭЛГЭЭ",
  description: "ДАМНО ҮНЭЛГЭЭ ХХК-ийн нууцлалын бодлого.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Нууцлалын бодлого</h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            ДАМНО ҮНЭЛГЭЭ ХХК нь харилцагчдынхаа мэдээллийн нууцлал, аюулгүй байдлыг чухалчилж, Монгол Улсын холбогдох хууль тогтоомжийн дагуу мэдээлэл цуглуулах, хадгалах, ашиглах журам баримталдаг.
          </p>
          <h2 className="text-xl font-semibold text-white">1. Мэдээлэл цуглуулах</h2>
          <p>Бид зөвхөн үйлчилгээ үзүүлэхэд шаардлагатай холбоо барих мэдээлэл, хөрөнгийн тодорхойлолтыг цуглуулна.</p>
          <h2 className="text-xl font-semibold text-white">2. Мэдээлэл хадгалах</h2>
          <p>Цуглуулсан мэдээллийг нууцлалын дүрэм, мэргэжлийн стандартад нийцүүлэн хадгална.</p>
          <h2 className="text-xl font-semibold text-white">3. Мэдээлэл хуваалцах</h2>
          <p>Харилцагчийн зөвшөөрөлгүйгээр гуравдагч этгээдэд мэдээлэл шилжүүлэхгүй.</p>
        </div>
      </div>
    </div>
  );
}
