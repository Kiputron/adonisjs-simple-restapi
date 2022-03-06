"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HotelSchema extends Schema {
  up() {
    this.create("hotels", (table) => {
      table.increments();
      table.string("name", 100).notNullable();
      table.string("address");
      table.timestamps();
    });
  }

  down() {
    this.drop("hotels");
  }
}

module.exports = HotelSchema;
