const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         group:
 *           type: string
 *         photo:
 *           type: string
 *         mark:
 *           type: number
 *         isDonePr:
 *           type: boolean
 */
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    group: {
      type: String,
    },
    photo: {
      type: String,
    },
    mark: {
      type: Number,
    },
    isDonePr: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Students', StudentSchema);
