import bonds from '../samples/bonds'
import currencies from '../samples/currencies'
import issuers from '../samples/issuers'

const entityMap = {
  bonds,
  issuers,
  currencies,
}

const singleToMultiple = {
  bond: 'bonds',
}

const identifiers = {
  bond: 'ISIN',
}

class API {
  find (entity, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const multiple = singleToMultiple[entity]
        const identifier = identifiers[entity]

        if (identifier && multiple && entityMap.hasOwnProperty(multiple)) {
          const data = JSON.parse(entityMap[multiple])
          const entities = data._embedded[multiple]
          delete data._embedded[multiple]
          const result = (entities || []).find(entity => entity[identifier] === id)

          if (result) {
            return resolve(Object.assign(result, data))
          }
        }

        return reject('Not found')
      }, 1000)
    })
  }

  findBy (entity) {
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

const api = new API()
export default api
