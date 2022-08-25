import { Canvas } from '@/utils'
import { CanvasLayer } from './canvas-layer'

jest.mock('@/utils')
describe('>>> CanvasLayer', () => {
  it('should create Background canvas only once', () => {
    expect(Canvas).not.toBeCalled()

    const canvas1 = CanvasLayer.Background
    const canvas2 = CanvasLayer.Background

    expect(canvas1).toBe(canvas2)
    expect(Canvas).toBeCalledTimes(1)
  })

  it('should create Foreground canvas only once', () => {
    expect(Canvas).not.toBeCalled()

    const canvas1 = CanvasLayer.Foreground
    const canvas2 = CanvasLayer.Foreground

    expect(canvas1).toBe(canvas2)
    expect(Canvas).toBeCalledTimes(1)
  })
})
