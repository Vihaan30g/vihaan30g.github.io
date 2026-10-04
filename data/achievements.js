// ACHIEVEMENTS: photos -> images/achievements/<id>-1.jpg, <id>-2.jpg ... (set "photos" to how many)
const ACHIEVEMENTS = [
  { id: "irc-rank10", order: 1, photos: 4, title: "International Rover Challenge", badge: "IRC 2026, Rank 10",
    summary: "Competed with the MaRS Club team and placed 10th in the International Rover Challenge 2026.",
    points: ["Built the Cartesian control pipeline for a 5-DOF manipulator", "Implemented YOLO-based object detection for task execution", "Worked with RealSense cameras, IMUs, encoders and Jetson AGX Orin", "Contributed to perception, navigation and system integration"],
    note: "Real-world robotics demands tight coupling of perception, planning and control under strict constraints." },
  { id: "isdc-rank9", order: 2, photos: 2, title: "International Space Drone Challenge", badge: "ISDC, Rank 9",
    summary: "Placed 9th in the International Space Drone Challenge with the team's autonomous drone systems.",
    points: ["Contributed to the perception and control stack for the competition drone", "Worked on system integration and testing before the competition"],
    note: "Aerial autonomy tightens every constraint: weight, power and real-time margins." },
  { id: "caterpillar-best-innovation", order: 3, photos: 2, title: "Caterpillar Autonomy Challenge, IIT Madras", badge: "Best Innovation Award",
    summary: "Won the Best Innovation Award for an autonomous excavation system built with the MaRS Club.",
    points: ["Designed control strategies for a 5-DOF manipulator", "Implemented trajectory planning for excavation and berm construction", "Integrated SLAM and navigation pipelines", "Interfaced a RealSense camera for real-time perception"],
    note: "System-level thinking and robustness are non-negotiable in autonomous field robotics." }
];
