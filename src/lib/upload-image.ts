
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = (await response.json().catch(() => null)) as {
      url?: string
      error?: string
    } | null

    if (!response.ok || !data?.url) {
      throw new Error(
        data?.error ?? "Image upload failed. Please try again."
      )
    }

    const imageUrl = new URL(data.url)

    if (imageUrl.protocol !== "https:" && imageUrl.protocol !== "http:") {
      throw new Error("Invalid image URL returned by the server.")
    }

    return imageUrl.toString()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }

    throw new Error("Network error. Please try again.")
  }
}
