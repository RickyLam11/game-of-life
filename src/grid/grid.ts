import { CanvasLayer } from '@/canvas-layer'
import { Settings } from '@/settings'
import { Entity, Vector2D } from '@/utils'
import { Node } from '@/node'

export class Grid extends Entity {
  private _board: boolean[][] = []
  private _nodes: Node[] = []

  public get Nodes(): Node[] {
    return this._nodes
  }

  public Awake(): void {
    // Awake components
    super.Awake()

    this.DrawBackground()

    this.DrawGrid()
    this.InitBoardAndNode()

    // Awake child Entity (Node)
    for (const node of this.Nodes) {
      node.Awake()
    }
  }

  public Update(deltaTime: number): void {
    // Update components
    super.Update(deltaTime)

    this.UpdateNodeActive()

    // Update child Entity (Node)
    for (const node of this.Nodes) {
      node.Update(deltaTime)
    }
  }

  private DrawBackground(): void {
    CanvasLayer.Background.FillRect(
      new Vector2D(0, 0),
      new Vector2D(CanvasLayer.Background.Element.width, CanvasLayer.Background.Element.height),
      Settings.grid.background.color
    )
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

  private InitBoardAndNode(): void {
    const rowCount = Math.ceil(window.innerHeight / Settings.grid.node.size)
    const columnCount = Math.ceil(window.innerWidth / Settings.grid.node.size)
    const size = Settings.grid.node.size

    for (let i = 0; i < rowCount; i++) {
      const row = []
      for (let j = 0; j < columnCount; j++) {
        // node
        const start = new Vector2D(j * size, i * size)
        const end = new Vector2D(start.x + size, start.y + size)
        const index = new Vector2D(i, j)

        const node = new Node(start, end, index)
        this.Nodes.push(node)
        node.IsActive = (Math.random() < 0.1)
        // board
        row.push(node.IsActive)
      }
      this._board.push(row)
    }
  }

  private UpdateNodeActive(): void {
    for (const node of this.Nodes) {
      node.IsActive = (Math.random() < 0.1)
    }
  }
}
