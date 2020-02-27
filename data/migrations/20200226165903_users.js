
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl =>{
    tbl.increments();
    tbl.string('username', 128).notNullable().unique();
    tbl.string('department', 128).notNullable();
    tbl.string('password', 680).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
