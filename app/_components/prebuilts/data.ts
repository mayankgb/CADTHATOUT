interface ModelItem {
    id: number;
    title: string;
    description: string;
    category: string;
    rating: number;
    downloads: number;
    price: string;
    image: string;
    tags: string[];
  }

export const cadModels: ModelItem[] = [
    {
      id: 1,
      title: "Quadcopter Frame V2",
      description: "Professional drone frame design with optimized weight distribution and mounting points.",
      category: "Drone",
      rating: 4.8,
      downloads: 1240,
      price: "Free",
      image: "/api/placeholder/300/200",
      tags: ["Drone", "Frame", "Lightweight"]
    },
    {
      id: 2,
      title: "Robotic Arm Assembly",
      description: "6-DOF robotic arm with precision joints and servo mounting brackets.",
      category: "Robotics",
      rating: 4.9,
      downloads: 856,
      price: "$29",
      image: "/api/placeholder/300/200",
      tags: ["Robotics", "Arm", "Servo"]
    },
    {
      id: 3,
      title: "Custom PCB Enclosure",
      description: "Modular enclosure system for various PCB sizes with ventilation design.",
      category: "Enclosure",
      rating: 4.7,
      downloads: 2103,
      price: "$15",
      image: "/api/placeholder/300/200",
      tags: ["Enclosure", "PCB", "Modular"]
    },
    {
      id: 4,
      title: "Sensor Mount Kit",
      description: "Universal mounting system for various sensors with adjustable angles.",
      category: "Accessories",
      rating: 4.6,
      downloads: 1567,
      price: "$12",
      image: "/api/placeholder/300/200",
      tags: ["Sensors", "Mount", "Universal"]
    }
  ];
  
  // Dummy data for circuits
  export const circuits: ModelItem[] = [
    {
      id: 1,
      title: "Drone Flight Controller",
      description: "Complete flight controller circuit with IMU, GPS, and telemetry modules.",
      category: "Flight Control",
      rating: 4.9,
      downloads: 2240,
      price: "$45",
      image: "/api/placeholder/300/200",
      tags: ["Flight Control", "IMU", "GPS"]
    },
    {
      id: 2,
      title: "Motor Driver Board",
      description: "High-current motor driver with thermal protection and PWM control.",
      category: "Power",
      rating: 4.8,
      downloads: 1856,
      price: "$35",
      image: "/api/placeholder/300/200",
      tags: ["Motor", "Driver", "PWM"]
    },
    {
      id: 3,
      title: "Sensor Array PCB",
      description: "Multi-sensor board with temperature, humidity, and pressure sensors.",
      category: "Sensing",
      rating: 4.7,
      downloads: 1432,
      price: "$25",
      image: "/api/placeholder/300/200",
      tags: ["Sensors", "Array", "Environmental"]
    },
    {
      id: 4,
      title: "Power Management Unit",
      description: "Efficient power distribution with battery monitoring and protection.",
      category: "Power",
      rating: 4.8,
      downloads: 1678,
      price: "$40",
      image: "/api/placeholder/300/200",
      tags: ["Power", "Battery", "Protection"]
    }
  ];
  
  // Dummy data for prebuilt codes
  export const prebuiltCodes: ModelItem[] = [
    {
      id: 1,
      title: "Drone Autopilot System",
      description: "Complete autonomous flight control code with waypoint navigation and obstacle avoidance.",
      category: "Flight Control",
      rating: 4.9,
      downloads: 3240,
      price: "$85",
      image: "/api/placeholder/300/200",
      tags: ["Autopilot", "Navigation", "C++"]
    },
    {
      id: 2,
      title: "Arduino Sensor Library",
      description: "Comprehensive sensor interface library supporting 50+ sensors with unified API.",
      category: "Libraries",
      rating: 4.8,
      downloads: 5856,
      price: "Free",
      image: "/api/placeholder/300/200",
      tags: ["Arduino", "Sensors", "Library"]
    },
    {
      id: 3,
      title: "Robot Arm Kinematics",
      description: "Forward and inverse kinematics solver for 6-DOF robotic arms with real-time control.",
      category: "Robotics",
      rating: 4.7,
      downloads: 1932,
      price: "$65",
      image: "/api/placeholder/300/200",
      tags: ["Kinematics", "Robot", "Python"]
    },
    {
      id: 4,
      title: "IoT Data Logger",
      description: "Complete IoT solution with cloud connectivity, data logging, and remote monitoring.",
      category: "IoT",
      rating: 4.8,
      downloads: 2178,
      price: "$45",
      image: "/api/placeholder/300/200",
      tags: ["IoT", "Logging", "Cloud"]
    },
    {
      id: 5,
      title: "Motor Control Suite",
      description: "Advanced motor control algorithms including PID, FOC, and speed regulation.",
      category: "Control",
      rating: 4.9,
      downloads: 1654,
      price: "$75",
      image: "/api/placeholder/300/200",
      tags: ["Motor", "PID", "Control"]
    },
    {
      id: 6,
      title: "Computer Vision Toolkit",
      description: "Object detection and tracking algorithms optimized for embedded systems.",
      category: "Vision",
      rating: 4.6,
      downloads: 1234,
      price: "$95",
      image: "/api/placeholder/300/200",
      tags: ["Vision", "Detection", "OpenCV"]
    }
  ];