import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import Bounce from "@/components/effectlib/Bounce";
import { User, Lock, Key } from "lucide-react";
import Cookies from "js-cookie";

const step1Schema = z.object({
  first_name: z.string().min(1, "نام اول ضروری است"),
  last_name: z.string().min(1, "نام خانوادگی ضروری است"),
  email: z.string().email("آدرس ایمیل معتبر نیست"),
});

const step2Schema = z
  .object({
    password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "رمزهای عبور مطابقت ندارند",
    path: ["confirm_password"],
  });

const step3Schema = z.object({
  otp: z.string().length(6, "کد تایید باید 6 کاراکتر باشد"),
});

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    otp: "",
  });

  const form = useForm({
    resolver: zodResolver(
      step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema,
    ),
    defaultValues: formData,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      // Merge the current step's data with the existing form data
      const mergedData = { ...formData, ...data };
      setFormData(mergedData);

      // Prepare the payload based on the step
      let payload: any;
      if (step === 1) {
        payload = {
          step: 1,
          email: mergedData.email,
          first_name: mergedData.first_name,
          last_name: mergedData.last_name,
        };
      } else if (step === 2) {
        payload = {
          step: 2,
          email: mergedData.email,
          password: mergedData.password,
          confirm_password: mergedData.confirm_password,
        };
      } else if (step === 3) {
        payload = {
          step: 3,
          email: mergedData.email,
          otp: mergedData.otp,
        };
      }

      console.log("Sending payload:", payload); // Log the payload

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.detail || responseData.error || "خطا در ثبت نام ⚠️",
        );
      }

      if (step === 3) {
        alert("ثبت نام با موفقیت انجام شد! 🎉");
        window.location.href = "/";
      } else {
        setStep(step + 1);
      }
    } catch (err: any) {
      setError(err.message || "خطای سرور رخ داده است ⚠️");
      console.error("Signup error:", err.response || err.message); // Log the error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]" dir="rtl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-5 border rounded-lg max-w-md w-full"
        >
          <div className="flex-col-start gap-1">
            <span>مرحله {step} از 3</span>
            <Progress value={(step / 3) * 100} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex flex-col gap-2"
            >
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <User size={24} /> جزئیات شخصی
                  </h2>
                  <p className="text-muted-foreground">
                    لطفاً جزئیات شخصی خود را وارد کنید
                  </p>
                  <Bounce
                    className="Row-1"
                    delay={0.2}
                    duration={0.6}
                    bounceHeight={30}
                  >
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نام *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="نام" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Bounce>

                  <Bounce
                    className="Row-2"
                    delay={0.3}
                    duration={0.6}
                    bounceHeight={30}
                  >
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نام خانوادگی *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="نام خانوادگی" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Bounce>

                  <Bounce
                    className="Row-3"
                    delay={0.4}
                    duration={0.6}
                    bounceHeight={30}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ایمیل *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="ایمیل خود را وارد کنید"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Bounce>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Lock size={24} /> ایجاد رمز عبور
                  </h2>
                  <p className="text-muted-foreground">
                    یک رمز عبور امن انتخاب کنید
                  </p>
                  <Bounce
                    className="Row-1"
                    delay={0.2}
                    duration={0.6}
                    bounceHeight={30}
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رمز عبور *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="رمز عبور خود را وارد کنید"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Bounce>

                  <Bounce
                    className="Row-2"
                    delay={0.3}
                    duration={0.6}
                    bounceHeight={30}
                  >
                    <FormField
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تأیید رمز عبور *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="رمز عبور خود را تأیید کنید"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Bounce>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Key size={24} /> تایید حساب کاربری
                  </h2>
                  <p className="text-muted-foreground">
                    کد تایید ارسال شده به ایمیل خود را وارد کنید
                  </p>
                  <Bounce
                    className="Row-1"
                    delay={0.2}
                    duration={0.6}
                    bounceHeight={30}
                  >
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>کد تایید *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="کد تایید را وارد کنید"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Bounce>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {error && <div className="text-[#4c5ba6] text-sm">{error}</div>}

          <div className="flex justify-between">
            <Button type="submit" disabled={loading}>
              {loading
                ? "در حال ارسال..."
                : step === 3
                  ? "اتمام ثبت نام"
                  : "بعدی"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              قبلی
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
