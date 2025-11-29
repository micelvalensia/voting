import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/api/auth";
import { registerSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

type RegisterForm = z.infer<typeof registerSchema>;

export default function SignUp() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: RegisterForm) {
    try {
      const regis = await register(
        values.username,
        values.name,
        values.email,
        values.password
      );

      if (regis.data?.success) {
        alert("Registrasi berhasil!");
        router.push("/sign-in");
      } else {
        alert(regis.data?.message || "Terjadi kesalahan.");
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
        className="p-8 rounded-2xl border border-gray-300 shadow-lg space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">Sign Up</h1>{" "}
        </div>
        <FormField
          name="username"
          control={form.control}
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-lg">Name</FormLabel>{" "}
              <FormControl>
                <Input
                  placeholder="Enter name..."
                  {...field}
                  className="h-12 text-lg px-4"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-lg">Email</FormLabel>{" "}
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email..."
                  {...field}
                  className="h-12 text-lg px-4"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-lg">Password</FormLabel>{" "}
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password..."
                  {...field}
                  className="h-12 text-lg px-4"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-12 text-lg mt-2">
          Sign Up
        </Button>
        <div className="text-center mt-2 text-base">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
