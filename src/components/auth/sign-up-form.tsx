"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CircleAlert, CircleCheck, UserRound } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { signUp } from "@/lib/auth-client"
import { routes } from "@/lib/routes"
import { uploadImage } from "@/lib/upload-image"

type AccountRole = "RENTER" | "OWNER"

type SignUpErrors = Partial<
  Record<"name" | "email" | "password" | "image", string>
>

const roleOptions: {
  value: AccountRole
  label: string
  description: string
}[] = [
  {
    value: "RENTER",
    label: "Renter",
    description: "Book a car for your next trip.",
  },
  {
    value: "OWNER",
    label: "Owner",
    description: "List your cars and earn from them.",
  },
]

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: {
  name: string
  email: string
  password: string
}): SignUpErrors {
  const errors: SignUpErrors = {}

  if (!values.name.trim()) {
    errors.name = "Please enter your full name."
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address."
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address."
  }

  if (!values.password) {
    errors.password = "Please choose a password."
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long."
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password must include at least one uppercase letter."
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Password must include at least one lowercase letter."
  }

  return errors
}

export function SignUpForm() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<AccountRole>("RENTER")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [errors, setErrors] = useState<SignUpErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Release the object URL whenever the preview changes or the form unmounts.
  useEffect(() => {
    if (!imagePreview) return
    return () => URL.revokeObjectURL(imagePreview)
  }, [imagePreview])

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null

    if (!file) {
      setImageFile(null)
      setImagePreview(null)
      setErrors((current) => ({ ...current, image: undefined }))
      return
    }

    if (!file.type.startsWith("image/")) {
      setImageFile(null)
      setImagePreview(null)
      setErrors((current) => ({
        ...current,
        image: "Please choose an image file.",
      }))
      event.target.value = ""
      return
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setImageFile(null)
      setImagePreview(null)
      setErrors((current) => ({
        ...current,
        image: "Image must be 5 MB or smaller.",
      }))
      event.target.value = ""
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setErrors((current) => ({ ...current, image: undefined }))
  }

  function clearImage() {
    setImageFile(null)
    setImagePreview(null)
    setErrors((current) => ({ ...current, image: undefined }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) return

    setFormError(null)
    setSuccessMessage(null)

    const nextErrors = validate({ name, email, password })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const image = imageFile ? await uploadImage(imageFile) : undefined

      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        ...(image ? { image } : {}),
      })

      if (error) {
        setFormError(
          error.message ?? "We couldn't create your account. Please try again."
        )
        return
      }

      setSuccessMessage(
        "Your account is ready. Taking you to your dashboard…"
      )
      router.push(routes.dashboard)
      router.refresh()
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isBusy = isSubmitting || Boolean(successMessage)

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            {formError ? (
              <Alert variant="destructive">
                <CircleAlert aria-hidden="true" />
                <AlertTitle>Could not create your account</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            ) : null}

            {successMessage ? (
              <Alert>
                <CircleCheck aria-hidden="true" />
                <AlertTitle>Account created</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            ) : null}

            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="sign-up-name">Full name</FieldLabel>
              <Input
                id="sign-up-name"
                name="name"
                autoComplete="name"
                placeholder="Jane Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isBusy}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "sign-up-name-error" : undefined}
              />
              <FieldError id="sign-up-name-error">{errors.name}</FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="sign-up-email">Email</FieldLabel>
              <Input
                id="sign-up-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isBusy}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "sign-up-email-error" : undefined
                }
              />
              <FieldError id="sign-up-email-error">{errors.email}</FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.password)}>
              <FieldLabel htmlFor="sign-up-password">Password</FieldLabel>
              <Input
                id="sign-up-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isBusy}
                aria-invalid={Boolean(errors.password)}
                aria-describedby="sign-up-password-help sign-up-password-error"
              />
              <FieldDescription id="sign-up-password-help">
                At least 6 characters, including one uppercase and one
                lowercase letter.
              </FieldDescription>
              <FieldError id="sign-up-password-error">
                {errors.password}
              </FieldError>
            </Field>

            <Field>
              <FieldTitle>Account type</FieldTitle>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as AccountRole)}
                className="grid gap-3 sm:grid-cols-2"
                disabled={isBusy}
              >
                {roleOptions.map((option) => (
                  <FieldLabel
                    key={option.value}
                    htmlFor={`sign-up-role-${option.value}`}
                  >
                    <Field orientation="horizontal">
                      <RadioGroupItem
                        id={`sign-up-role-${option.value}`}
                        value={option.value}
                      />
                      <FieldContent>
                        <FieldTitle>{option.label}</FieldTitle>
                        <FieldDescription>
                          {option.description}
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            </Field>

            <Field data-invalid={Boolean(errors.image)}>
              <FieldLabel htmlFor="sign-up-image">
                Profile image{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <div className="flex items-start gap-3">
                <Avatar size="lg" className="size-14">
                  {imagePreview ? (
                    <AvatarImage src={imagePreview} alt="Profile preview" />
                  ) : null}
                  <AvatarFallback>
                    <UserRound className="size-6" aria-hidden="true" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col gap-1.5">
                  <Input
                    id="sign-up-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isBusy}
                    aria-invalid={Boolean(errors.image)}
                    aria-describedby={
                      errors.image ? "sign-up-image-error" : undefined
                    }
                  />
                  {imageFile ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="w-fit"
                      onClick={clearImage}
                      disabled={isBusy}
                    >
                      Remove image
                    </Button>
                  ) : (
                    <FieldDescription>
                      JPG or PNG, up to 5 MB.
                    </FieldDescription>
                  )}
                  <FieldError id="sign-up-image-error">
                    {errors.image}
                  </FieldError>
                </div>
              </div>
            </Field>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isBusy}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
