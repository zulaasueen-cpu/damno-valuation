import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Хуудас олдсонгүй</h2>
      <p className="text-muted max-w-md mb-8">
        Хайсан хуудас байхгүй эсвэл өөр байршилд шилжсэн байж магадгүй.
      </p>
      <Link
        href="/"
        className="rounded-full bg-primary text-white px-8 py-3.5 font-semibold hover:scale-[1.02] transition-transform"
      >
        Нүүр хуудас руу буцах
      </Link>
    </div>
  );
}
