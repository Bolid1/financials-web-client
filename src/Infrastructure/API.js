import bond from '../samples/bond'
import bonds from '../samples/bonds'
import currencies from '../samples/currencies'
import issuers from '../samples/issuers'

const entityMap = {
  bond,
  bonds,
  issuers,
  currencies,
}

export default class API {
  static find (entity, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (entityMap.hasOwnProperty(entity)) {
          return resolve(JSON.parse(entityMap[entity]))
        }

        return reject('Not found')
      }, 1000)
    })
  }

  static findBy (entity) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (entityMap.hasOwnProperty(entity)) {
          return resolve(JSON.parse(entityMap[entity]))
        }

        return reject('Not found')
      }, 1000)
    })
  }
}
