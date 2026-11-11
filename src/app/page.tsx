import { Calculator } from "@/components/sections/calculator";
import { Comparison } from "@/components/sections/comparison";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Survey } from "@/components/sections/survey";
import { Waitlist } from "@/components/sections/waitlist";
import { WhyNotIb } from "@/components/sections/why-not-ib";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Calculator />
        <Comparison />
        <WhyNotIb />
        <Survey />
        <Waitlist />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
