export default class RepositoryManager extends Array {
  byName (nameToFind) {
    return this.find(({name}) => name === nameToFind)?.repository
  }

  byEntityClass (classToFind) {
    return this.find(({entityClass}) => entityClass === classToFind)?.repository
  }
}
