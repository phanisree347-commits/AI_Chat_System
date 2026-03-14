import User from "../models/Users.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email avatar joinedAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      joinedAt: user.joinedAt
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "totalMessages aiInteractions totalHoursLearned currentStreak overallProgress"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      totalMessages: user.totalMessages,
      aiInteractions: user.aiInteractions,
      totalHoursLearned: user.totalHoursLearned,
      currentStreak: user.currentStreak,
      overallProgress: user.overallProgress
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("subjectProgress");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      subjectProgress: user.subjectProgress || []
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "totalMessages aiInteractions currentStreak subjectProgress"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const achievements = [];

    if (user.totalMessages >= 100) achievements.push("100 Messages");
    if (user.aiInteractions >= 200) achievements.push("AI Master");
    if (user.currentStreak >= 7) achievements.push("7 Day Streak");
    if ((user.subjectProgress || []).some((s) => Number(s.progress) >= 100)) {
      achievements.push("Subject Completed");
    }

    return res.json({ achievements });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

