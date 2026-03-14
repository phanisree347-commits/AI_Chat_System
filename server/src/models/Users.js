import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user"
    },

    // Profile fields (used by the profile page)
    avatar: {
      type: String,
      default: function () {
        const first = String(this.name || "").trim().charAt(0);
        return first ? first.toUpperCase() : "U";
      }
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    totalMessages: {
      type: Number,
      default: 0
    },
    aiInteractions: {
      type: Number,
      default: 0
    },
    totalHoursLearned: {
      type: Number,
      default: 0
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    overallProgress: {
      type: Number,
      default: 0
    },
    subjectProgress: [
      {
        subject: { type: String, required: true },
        progress: { type: Number, default: 0 }
      }
    ],
    achievements: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
