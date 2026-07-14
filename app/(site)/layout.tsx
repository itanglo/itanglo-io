import Nav from "@/components/Nav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-rows-[1fr_auto] gap-16">
      <div className="flex flex-col py-8 px-8 text-xl">
        <Nav />
        {children}
      </div>
      <div className="px-6 pt-6 pb-16 text-sm text-gray-300 bg-gray-800 text-right">&copy; Itanglo Software {new Date().getFullYear()}</div>
    </div>
  );
}