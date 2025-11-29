import { loginSchema } from "@/lib/validators/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

type LoginForm = z.infer<typeof loginSchema>;

export default function SignIn() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: LoginForm) {
    try {
      const signin = await login(values.username, values.password);
      console.log(signin);
      if (signin.data?.success) {
        alert("berhasil");
        router.push("/");
      } else {
        alert(signin.data?.message || "Terjadi kesalahan");
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Terjadi kesalahan pada server.";
      alert(msg);
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-8 rounded-2xl border border-gray-300 shadow-lg space-y-6"
      >
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">Sign In</h1>
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-lg">Username</FormLabel>{" "}
              <FormControl>
                <Input
                  placeholder="Enter username..."
                  {...field}
                  className="h-12 text-lg px-4"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-lg">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  className="h-12 text-lg px-4"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-12 text-lg mt-2">
          Submit
        </Button>

        <div className="text-center mt-2 text-base">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
