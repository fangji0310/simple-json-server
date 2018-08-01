import * as express from 'express'

class SimpleJsonServer {
  public express

  constructor() {
    this.express = express()
  }
}

export default new SimpleJsonServer().express
