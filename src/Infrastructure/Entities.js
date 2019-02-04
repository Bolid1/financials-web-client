/**
 * Класс является хранителем всех подгруженных сущностей
 */
export default class Entities extends Array {
  findEntity (Model, identifier, entityId) {
    return this.find(
      e => e instanceof Model && e[identifier] === entityId,
    )
  }

  findEntities (Model, criteria) {
    return this.filter(
      e => e instanceof Model &&
           Object.keys(criteria || {})
                 .reduce((prev, key) => {
                   const c = criteria[key]

                   if (Array.isArray(c) ? c.indexOf(e[key]) !== -1 : e[key] === c) {
                     prev.push(e[key])
                   }

                   return prev
                 }, []),
    )
  }

  remove (...entities) {
    this.entities = this.entities.filter(
      entity => entities.indexOf(entity) === -1,
    )
  }
}
