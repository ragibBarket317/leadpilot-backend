const findProspects = async (filters) => {
  const query = `${filters.industry} ${filters.location}`

  const response = await fetch(
    `http://localhost:8080/search?q=${encodeURIComponent(query)}&format=json`,
  )

  if (!response.ok) {
    throw new Error('SearXNG search failed')
  }

  const data = await response.json()

  return data.results.map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content,
  }))
}

module.exports = {
  findProspects,
}
