async function search(query: string): Promise<[]> {
  const response = await fetch(`/api/search?query=${query}`)
  return response.json()
}
