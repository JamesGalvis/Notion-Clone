import Navbar from './_components/navbar';

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full">
      <Navbar />
      <main className="h-full pt-[8rem]">{children}</main>
    </div>
  );
}

export default MarketingLayout;
