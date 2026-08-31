import About from "../components/sections/About";
import Hero from "../components/sections/Hero";
import Procedures from "../components/sections/Procedures";
import Contact from "../components/sections/Contact";
import AuthForm from "../components/sections/AuthSection";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <div >
      <Hero lang={lang} />
      <About lang={lang} />
      <Procedures lang={lang} />
      <Contact lang={lang} />
      <AuthForm lang={lang} />
    </div>
  );
}

