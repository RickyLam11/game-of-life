import { Color, IAwake, Vector2D } from '@/utils'

export class Canvas implements IAwake {
  private _elm: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D

  public get Element(): HTMLCanvasElement {
    return this._elm
  }

  public get Context(): CanvasRenderingContext2D {
    return this._ctx
  }

  constructor(public readonly Size: Vector2D) { }

  public Awake(): void {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', `${this.Size.x}px`)
    canvas.setAttribute('height', `${this.Size.y}px`)

    document.body.appendChild(canvas)
    this._elm = canvas

    const ctx = this._elm.getContext('2d')
    if (!ctx) {
      throw new Error('Context identifier is not supported')
    }

    this._ctx = ctx
  }

  public ClearRect(start: Vector2D, size: Vector2D): void {
    this._ctx.clearRect(start.x, start.y, size.x, size.y)
  }

  public FillRect(start: Vector2D, size: Vector2D, color: Color): void {
    this._ctx.beginPath()
    this._ctx.fillStyle = color.AsString()
    this._ctx.rect(start.x, start.y, size.x, size.y)
    this._ctx.fill()
  }

  public FillCircle(center: Vector2D, radius: number, color: Color): void {
    this._ctx.beginPath()
    this._ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    this._ctx.fillStyle = color.AsString()
    this._ctx.fill()
  }

  public strokeLine(start: Vector2D, end: Vector2D, lineWidth: number, color: Color): void {
    this._ctx.beginPath()
    this._ctx.lineWidth = lineWidth
    this._ctx.moveTo(start.x, start.y)
    this._ctx.lineTo(end.x, end.y)
    this._ctx.strokeStyle = color.AsString()
    this._ctx.stroke()
  }

  public SetStyle(style: Partial<CSSStyleDeclaration>): void {
    for (const key in style) {
      if (!Object.prototype.hasOwnProperty.call(style, key)) {
        continue
      }

      if (!style[key]) {
        continue
      }

      this._elm.style[key] = style[key] as string
    }
  }

  public CalcLocalPointFrom(globalPoint: Vector2D): Vector2D | null {
    const canvasRect = this._elm.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    const offset = {
      top: canvasRect.top + scrollTop,
      left: canvasRect.left + scrollLeft
    }

    const x = globalPoint.x - offset.left
    const y = globalPoint.y - offset.top

    if (x < 0 || y < 0) {
      return null
    }

    if (offset.left + canvasRect.width < x || offset.top + canvasRect.height < y) {
      return null
    }

    return new Vector2D(x, y)
  }
}
