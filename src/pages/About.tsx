import { Twitter, Github, Linkedin, Quote, Users, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";

// const team = [
//   {
//     name: "دیوید فارن",
//     role: "بنیان‌گذار / مدیرعامل",
//     image: "",
//     quote: "نوآوری در قلب هر کاری است که انجام می‌دهیم.",
//     social: { twitter: "#", github: "#", linkedin: "#" }
//   },
//   {
//     name: "امیلیا اورا",
//     role: "طراح UI/UX",
//     image: "",
//     quote: "طراحی جایی است که عملکرد با احساس ترکیب می‌شود.",
//     social: { twitter: "#", github: "#", linkedin: "#" }
//   },
//   {
//     name: "ابله اقبنا",
//     role: "مشاور پشتیبانی",
//     image: "",
//     quote: "برتری یک عمل نیست، بلکه یک عادت است.",
//     social: { twitter: "#", github: "#", linkedin: "#" }
//   }
// ];

export default function About() {
  return (
    <div className="lg:container flex flex-col justify-center items-center lg:mx-auto py-24 lg:py-32">
      {/* بخش معرفی */}
      <div className="text-center mb-20 max-w-3xl px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          پیشبرد نوآوری دیجیتال
        </h1>
        <p className="text-lg text-muted-foreground">
          در هسته خود، ما مجموعه‌ای از نوآوران پرشور هستیم که متعهد به تغییر
          چشم‌انداز دیجیتال می‌باشیم. از سال ۲۰۱۸، راه‌حل‌های تحول‌آفرین را
          ارائه کرده‌ایم که کسب‌وکارها را در سراسر جهان توانمند می‌سازد.
        </p>
      </div>

      {/* بخش ارزش‌ها */}
      <div className="grid md:grid-cols-3 gap-8 mb-24 px-4">
        <div className="text-center p-6">
          <Users className="size-8 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">رویکرد کاربر محور</h3>
          <p className="text-muted-foreground">
            طراحی راه‌حل‌هایی که نیازها و رفتارهای واقعی انسان را در اولویت قرار
            می‌دهند
          </p>
        </div>
        <div className="text-center p-6">
          <Quote className="size-8 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">ارتباط شفاف</h3>
          <p className="text-muted-foreground">
            ایجاد اعتماد از طریق گفتگوی باز و فرآیندهای شفاف
          </p>
        </div>
        <div className="text-center p-6">
          <Globe className="size-8 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">نگاه جهانی</h3>
          <p className="text-muted-foreground">
            ایجاد راه‌حل‌هایی که مرزها و تفاوت‌های فرهنگی را در می‌نوردد
          </p>
        </div>
      </div>

      {/* بخش تیم */}
      <div className="max-w-2xl mx-auto text-center mb-14 px-4">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          آشنایی با نوآوران
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          ذهن‌های درخشانی که انقلاب دیجیتال ما را هدایت می‌کنند
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* کاربر ۱ */}
        <Card className="relative w-[400px] flex flex-col items-center justify-center p-6 overflow-hidden custom-transition-card">
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="size-24 mb-4">
              <AvatarImage src="" alt="دیوید فارن" />
              <AvatarFallback className="text-2xl">م</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">محمد امین</h3>
            <p className="text-sm text-muted-foreground mt-1">طراح گرافیک</p>
            <p className="mt-3 flex flex-col justify-center items-center text-xs italic text-muted-foreground">
              <Quote className="mb-2" size={16} strokeWidth={2} />
              خود را چون گوهر بدان، که درخشش نیاز به تأیید کسی ندارد
            </p>
            <div className="mt-4 flex gap-2">
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Twitter className="size-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                </a>
              </Button>
            </div>
          </CardContent>
          <BorderBeam
            duration={4}
            size={300}
            reverse
            className="from-transparent via-teal-700 to-transparent"
          />
        </Card>
        {/* کاربر ۲ */}
        <Card className="relative w-[400px] flex flex-col items-center justify-center p-6 overflow-hidden custom-transition-card">
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="size-24 mb-4">
              <AvatarImage src="" alt="امیلیا اورا" />
              <AvatarFallback className="text-2xl">م</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">مصطفی خزایی</h3>
            <p className="text-sm text-muted-foreground mt-1">UI/UX طراح</p>
            <p className="mt-3 flex flex-col justify-center items-center text-xs italic text-muted-foreground">
              <Quote className="mb-2" size={16} strokeWidth={2} />
              جهان را چنینست ساز و نهاد که جز مرگ را کس از مادر نزاد
            </p>
            <div className="mt-4 flex gap-2">
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Twitter className="size-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                </a>
              </Button>
            </div>
          </CardContent>
          <BorderBeam
            duration={4}
            size={300}
            className="from-transparent via-violet-700 to-transparent"
          />
        </Card>
        {/* کاربر ۳ */}
        <Card className="relative w-[400px] flex flex-col items-center justify-center p-6 overflow-hidden custom-transition-card">
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="size-24 mb-4">
              <AvatarImage src="" alt="ابله اقبنا" />
              <AvatarFallback className="text-2xl">آ</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">امیرعباس روئین‌تن</h3>
            <p className="text-sm text-muted-foreground mt-1">دواوپس</p>
            <p className="mt-3 flex flex-col justify-center items-center text-xs italic text-muted-foreground">
              <Quote className="mb-2" size={16} strokeWidth={2} />
              No Quote yet
            </p>
            <div className="mt-4 flex gap-2">
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Twitter className="size-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                </a>
              </Button>
            </div>
          </CardContent>
          <BorderBeam duration={8} size={100} />
        </Card>{" "}
      </div>

      {/* بخش داستان شرکت */}
      <div className="mt-20 max-w-4xl px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">سفر ما</h2>
        <p className="text-muted-foreground mb-6">
          از یک استارتاپ کوچک در یک گاراژ تا تبدیل شدن به یک شریک فناوری جهانی،
          داستان ما، داستان پایداری، نوآوری و تعهد بی‌وقفه به ارزش‌هایمان است.
          هر چالش، فرصتی بوده است، هر مشتری یک شریک بلندمدت، و هر نوآوری، سکوی
          پرشی به سوی تاثیرات بزرگ‌تر.
        </p>
        <Button variant="outline">کاوش در خط زمانی ما</Button>
      </div>
    </div>
  );
}
