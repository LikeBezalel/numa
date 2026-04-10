import Link from "next/link";

export default function StickyInquiry() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-forest/15 bg-cream/95 p-3 backdrop-blur lg:hidden">
      <Link href="/inquiry" className="btn-primary w-full">
        Inquire to Book
      </Link>
    </div>
  );
}
