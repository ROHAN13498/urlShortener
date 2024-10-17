"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', values, { withCredentials: true });
      router.push("/dashboard");
      console.log("Login successful");
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message;
        if (errorMessage) {
          form.setError("root.serverError", {
            type: "manual",
            message: `${errorMessage}`,
          });
        } else {
          console.error("Unknown login error:", errorMessage);
        }
      } else {
        console.log("Login failed", error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Login</h1>
      <p className="text-gray-600 mb-6">
        Don't have an account?{" "}
        <Link
          className="underline hover:text-slate-700 transition-colors"
          href="/auth/signup"
        >
          Signup
        </Link>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {form.formState.errors.root?.serverError && (
            <div className="text-red-500">
              {form.formState.errors.root.serverError.message}
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-gray-300 p-8 rounded-lg shadow-lg w-96">
        <ProfileForm />
      </div>
    </div>
  );
};

export default Page;
