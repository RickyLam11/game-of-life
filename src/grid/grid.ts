import { CanvasLayer } from '@/canvas-layer'
import { Settings } from '@/settings'
import { Entity, Vector2D } from '@/utils'

export class Grid extends Entity {
  public Awake(): void {
    CanvasLayer.Background.FillRect(
      new Vector2D(0, 0),
      new Vector2D(CanvasLayer.Background.Element.width, CanvasLayer.Background.Element.height),
      Settings.grid.background.color
    )

    this.drawGrid()
    this.DrawGrid()
  }

  public Update(deltaTime: number): void {
    /* */
  }

  private DrawGrid(): void {
    const columnCount = Math.ceil(window.innerWidth / Settings.grid.node.size)
    const rowCount = Math.ceil(window.innerHeight / Settings.grid.node.size)

    for (let i = 1; i < columnCount; i++) {
      const x = i * Settings.grid.node.size
      CanvasLayer.Background.strokeLine(
        new Vector2D(x, 0),
        new Vector2D(x, window.innerHeight),
        Settings.grid.stroke.width,
        Settings.grid.stroke.color
      )
    }

    for (let j = 1; j < rowCount; j++) {
      const y = j * Settings.grid.node.size
      CanvasLayer.Background.strokeLine(
        new Vector2D(0, y),
        new Vector2D(window.innerWidth, y),
        Settings.grid.stroke.width,
        Settings.grid.stroke.color
      )
    }
  }
}
