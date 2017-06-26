//user model created using sequelize
//talks to the table user
//creating an Object factory for DB table
module.exports = function(sequelize, DataTypes){
	return sequelize.define('user', {
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING
	});
};