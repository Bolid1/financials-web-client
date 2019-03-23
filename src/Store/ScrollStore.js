import { types } from 'mobx-state-tree'

const ScrollStore = types
  .model('ScrollStore', {
      position: types
        .model({
          x: types.number,
          y: types.number,
        })
        .actions(self => ({
          set (x, y) {
            self.x = x
            self.y = y
          },
        })),

      size: types
        .model({
          width: types.number,
          height: types.number,
        })
        .actions(self => ({
          set (width, height) {
            self.width = width
            self.height = height
          },
        })),
    },
  )
  .views(self => ({
    get isBottom () {
      return self.position.y >= self.size.height - 10
    },
  }))
  .actions(self => ({
      /**
       * @param {HTMLElement} element
       */
      onScroll (element) {
        self.position.set(element.scrollLeft + element.offsetWidth, element.scrollTop + element.offsetHeight)
        self.size.set(element.scrollWidth, element.scrollHeight)
      },
    }),
  )

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
