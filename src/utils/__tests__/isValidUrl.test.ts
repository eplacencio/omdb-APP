import { isValidUrl } from '../isValidUrl'

describe('isValidUrl', () => {
  it('returns true for valid URLs', () => {
    const validUrls = [
      'https://example.com',
      'http://example.com',
      'https://example.com/image.jpg',
      'http://sub.example.com/path/to/image.png',
      'https://example.com/path?param=value'
    ]

    validUrls.forEach(url => {
      expect(isValidUrl(url)).toBe(true)
    })
  })

  it('returns false for invalid URLs', () => {
    const invalidUrls = [
      '',
      'not-a-url',
      'ftp://example.com',
      'javascript:alert(1)',
      'file://path/to/file',
      'N/A',
      undefined,
      null
    ]

    invalidUrls.forEach(url => {
      expect(isValidUrl(url as string)).toBe(false)
    })
  })

  it('returns false for URLs without http/https protocol', () => {
    const urls = [
      '//example.com',
      'example.com',
      'www.example.com'
    ]

    urls.forEach(url => {
      expect(isValidUrl(url)).toBe(false)
    })
  })
})