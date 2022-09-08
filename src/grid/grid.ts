import { CanvasLayer } from '@/canvas-layer'
import { Settings } from '@/settings'
import { Entity, Vector2D } from '@/utils'
import { Node } from '@/node'

export class Grid extends Entity {
  private _board: boolean[][] = []
  private _nodes: Node[][] = []

  public get Nodes(): Node[][] {
    return this._nodes
  }

  public get RowCount(): number {
    return Math.ceil(window.innerHeight / Settings.grid.node.size)
  }

  public get ColumnCount(): number {
    return Math.ceil(window.innerWidth / Settings.grid.node.size)
  }

  public Awake(): void {
    // Awake components
    super.Awake()

    this.DrawBackground()

    this.DrawGrid()
    this.InitBoardAndNode()
    this.InitNodeNeighbours()

    // Awake child Entity (Node)
    for (const nodeRow of this.Nodes) {
      for (const node of nodeRow) {
        node.Awake()
      }
    }
  }

  public Update(deltaTime: number): void {
    this.CalculateNewBoard()
    this.ApplyBoardToNodes()

    // Update components
    super.Update(deltaTime)

    // Update child Entity (Node)
    for (const nodeRow of this.Nodes) {
      for (const node of nodeRow) {
        node.Update(deltaTime)
      }
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
    for (let i = 1; i < this.ColumnCount; i++) {
      const x = i * Settings.grid.node.size
      CanvasLayer.Background.strokeLine(
        new Vector2D(x, 0),
        new Vector2D(x, window.innerHeight),
        Settings.grid.stroke.width,
        Settings.grid.stroke.color
      )
    }

    for (let j = 1; j < this.RowCount; j++) {
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
    const size = Settings.grid.node.size

    for (let i = 0; i < this.RowCount; i++) {
      const boardRow = []
      const nodeRow = []
      for (let j = 0; j < this.ColumnCount; j++) {
        // node
        const start = new Vector2D(j * size, i * size)
        const end = new Vector2D(start.x + size, start.y + size)
        const index = new Vector2D(i, j)

        const node = new Node(start, end, index)
        nodeRow.push(node)
        node.IsAlive = (Math.random() < Settings.game.initialNodeRate)
        // board
        boardRow.push(node.IsAlive)
      }
      this.Nodes.push(nodeRow)
      this._board.push(boardRow)
    }
  }

  private InitNodeNeighbours(): void {
    for (let i = 0; i < this.RowCount; i++) {
      for (let j = 0; j < this.ColumnCount; j++) {
        const node = this.Nodes[i][j]

        for (const m of [-1, 0, 1]) {
          for (const n of [-1, 0, 1]) {
            if (!(m === 0 && n === 0)) {
              if (0 <= (i + m) && (i + m) < this.RowCount && 0 <= (j + n) && (j + n) < this.ColumnCount) {
                node.AddNeighbours(this.Nodes[i + m][j + n])
              }
            }
          }
        }
      }
    }
  }

  private CalculateNewBoard(): void {
    for (let i = 0; i < this.RowCount; i++) {
      for (let j = 0; j < this.ColumnCount; j++) {
        const node = this.Nodes[i][j]
        this._board[i][j] = node.CalculateNextCycle()
      }
    }
  }

  private ApplyBoardToNodes(): void {
    for (let i = 0; i < this.RowCount; i++) {
      for (let j = 0; j < this.ColumnCount; j++) {
        const node = this.Nodes[i][j]
        node.IsAlive = this._board[i][j]
      }
    }
  }

}
