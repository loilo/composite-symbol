function createMapContainer () {
  return {
    primitive: new Map(),
    object: new WeakMap()
  }
}

function getCompositeSymbolRecursive (keys, mapContainer) {
  if (!keys.length) throw new Error('No keys were provided')

  const key = keys[0]

  let map
  if (typeof key === 'object' && key !== null) {
    map = mapContainer.object
  } else {
    map = mapContainer.primitive
  }

  let subMapContainer
  if (map.has(key)) {
    subMapContainer = map.get(key)
  } else {
    subMapContainer = createMapContainer()
    map.set(key, subMapContainer)
  }

  if (keys.length === 1) {
    if (!('index' in subMapContainer)) {
      subMapContainer.index = Symbol('Composite Key')
    }

    return subMapContainer.index
  } else {
    return getCompositeSymbolRecursive(keys.slice(1), subMapContainer)
  }
}

const rootMapContainer = createMapContainer()

module.exports = function getCompositeSymbol (...keys) {
  return getCompositeSymbolRecursive(keys, rootMapContainer)
}
