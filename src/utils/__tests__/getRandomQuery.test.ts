import { getRandomQuery } from '../getRandomQuery'

describe('getRandomQuery', () => {
  it('returns a string from the predefined list', () => {
    const result = getRandomQuery()
    
    // Get the actual list of queries from the implementation
    const queries = [
      'avengers',
      'star wars',
      'batman',
      'spider man',
      'superman',
      'wonder woman',
      'iron man',
      'thor',
      'captain america',
      'black panther',
    ]

    expect(queries).toContain(result)
  })

  it('returns different values on multiple calls', () => {
    const results = new Set()
    const iterations = 100 // Run multiple times to ensure randomness

    for (let i = 0; i < iterations; i++) {
      results.add(getRandomQuery())
    }

    // Should get at least a few different results
    expect(results.size).toBeGreaterThan(1)
  })
}) 