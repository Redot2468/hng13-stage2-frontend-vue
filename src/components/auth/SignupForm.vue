<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { toast } from 'vue-sonner'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form/'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const SignupSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(2, 'Name must be at least 2 characters long').trim(),
      email: z.string().email('Invalid email').min(1, 'Email is required').trim(),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          'Password must contain at least one letter and one number',
        )
        .trim(),

      confirmPassword: z.string().min(1, 'You need to confirm your password').trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
)

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: SignupSchema,
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const onSubmit = handleSubmit(async (formData) => {
  const userId = crypto.randomUUID()
  const hashedPassword = await bcrypt.hash(formData.password, 10)

  const newUser = {
    id: userId,
    name: formData.name,
    email: formData.email,
    password: hashedPassword,
  }

  const usersFromLs = localStorage.getItem('users')
  const usersData: (typeof newUser)[] = JSON.parse(usersFromLs ?? '[]')

  const existingUser = usersData.some((user) => user?.email === newUser.email)

  if (existingUser) {
    toast.error('Account already exists, Please login')
    return
  }

  localStorage.setItem('users', JSON.stringify([...usersData, newUser]))

  toast.success('Account created successfully! You can now log in.')

  router.push('/auth/login')
})
</script>

<template>
  <Card class="max-w-[400px] mx-auto w-full border-0 shadow-none">
    <CardHeader>
      <CardTitle>Create an Account</CardTitle>
      <CardDescription>Get started with TicketMS today</CardDescription>
    </CardHeader>

    <CardContent>
      <form className="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                auto-complete="off"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

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

        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormControl>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                auto-complete="off"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <button className="w-full bg-blue-700 mt-6 text-white py-2 rounded-md">Sign up</button>
      </form>
    </CardContent>

    <CardFooter class="flex justify-center">
      <CardDescription>
        Already have an account?
        <RouterLink to="/auth/login">
          <span class="text-blue-700 font-semibold">Login</span>
        </RouterLink>
      </CardDescription>
    </CardFooter>
  </Card>
</template>
