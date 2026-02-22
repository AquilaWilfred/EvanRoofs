import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | EvanRoofs",
  description: "EvanRoofs internal admin portal",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin pages have their own header — no site navbar/footer
  return <>{children}</>;
}
