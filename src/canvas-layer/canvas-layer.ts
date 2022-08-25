import { Canvas, Vector2D } from '@/utils'

export class CanvasLayer {
  private static _background: Canvas
  private static _foreground: Canvas

  private constructor() {
    // make it unaccessible
  }

  // why no just private ?
  // cause it is call from another static call
  private static InitCanvas(style: Partial<CSSStyleDeclaration>): Canvas {
    const width = window.innerWidth
    const height = window.innerHeight
    const canvas = new Canvas(new Vector2D(width, height))
    canvas.Awake()
    canvas.SetStyle(style)

    return canvas
  }

  // as it is a static function, no `new CanvasLayer()` is needed
  public static get Background(): Canvas {
    if (!this._background) {
      this._background = this.InitCanvas({ zIndex: '0' })
    }

    return this._background
  }

  public static get Foreground(): Canvas {
    if (!this._foreground) {
      this._foreground = this.InitCanvas({ zIndex: '1' })
    }

    return this._foreground
  }
}
