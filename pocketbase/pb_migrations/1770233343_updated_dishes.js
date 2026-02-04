/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1510497571")

  // update collection data
  unmarshal({
    "name": "menu"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1510497571")

  // update collection data
  unmarshal({
    "name": "dishes"
  }, collection)

  return app.save(collection)
})
