import { IComponent } from '@/utils'
import { Node } from '@/node'
import { CanvasLayer } from '@/canvas-layer'
import { Settings } from '@/settings'

export class NodeDrawComponent implements IComponent {
  public Entity: Node

  public Awake(): void {
    this.Clear()
  }

  public Update(deltaTime: number): void {
    this.Clear()
    this.Draw()
  }

  private Clear(): void {
    CanvasLayer.Foreground.ClearRect(this.Entity.Start, this.Entity.Size)
  }

  private Draw(): void {
    if (this.Entity.IsAlive) {
      CanvasLayer.Foreground.FillRect(
        this.Entity.Start,
        this.Entity.Size,
        Settings.grid.node.color
      )
    }
  }
}
