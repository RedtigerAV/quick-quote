// Warning! This file is only used for mock-server.
// After integrating with real API, delete this file

const fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, 'db.json');

const NO_ENTITY = 'NO_ENTITY';
const DATA = JSON.parse(fs.readFileSync(dbFile));

const noEntityError = () => {
  const err = new Error('Entity does not exist');

  err.code = NO_ENTITY;

  return err;
};

const checkEntity = entity => {
  if (!entity) {
    throw noEntityError();
  }
};

module.exports = {
  get: async (collection, id) => {
    const data = DATA[collection];

    if (!id) {
      return data.at(Math.floor(Math.random() * data.length));
    }

    const entity = data?.find(obj => obj.id === id);

    checkEntity(entity);

    return entity;
  },
  NO_ENTITY
};
