import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="container-px flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <span className="font-display text-7xl font-bold text-gradient">404</span>
      <h1 className="text-2xl font-bold">This page took an unexpected path</h1>
      <p className="max-w-md text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn-primary">
        <Icon name="arrow-right" size={16} className="rotate-180" /> Back home
      </Link>
    </section>
  );
}
