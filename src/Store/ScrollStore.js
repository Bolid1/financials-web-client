import { types } from 'mobx-state-tree'

/**
 * @class IScrollStore
 */
export default types
  .model('ScrollStore', {
      /**
       * @memberOf IScrollStore#
       */
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

      /**
       * @memberOf IScrollStore#
       */
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
       * @memberOf IScrollStore#
       */
      onScroll (element) {
        self.position.set(element.scrollLeft + element.offsetWidth, element.scrollTop + element.offsetHeight)
        self.size.set(element.scrollWidth, element.scrollHeight)
      },
    }),
  )
