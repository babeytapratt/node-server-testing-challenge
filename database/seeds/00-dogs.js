
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dogs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('dogs').insert([
        {name: 'Penny'},
        {name: 'Cujo'},
        {name: 'Tiny Puppy'}
      ]);
    });
};
