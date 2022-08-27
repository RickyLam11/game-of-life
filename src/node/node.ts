import { Settings } from '@/settings'
import { Entity, Vector2D } from '@/utils'
import { NodeDrawComponent } from './components'

export class Node extends Entity {
  private _neighbours: Node[] = []

  public IsAlive: boolean

  public get Size(): Vector2D {
    return new Vector2D(
      this.End.x - this.Start.x,
      this.End.y - this.Start.y
    )
  }

  public get Neighbours() {
    return this._neighbours
  }

  public AddNeighbours(node: Node): void {
    this._neighbours.push(node)
  }

  constructor(
    public readonly Start: Vector2D,
    public readonly End: Vector2D,
    public readonly Index: Vector2D
  ) {
    super()
  }

  public Awake(): void {
    this.AddComponent(new NodeDrawComponent())

    // call parent Awake to awake components
    super.Awake()
  }

  public Update(deltaTime: number): void {
    this.UpdateNextCycle()

    // call parent Awake to awake components
    super.Update(deltaTime)
  }

  private UpdateNextCycle(): void {
    let count = 0
    for (const node of this.Neighbours) {
      count += (node.IsAlive) ? 1 : 0
    }

    if (!this.IsAlive && Settings.rule.revival.includes(count)) {
      // cell is NOT alive
      this.IsAlive = true
    } else if (this.IsAlive && Settings.rule.stayAlive.includes(count)) {
      // cell is alive
      this.IsAlive = true
    } else {
      this.IsAlive = false
    }
  }
}
