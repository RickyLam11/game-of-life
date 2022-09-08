import { Node, mockNodeFactory, NodeDrawComponent } from '@/node'

describe('>>> Node', () => {
  let node: Node

  beforeEach(() => {
    node = mockNodeFactory()
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(NodeDrawComponent.prototype, 'Awake')
    const spyDrawCompUpdate = jest.spyOn(NodeDrawComponent.prototype, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    node.Awake()
    expect(spyDrawCompAwake).toBeCalled()

    node.Update(0)
    expect(spyDrawCompUpdate).toBeCalled()
  })

  describe('>> Calculate next cycle', () => {
    let deadNode1: Node
    let aliveNode1: Node
    let aliveNode2: Node
    let aliveNode3: Node
    let aliveNode4: Node
    let aliveNode5: Node

    beforeEach(() => {
      deadNode1 = mockNodeFactory()

      aliveNode1 = mockNodeFactory()
      aliveNode2 = mockNodeFactory()
      aliveNode3 = mockNodeFactory()
      aliveNode4 = mockNodeFactory()
      aliveNode5 = mockNodeFactory()
      aliveNode1.IsAlive = true
      aliveNode2.IsAlive = true
      aliveNode3.IsAlive = true
      aliveNode4.IsAlive = true
      aliveNode5.IsAlive = true

      // node is deaflut alive
      node.IsAlive = true
      // have a dead neighbour should not affect the calculation
      node.AddNeighbours(deadNode1)
    })

    it('should die due to underpopulation', () => {
      expect(node.CalculateNextCycle()).toBeFalsy()

      node.AddNeighbours(aliveNode1)
      expect(node.CalculateNextCycle()).toBeFalsy()
    })

    it('should stay alive due to survival', () => {
      node.AddNeighbours(aliveNode1)
      node.AddNeighbours(aliveNode2)
      expect(node.CalculateNextCycle()).toBeTruthy()

      node.AddNeighbours(aliveNode3)
      expect(node.CalculateNextCycle()).toBeTruthy()
    })

    it('should die due to overpopulation', () => {
      node.AddNeighbours(aliveNode1)
      node.AddNeighbours(aliveNode2)
      node.AddNeighbours(aliveNode3)
      node.AddNeighbours(aliveNode4)
      expect(node.CalculateNextCycle()).toBeFalsy()

      node.AddNeighbours(aliveNode5)
      expect(node.CalculateNextCycle()).toBeFalsy()
    })

    it('should give birth due to reproduction', () => {
      node.IsAlive = false
      node.AddNeighbours(aliveNode1)
      node.AddNeighbours(aliveNode2)
      expect(node.CalculateNextCycle()).toBeFalsy()

      node.AddNeighbours(aliveNode3)
      expect(node.CalculateNextCycle()).toBeTruthy()

      node.AddNeighbours(aliveNode4)
      expect(node.CalculateNextCycle()).toBeFalsy()
    })

    it('should stay dead if it is already', () => {
      node.IsAlive = false
      expect(node.CalculateNextCycle()).toBeFalsy()
    })
  })

})
