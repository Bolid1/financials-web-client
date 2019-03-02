import { types } from 'mobx-state-tree'

export default types.refinement(types.string, str => /\d{4}-\d{2}-\d{2}|/.test(str))
