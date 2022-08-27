import { Color } from '@/utils'

export const Settings = Object.freeze({
  grid: {
    background: {
      color: new Color(51, 51, 51, 1),
    },
    stroke: {
      width: 1,
      color: new Color(90, 90, 90, 0.5)
    },
    node: {
      size: 10,
      offset: 10,
      color: new Color(100, 240, 150, 1)
    },
  },
  rule: {
    stayAlive: [2, 3],
    revival: [3]
  }
})
