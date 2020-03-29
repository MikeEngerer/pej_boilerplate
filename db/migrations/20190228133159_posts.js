
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
