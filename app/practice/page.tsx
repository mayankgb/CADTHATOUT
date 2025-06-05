"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence, Variant } from 'motion/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Eye, Star, Zap, Cpu, Bot, CircuitBoard, Box, Code, LucideIcon } from 'lucide-react';

// Type definitions
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

interface ModelCardProps {
  model: ModelItem;
  icon: LucideIcon;
}

interface ContainerVariants {
  hidden: {
    opacity: number;
  };
  visible: {
    opacity: number;
    transition: {
      staggerChildren: number;
    };
  };
}

interface CardVariants {
  hidden: {
    opacity: number;
    y: number;
    scale: number;
  };
  visible: {
    opacity: number;
    y: number;
    scale: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
}

// Dummy data for CAD models
const cadModels: ModelItem[] = [
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
const circuits: ModelItem[] = [
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
const prebuiltCodes: ModelItem[] = [
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

// Animation variants
const containerVariants  = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Model Card Component
const ModelCard: React.FC<ModelCardProps> = ({ model, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full bg-gray-50 border-gray-200 hover:border-violet-300 transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-violet-600" />
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                {model.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">{model.rating}</span>
            </div>
          </div>
          <CardTitle className="text-gray-900 text-lg">{model.title}</CardTitle>
          <CardDescription className="text-gray-600 text-sm leading-relaxed">
            {model.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-3">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              <Icon className="h-12 w-12" />
            </motion.div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {model.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs border-gray-200 text-gray-600">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              {model.downloads.toLocaleString()} downloads
            </span>
            <span className="font-semibold text-violet-600 text-base">{model.price}</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-gray-200 hover:border-violet-300">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button size="sm" className="flex-1 bg-violet-600 hover:bg-violet-700 text-white">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Main Component
const PrebuiltModelsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Prebuilt <span className="text-violet-600">Models & Resources</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready-to-use CAD models, circuit designs, and code libraries for your next project. 
            Professional quality, tested resources to accelerate your development.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto"
        >
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-violet-600">150+</div>
            <div className="text-sm text-gray-600">CAD Models</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">80+</div>
            <div className="text-sm text-gray-600">Circuit Models</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">120+</div>
            <div className="text-sm text-gray-600">Code Libraries</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">50K+</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="cad" className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-gray-100 mb-8">
              <TabsTrigger 
                value="cad" 
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
              >
                <Box className="h-4 w-4 mr-2" />
                CAD Models
              </TabsTrigger>
              <TabsTrigger 
                value="circuits"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
              >
                <CircuitBoard className="h-4 w-4 mr-2" />
                Circuit Models
              </TabsTrigger>
              <TabsTrigger 
                value="codes"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
              >
                <Code className="h-4 w-4 mr-2" />
                Prebuilt Codes
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <TabsContent value="cad" key="cad">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {cadModels.map((model: ModelItem) => (
                  <ModelCard key={model.id} model={model} icon={Bot} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="circuits" key="circuits">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {circuits.map((circuit: ModelItem) => (
                  <ModelCard key={circuit.id} model={circuit} icon={Zap} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="codes" key="codes">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {prebuiltCodes.map((code: ModelItem) => (
                  <ModelCard key={code.id} model={code} icon={Code} />
                ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Need Custom Development?</h2>
          <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our expert team can create custom CAD models, 
            circuit designs, and software solutions tailored to your specific requirements.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-violet-600 hover:bg-gray-100">
            <Cpu className="h-5 w-5 mr-2" />
            Request Custom Development
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PrebuiltModelsPage;