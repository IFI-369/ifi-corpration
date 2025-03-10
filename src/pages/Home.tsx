﻿import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { SparklesText } from "@/components/magicui/sparkles-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { AnimatedBeamSection } from "@/components/effectlib/AnimatedBeamSection";
import Bounce from "@/components/effectlib/Bounce";
import { TextShine } from "@/components/effectlib/TextShine";
import CanvasCursor from "@/components/effectlib/canvas-cursor";
import Pricing from "@/components/pricingSection";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";

interface FaqItem {
  question: string;
  answer: string;
}

interface HomeProps {
  icon?: React.ReactNode;
  heading?: string;
  descriptionOne?: React.ReactNode;
  descriptionTwo?: React.ReactNode;
  button?: {
    text: string;
    icon?: React.ReactNode;
    url: string;
  };
  trustText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const faqItems: FaqItem[] = [
  {
    question: "چگونه این وب‌سایت محتوای شبکه‌های اجتماعی را جمع‌آوری می‌کند؟",
    answer:
      "وب‌سایت با استفاده از APIهای رسمی پلتفرم‌ها مانند توییتر، اینستاگرام و تردز، پست‌ها و ویدیوهای محبوب را جمع‌آوری می‌کند و آنها را بر اساس تعداد لایک‌ها و بازدیدها رتبه‌بندی می‌کند."
  },
  {
    question: "چگونه می‌توانم پست‌ها را بر اساس موضوعات خاص جستجو کنم؟",
    answer:
      "شما می‌توانید از فیلترهای مختلف موجود در سایت برای جستجوی پست‌ها بر اساس موضوعاتی مانند برنامه‌نویسی، تناسب اندام و غیره استفاده کنید."
  },
  {
    question: "آیا می‌توانم جزئیات بیشتری از پست‌ها و ویدیوها ببینم؟",
    answer:
      "بله، با کلیک بر روی هر پست، می‌توانید جزئیات بیشتری مانند تعداد لایک‌ها، نظرات، اشتراک‌گذاری‌ها و تحلیل‌های مرتبط را مشاهده کنید."
  },
  {
    question: "چگونه این وب‌سایت دلیل محبوبیت یک پست را تحلیل می‌کند؟",
    answer:
      "ما از الگوریتم‌های هوش مصنوعی برای شناسایی عواملی استفاده می‌کنیم که باعث محبوبیت پست‌ها می‌شوند و این تحلیل‌ها به شما کمک می‌کند تا درک بهتری از محتوای پربازدید داشته باشید."
  },
  {
    question: "آیا خلاصه‌ای از پست‌ها و ویدیوها وجود دارد؟",
    answer:
      "بله، با استفاده از یک چت‌بات هوش مصنوعی، شما می‌توانید خلاصه‌ای از پست‌ها و ویدیوها را دریافت کنید."
  },
  {
    question: "چگونه به روزرسانی‌های جدید پست‌ها و ویدیوها را دریافت کنم؟",
    answer:
      "پست‌ها و ویدیوهای جدید به‌صورت دوره‌ای هر ۳ تا ۵ روز به سایت اضافه می‌شوند."
  }
];

const Home = ({
  heading = "بهترین‌ها را از دست ندهید: انتخاب‌های برتر از شبکه‌های اجتماعی",
  descriptionOne = (
    <>
      پلتفرم هوشمند ما با استفاده از{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        هوش مصنوعی
      </span>
      ، محتوای شبکه‌های اجتماعی مانند{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        توییت‌ها
      </span>
      ،{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        پست‌ها
      </span>{" "}
      و{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        ویدیوهای یوتیوب
      </span>{" "}
      را با دقت تحلیل می‌کند. این تحلیل به ما کمک می‌کند تا عواملی که باعث{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        افزایش بازدید
      </span>{" "}
      و{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        تعامل بیشتر با محتوا
      </span>{" "}
      می‌شوند، شناسایی کنیم.
    </>
  ),

  descriptionTwo = (
    <>
      با{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        پلتفرم هوشمند
      </span>{" "}
      ما، شما می‌توانید بدون نیاز به صرف وقت زیاد در جستجو و تحلیل محتوای مختلف،{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        خلاصه‌ای جامع
      </span>{" "}
      از مطالب و{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        عوامل موفقیت
      </span>{" "}
      آن‌ها دریافت کنید. این اطلاعات به شما کمک می‌کند تا{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        استراتژی‌های محتوای
      </span>{" "}
      خود را بهبود دهید و محتوای{" "}
      <span className="txtshadow font-[Doran] text-[var(--text-color)]">
        جذاب‌تر و مؤثرتر
      </span>{" "}
      تولید کنید.
    </>
  ),
  button = {
    text: "مشاهده امکانات",
    icon: <Zap className="ml-2 size-4" />,
    url: ""
  },
  trustText = "اعتماد بیش از 0 کسب‌وکار در سراسر جهان"
}: HomeProps) => {
  return (
    <>
      <CanvasCursor />
      <ScrollProgress className="top-0" />
      <div className="flex flex-col justify-center items-center text-center mt-10 md:mt-20">
        <Bounce className="Row-1" delay={0.2} duration={0.6} bounceHeight={30}>
          <h2 className="mx-10 max-w-screen-lg text-balance font-[Doran]">
            <SparklesText text={heading} className="text-3xl lg:text-5xl" />
          </h2>
        </Bounce>

        <Bounce className="Row-1" delay={0.3} duration={0.6} bounceHeight={30}>
          <p className="mx-10 mt-10 max-w-screen-md text-center text-muted-foreground md:text-lg">
            {descriptionOne}
          </p>
        </Bounce>

        <Bounce className="Row-1" delay={0.4} duration={0.6} bounceHeight={30}>
          <p className="mx-10 mt-3 max-w-screen-md text-center text-muted-foreground md:text-lg">
            {descriptionTwo}
          </p>
        </Bounce>

        <Bounce className="Row-1" delay={0.5} duration={0.6} bounceHeight={30}>
          <Button
            size="lg"
            asChild
            effect="expandIcon"
            icon={Zap}
            iconPlacement="left"
            className="rounded-full mt-16"
          >
            <a href={button.url}>{button.text}</a>
          </Button>
          {trustText && (
            <div className="text-xs mt-3 text-muted-foreground">
              <TextShine
                text={trustText}
                shineColor="var(--Circ)"
                duration={2}
              />
            </div>
          )}
        </Bounce>

        <Bounce
          className="Row-1 mt-20"
          delay={0.6}
          duration={0.6}
          bounceHeight={30}
        >
          <AnimatedBeamSection />
        </Bounce>
      </div>

      <Bounce
        className="Row-1 mt-20"
        delay={0.6}
        duration={0.6}
        bounceHeight={30}
      >
        <Separator className="mt-10 bg-[var(--Separator)] w-[70%] lg:w-[50%] mx-auto" />
      </Bounce>

      <Bounce
        className="Row-1 mt-10"
        delay={0.8}
        duration={0.6}
        bounceHeight={30}
      >
        <Pricing />
      </Bounce>

      <Bounce
        className="Row-1 mt-20"
        delay={0.8}
        duration={0.6}
        bounceHeight={30}
      >
        <Separator className="mt-10 bg-[var(--Separator)] w-[70%] lg:w-[50%] mx-auto" />
      </Bounce>

      <Bounce
        className="Row-1 my-20"
        delay={0.7}
        duration={0.6}
        bounceHeight={30}
      >
        <div className="container mx-auto" dir="rtl">
          <h1 className="text-center mb-4 text-3xl font-semibold md:mb-11 md:text-5xl">
            سوالات متداول
          </h1>
          <Accordion
            dir="rtl"
            type="single"
            collapsible
            className="flex flex-col justify-start text-right w-full"
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Bounce>

      <Bounce
        className="Row-1 my-20"
        delay={0.8}
        duration={0.6}
        bounceHeight={30}
      >
        <Footer />
      </Bounce>
    </>
  );
};

export default Home;
