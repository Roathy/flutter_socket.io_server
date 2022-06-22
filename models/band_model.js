const { v4: uuidV4 } = require('uuid');

class Band {
  constructor(name) {
    this.name = name;
    this.id = uuidV4();
    this.votes = 0;
  }
}

module.exports = Band;