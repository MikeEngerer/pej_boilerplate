
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Posts', table => {
    table.increments();
    table.integer('user_id').references('id').inTable('Users').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Posts');
};
