const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
      comment: 'Razorpay order_id',
    },
    package_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Packages',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
      comment: 'Amount in smallest currency unit (paise for INR)',
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'INR',
      validate: {
        len: [3, 3],
      },
    },
    status: {
      type: DataTypes.ENUM('CREATED', 'PAID', 'FAILED', 'REFUNDED'),
      defaultValue: 'CREATED',
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Razorpay payment_id',
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Razorpay signature for verification',
    },
    receipt: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Custom receipt number',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'JSON string of additional notes',
      get() {
        const rawValue = this.getDataValue('notes');
        return rawValue ? JSON.parse(rawValue) : {};
      },
      set(value) {
        this.setDataValue('notes', value ? JSON.stringify(value) : null);
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "Orders",
  }
);

module.exports = Order;