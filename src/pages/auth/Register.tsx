import { useForm } from "@tanstack/react-form";
import { Button } from "@mantine/core";
import useRegister from "@/Auth/hooks/useRegister";
import { isValidEmail } from "@/Common/utils/helpers";
import Layout from "@/Auth/Layout";

import { Link } from "@tanstack/react-router";
import type { RegisterPayload } from "@/Auth/types";
import FieldError from "@/Common/components/form/FieldError";
import Input from "@/Common/components/form/fields/Input";
import PasswordInput from "@/Common/components/form/fields/PasswordInput";
import EmailInput from "@/Common/components/form/fields/EmailInput";

export default function Register() {
  const { mutateAsync, isPending, error } = useRegister();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async ({ value }) => {
      const formData: RegisterPayload = {
        email: value.email,
        password: value.password,
      };

      await mutateAsync(formData);
    },
  });

  return (
    <Layout title="Rejestracja">
      <form.Provider>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <EmailInput form={form} />

          <PasswordInput form={form} name="password" label="Hasło" />

          <PasswordInput
            form={form}
            name="repeatPassword"
            label="Powtórz hasło"
          />

          <div className="relative pb-10 flex flex-col mt-4">
            <Button type="submit" loading={isPending} className="min-w-full">
              Zarejestruj się
            </Button>

            <div className="h-5 text-sm mt-2 text-center text-red-500 block">
              {error && error?.message}
            </div>
          </div>
        </form>
      </form.Provider>

      <p className="mt-10 text-center text-sm text-gray-500 flex gap-2 justify-center items-center">
        Masz konto?
        <Link
          to="/auth/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Zaloguj się
        </Link>
      </p>
    </Layout>
  );
}