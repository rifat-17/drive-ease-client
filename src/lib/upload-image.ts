export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })
  const data = (await response.json().catch(() => null)) as {
    url?: string
    error?: string
  } | null

  if (!response.ok || !data?.url) {
    throw new Error(data?.error ?? "Image upload failed. Please try again.")
  }

  return data.url
}
