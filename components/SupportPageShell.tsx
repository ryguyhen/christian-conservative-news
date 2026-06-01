import SupportStrip from "./SupportStrip";
import TopBar from "./TopBar";
import Masthead from "./Masthead";
import Footer from "./Footer";

export default function PageShell({
  children,
  storyCount = 0,
}: {
  children: React.ReactNode;
  storyCount?: number;
}) {
  return (
    <>
      <SupportStrip />
      <TopBar storyCount={storyCount} />
      <Masthead />
      <main className="max-w-content mx-auto px-6 py-10">{children}</main>
      <Footer />
    </>
  );
}
