// SITE CONTENT: edit text here. Nothing else needs to change.
const SITE = {
  name: "Vihaan Gupta",
  role: "Robotics Software Engineer",
  tagline: "Building AI and computer vision for robots that work in the physical world.",
  status: "B.Tech CSE, Year 3, IIITDM Kancheepuram",
  heroTags: ["ROS 2", "MoveIt2", "Manipulation", "Perception", "Jetson AGX Orin", "C++ / Python"],
  // Photo: save your picture as images/hero/me.jpg (square works best)
  email: "vihaan30g@gmail.com",
  phone: "+91 93999 29308",
  links: {
    github: "https://github.com/Vihaan30g",
    linkedin: "https://www.linkedin.com/in/vihaan-gupta-ab046836b/",
    youtube: "",                       // leave empty to hide
    resume: "https://vihaan30g.github.io/resume-website/index.html"
  },
  // Base address of your project pages. Each project page = base + repo name + "/"
  pagesBase: "https://vihaan30g.github.io/",
  githubBase: "https://github.com/Vihaan30g/",

  about: [
    "I'm a Robotics Software Engineer and a third-year B.Tech Computer Science and Engineering student at IIITDM Kancheepuram, India. My work centres on AI and computer vision methods for Physical AI robots, and on applying machine learning and deep learning to real robotic systems.",
    "I have worked with depth cameras, point clouds, robotic manipulators, SLAM, navigation and NVIDIA Jetson platforms, and I enjoy the hardware-software integration that ties them together. I also like studying the ideas underneath, and building models and algorithms with robotics in mind.",
    "I'm interested in robots that learn from sensory data, understand their environment and make decisions that let them operate well in the physical world."
  ],
  education: [
    { title: "B.Tech, Computer Science and Engineering", place: "IIITDM Kancheepuram, India", period: "2024 to present" },
    { title: "Class XII (PCM)", place: "St. Joseph's Co-ed School, Bhopal", period: "2024" }
  ],
  experience: [
    { title: "Member, The MaRS Club", place: "Robotics society of IIITDM Kancheepuram", period: "2024 to present" }
  ],
  languages: ["English", "Hindi"],

  skills: [
    "C", "C++", "Python", "NumPy", "Pandas", "PyTorch", "Matplotlib",
    "ROS 2", "MoveIt2", "Gazebo", "Isaac Sim", "OpenCV", "Open3D (Point Clouds)",
    "Computer Vision", "ML / DL Architectures", "SLAM (RTAB-Map)", "Nav2",
    "Manipulation Math (Kinematics, Jacobians, Twists)",
    "Linux", "Operating Systems", "Docker", "System Design (OOP, DSA)",
    "MySQL / DBMS", "HTML / CSS / JavaScript", "Basic 3D Printing"
  ],
  hardware: ["Jetson AGX Orin", "Jetson Orin Nano", "Arduino", "Raspberry Pi", "ZED 2i", "Intel RealSense", "IMU / Encoders", "GPU Workstations"],
  robots: [
    "5-DOF manipulator (custom built)", "Mars rover", "Differential-drive autonomous robot",
    "SO-101", "Line followers and RC robots"
  ],

  // "slug" (optional) links a card to the project with that id in data/projects.js
  currently: [
    { title: "Minibot: Autonomous Navigation", slug: "minibot", active: false,
      text: "Full autonomous navigation for Minibot, a differential-drive indoor robot, using Nav2 and RTAB-Map SLAM with a ZED 2i on a Jetson Orin Nano." },
    { title: "Pick & Place Pipeline: Isaac Sim", slug: "autonomous-manipulator", active: true,
      text: "A complete pick-and-place pipeline for a UR10e in Isaac Sim, bringing perception, planning and control together before moving to hardware." }
  ]
};
