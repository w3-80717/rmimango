const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [2, 100],
        msg: "Fullname should be between 2 to 100 characters."
      },
      is: {
        args: [/^[A-Za-z\s]+$/],
        msg: "Only alphabets and spaces are allowed in fullname."
      },
      notNull: {
        msg: "Fullname should not be empty."
      }
    }
  },
  email: {
    type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Invalid Email."
      },
      notNull: {
        msg: "Email should not be empty."
      }
    }
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      len: {
        args: [10, 10],
        msg: "Phone Number should be 10 digits."
      },
      isInt: {
        msg: "Only numbers are allowed in the phone number."
      },
      notNull: {
        msg: "Phone Number should not be empty."
      }
    }
  },
  city: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      len: {
        args: [2, 30],
        msg: "City length should be between 2 to 30 characters."
      },
      is: {
        args: [/^[A-Za-z\s]+$/],
        msg: "Only alphabets and spaces are allowed in City name."
      },
      notNull: {
        msg: "City should not be empty."
      }
    }
  },
  state: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      len: {
        args: [2, 20],
        msg: "State name should be between 2 to 20 characters."
      },
      is: {
        args: [/^[A-Za-z\s]+$/],
        msg: "Only alphabets and spaces are allowed in State name."
      },
      notNull: {
        msg: "State should not be empty."
      }
    }
  },
  pincode: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      len: {
        args: [6, 6],
        msg: "Pincode should be 6 digits."
      },
      isInt: {
        msg: "Only numbers are allowed in the pin code."
      },
      notNull: {
        msg: "Pincode should not be empty."
      }
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [20, 1000],
        msg: "Write something to us within 20 to 1000 characters."
      },
      notNull: {
        msg: "Message should not be empty."
      }
    }
  }
});

module.exports = Contact;