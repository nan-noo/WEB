var members = ['kim', 'lee', 'park'];

var roles = {
    'programmer': 'kim',
    'designer': 'lee',
    'manager': 'park'
};

console.log(roles.designer); // lee
console.log(roles[designer]);

for(var role in roles){
    console.log(role, roles[role]);
}