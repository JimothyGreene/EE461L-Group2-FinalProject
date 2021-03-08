const testUsers = [
    {
        'email': 'test@test.com',
        'password': 'test'
    },
    {
        'email': 'admin@utexas.edu',
        'password': 'adminPW'
    }
];

db.user.insertMany(testUsers);

