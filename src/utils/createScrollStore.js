import ScrollStore from '../Store/ScrollStore'

/**
 * @return {IScrollStore}
 */
export default function createScrollStore () {
  return ScrollStore.create({
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
  })
}
