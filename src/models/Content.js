const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Content extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
          //  Content.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Content.init(
        {
            uuid: DataTypes.UUID,
            society_id: DataTypes.STRING,
            language_code: DataTypes.STRING,
            region_id: DataTypes.STRING,

            content_type: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            url: DataTypes.STRING,
            is_published: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'content',
            underscored: true,
        },
    );
    return Content;
};
