import { types } from 'mobx-state-tree'

export default types.enumeration('_entityState', ['new', 'saved', 'unsaved'])
