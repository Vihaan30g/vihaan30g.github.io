// ACHIEVEMENTS: "photos" are file names inside images/achievements/ (exact spelling, case-sensitive).
const ACHIEVEMENTS = [
  { order: 1, title: "International Rover Challenge and International Space Drone Challenge",
    badge: "IRC Rank 10, ISDC Rank 9",
    photos: ["irc1.jpeg", "irc2.jpg", "irc3.jpg", "irc4.jpg"],
    summary: "Competed with the MaRS Club team in IRC and ISDC, held as part of the same competition. We secured 10th place in the International Rover Challenge (IRC) and 9th place in the International Space Drone Challenge (ISDC).",
    pointsTitle: "My work on the rover",
    points: ["Built the Cartesian control pipeline for a 5-DOF manipulator", "Implemented YOLO-based object detection for task execution", "Worked with RealSense cameras, IMUs, encoders and Jetson AGX Orin", "Contributed to perception, navigation and system integration"],
    note: "Real-world robotics demands tight coupling of perception, planning and control under strict constraints." },
  { order: 2, title: "Caterpillar Autonomy Challenge, IIT Madras", badge: "Best Innovation Award",
    photos: ["cat1.jpg", "cat2.jpg"],
    summary: "Won the Best Innovation Award for an autonomous excavation system built with the MaRS Club.",
    pointsTitle: "What I worked on",
    points: ["Designed control strategies for a 5-DOF manipulator", "Implemented trajectory planning for excavation and berm construction", "Integrated SLAM and navigation pipelines", "Interfaced a RealSense camera for real-time perception"],
    note: "System-level thinking and robustness are non-negotiable in autonomous field robotics." }
];
