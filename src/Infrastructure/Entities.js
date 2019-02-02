/**
 * Класс является хранителем всех подгруженных сущностей
 */
export default class Entities extends Array {
  findEntity (Model, identifier, entityId) {
    return this.find(
      (e) => e instanceof Model && e[identifier] === entityId,
    )
  }

  remove (...entities) {
    this.entities = this.entities.filter(
      entity => entities.indexOf(entity) === -1,
    )
  }
}
