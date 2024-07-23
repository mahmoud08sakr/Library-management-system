import { DataTypes } from "sequelize";
import sequelize from "../connedtion.js";

const BorrowingModel = sequelize.define('Borrowing', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    borrowedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    returnedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

sequelize.sync({ alter: true })

export default BorrowingModel