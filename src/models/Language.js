const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Language extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
          //  Language.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Language.init(
        {
            uuid: DataTypes.UUID,
            society_id: DataTypes.STRING,
            language_code: DataTypes.STRING,
            url: DataTypes.STRING,
            description: DataTypes.STRING,
            message: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'language',
            underscored: true,
        },
    );
    return Language;
};
