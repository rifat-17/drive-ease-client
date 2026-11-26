import { NextResponse } from "next/server"

const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function POST(request: Request) {
  const apiKey = process.env.IMGBB_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Image uploads are not configured." },
      { status: 500 }
    )
  }

  const formData = await request.formData().catch(() => null)
  const file = formData?.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Please choose an image to upload." },
      { status: 400 }
    )
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are allowed." },
      { status: 400 }
    )
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Image must be 5 MB or smaller." },
      { status: 400 }
    )
  }

  const body = new FormData()
  body.append("image", file)

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
    { method: "POST", body }
  )

  if (!response.ok) {
    return NextResponse.json(
      { error: "Image upload failed. Please try again." },
      { status: 502 }
    )
  }

  const data = (await response.json()) as { data?: { url?: string } }

  if (!data.data?.url) {
    return NextResponse.json(
      { error: "Image upload failed. Please try again." },
      { status: 502 }
    )
  }

  return NextResponse.json({ url: data.data.url })
}
