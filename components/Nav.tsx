import Link from "@/components/Link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  return (
    <nav className="flex gap-8 justify-center pb-8 lg:pb-16">
      {NAV_LINKS.map(({ label, href }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
