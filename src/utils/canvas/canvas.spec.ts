import { Canvas, Color, Vector2D } from '@/utils'

describe('>>> Canvas', () => {
  const size = new Vector2D(100, 100)
  let canvas: Canvas

  beforeEach(() => {
    canvas = new Canvas(size)
  })

  it('should create and attach canvas to the DOM when awakens', () => {
    const spyCreateElm = jest.spyOn(document, 'createElement')
    const apyAppendChild = jest.spyOn(document.body, 'appendChild')

    expect(spyCreateElm).not.toBeCalled()
    expect(apyAppendChild).not.toBeCalled()

    canvas.Awake()
    expect(spyCreateElm).toBeCalled()
    expect(apyAppendChild).toBeCalled()
  })

  describe('>> API', () => {
    beforeEach(() => {
      canvas.Awake()
    })

    it('should draw and fill the rect', () => {
      const start = new Vector2D(0, 0)
      const size = new Vector2D(10, 10)

      const spyBeginPath = jest.spyOn(canvas.Context, 'beginPath')
      const spyRect = jest.spyOn(canvas.Context, 'rect')
      const spyFill = jest.spyOn(canvas.Context, 'fill')

      expect(spyBeginPath).not.toBeCalled()
      expect(spyRect).not.toBeCalled()
      expect(spyFill).not.toBeCalled()

      canvas.FillRect(start, size, new Color(255, 255, 255, 1))

      expect(spyBeginPath).toBeCalled()
      expect(spyRect).toBeCalledWith(start.x, start.y, size.x, size.y)
      expect(spyFill).toBeCalled()
      expect(canvas.Context.fillStyle).toBe<string>('#ffffff')
    })

    it('should clear the rect', () => {
      const start = new Vector2D(0, 0)
      const size = new Vector2D(10, 10)

      const spy = jest.spyOn(canvas.Context, 'clearRect')

      expect(spy).not.toBeCalled()

      canvas.ClearRect(start, size)

      expect(spy).toBeCalledWith(start.x, start.y, size.x, size.y)
    })

    it('should draw and fill the circle', () => {
      const center = new Vector2D(0, 0)
      const radius = 1

      const spyBeginPath = jest.spyOn(canvas.Context, 'beginPath')
      const spyArc = jest.spyOn(canvas.Context, 'arc')
      const spyFill = jest.spyOn(canvas.Context, 'fill')

      canvas.FillCircle(center, radius, new Color(255, 255, 255, 1))

      expect(spyBeginPath).toBeCalled()
      expect(spyArc).toBeCalledWith(center.x, center.y, radius, 0, 2 * Math.PI)
      expect(spyFill).toBeCalled()
      expect(canvas.Context.fillStyle).toBe('#ffffff')
    })

    it('should draw a line', () => {
      const start = new Vector2D(10, 10)
      const end = new Vector2D(123, 456)
      const width = 2

      const spyBeginPath = jest.spyOn(canvas.Context, 'beginPath')
      const spyMove = jest.spyOn(canvas.Context, 'moveTo')
      const spyLine = jest.spyOn(canvas.Context, 'lineTo')

      canvas.strokeLine(start, end, width, new Color(255, 255, 255, 1))

      expect(spyBeginPath).toBeCalled()
      expect(spyMove).toBeCalledWith(start.x, start.y)
      expect(spyLine).toBeCalledWith(end.x, end.y)
      expect(canvas.Context.lineWidth).toBe(width)
      expect(canvas.Context.strokeStyle).toBe('#ffffff')
    })

    it('should set css style', () => {
      const zIndex = '1'

      expect(canvas.Element.style.zIndex).not.toBe<string>(zIndex)

      canvas.SetStyle({ zIndex })

      expect(canvas.Element.style.zIndex).toBe<string>(zIndex)
    })

    describe('>>> calculate local point by global', () => {
      beforeEach(() => {
        canvas.Element.getBoundingClientRect = jest.fn().mockReturnValue({
          top: 20, left: 20, width: 500, height: 500
        })
      })

      it('should return null if point is out of canvas boundaries', () => {
        expect(canvas.CalcLocalPointFrom(new Vector2D(0, 0))).toBeNull()
        expect(canvas.CalcLocalPointFrom(new Vector2D(541, 400))).toBeNull()
        expect(canvas.CalcLocalPointFrom(new Vector2D(400, 541))).toBeNull()
      })

      it('should return local point otherwise', () => {
        expect(canvas.CalcLocalPointFrom(new Vector2D(200, 300))).toEqual(new Vector2D(180, 280))
      })
    })
  })
})
