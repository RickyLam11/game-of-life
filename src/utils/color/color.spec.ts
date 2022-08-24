import { Color } from './color'

describe('>>> Color', () => {
  it('should instantiate with provided values', () => {
    const rgba = new Color(1, 2, 3, 0.1)

    expect(rgba.R).toEqual(1)
    expect(rgba.G).toEqual(2)
    expect(rgba.B).toEqual(3)
    expect(rgba.A).toEqual(0.1)
  })

  it('should throw an error if provided values are incorrect', () => {
    expect(() => new Color(-1, 2, 3, 0.1)).toThrow(/Red/)
    expect(() => new Color(999, 2, 3, 0.1)).toThrow(/Red/)
    expect(() => new Color(0.1, 2, 3, 0.1)).toThrow(/Red/)

    expect(() => new Color(1, -1, 3, 0.1)).toThrow(/Green/)
    expect(() => new Color(1, 999, 3, 0.1)).toThrow(/Green/)
    expect(() => new Color(1, 0.1, 3, 0.1)).toThrow(/Green/)

    expect(() => new Color(1, 2, -1, 0.1)).toThrow(/Blue/)
    expect(() => new Color(1, 2, 999, 0.1)).toThrow(/Blue/)
    expect(() => new Color(1, 2, 0.1, 0.1)).toThrow(/Blue/)

    expect(() => new Color(1, 2, 3, -1)).toThrow(/Alpha/)
    expect(() => new Color(1, 2, 3, 1.1)).toThrow(/Alpha/)
  })

  it('should convert to string', () => {
    const rgba = new Color(1, 2, 3, 0.1)

    expect(rgba.AsString()).toBe('rgba(1, 2, 3, 0.1)')
  })

  it('should instantiate from string', () => {
    const rgba = Color.FromString('rgba(1, 2, 3, 0.1)')

    expect(rgba.R).toEqual(1)
    expect(rgba.G).toEqual(2)
    expect(rgba.B).toEqual(3)
    expect(rgba.A).toEqual(0.1)
  })

  it('should throw error if cannot instantiate from string', () => {
    expect(() => Color.FromString('')).toThrow()
    expect(() => Color.FromString('?')).toThrow()
    expect(() => Color.FromString('rgb()')).toThrow()
    expect(() => Color.FromString('rgb(1)')).toThrow()
    expect(() => Color.FromString('rgb(1,2)')).toThrow()
    expect(() => Color.FromString('rgb(1,2,3)')).toThrow()
  })
})
