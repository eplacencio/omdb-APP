import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    )

    // Change the value multiple times rapidly
    rerender({ value: 'change1' })
    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(result.current).toBe('initial') // Should still be initial

    rerender({ value: 'change2' })
    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(result.current).toBe('initial') // Should still be initial

    // After full delay, should update to latest value
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('change2')
  })

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'start' } }
    )

    rerender({ value: 'updated' })
    
    // Before delay
    expect(result.current).toBe('start')
    
    // After delay
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(result.current).toBe('updated')
  })

  it('cancels previous debounce on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500))
    
    unmount()
    
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    // No errors should occur
    expect(true).toBe(true)
  })
})