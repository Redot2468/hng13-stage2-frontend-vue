<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { toast } from 'vue-sonner'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  name: string
  email: string
  password?: string
}

const LoginSchema = toTypedSchema(
  z.object({
    email: z.string().email('invalid email').min(1, 'Email is required').trim(),
    password: z.string().min(1, 'Password is required').trim(),
  }),
)

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: LoginSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit(async (formData) => {
  const usersFromLs: User[] = JSON.parse(localStorage.getItem('users') ?? '[]')

  const existingUser = usersFromLs?.find((user) => user.email === formData.email)

  if (!existingUser || !existingUser.password) {
    toast.error('invalid email or password')
    return
  }

  const doesPasswordMatch = await bcrypt.compare(formData.password, existingUser.password)

  if (!doesPasswordMatch) {
    toast(toast.error('invalid email or password'))
    return
  }

  const session = {
    id: existingUser?.id,
    name: existingUser?.name,
    email: existingUser?.email,
  }

  localStorage.setItem('ticketapp_session', JSON.stringify(session))

  toast.success('Welcome back')

  setTimeout(() => {
    router.push('/dashboard')
  }, 500)
})
</script>

<template>
  <Card class="max-w-[400px] mx-auto w-full border-0 shadow-none">
    <CardHeader>
      <CardTitle>Welcome Back</CardTitle>
      <CardDescription>Login to your account to continue</CardDescription>
    </CardHeader>

    <CardContent>
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                auto-complete="off"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl>
              <Input
                id="password"
                type="password"
                placeholder="********"
                auto-complete="off"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <button class="w-full bg-blue-700 mt-6 text-white py-2 rounded-md">Login</button>
      </form>
    </CardContent>

    <CardFooter class="flex justify-center">
      <CardDescription>
        Don't have an account?
        <RouterLink to="/auth/signup">
          <span class="text-blue-700 font-semibold">Sign up</span>
        </RouterLink>
      </CardDescription>
    </CardFooter>
  </Card>
</template>
