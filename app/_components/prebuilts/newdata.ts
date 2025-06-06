import stageReduction from "@/public/cad/2 Stage Reduction Gearbox.png";
import gopromount from "@/public/cad/GoPro Mount.png";
import hexacopter from "@/public/cad/hexacopter.png";
import quadCopter from "@/public/cad/QuadCopter.png";
import raspberrypi from "@/public/cad/Raspberry Pie 5.png";
import rcPlane from "@/public/cad/RC Plane.png";
import { StaticImageData } from "next/image";

import roboticArm from "@/public/circuits/roboticarm.jpeg"
import digitaldocs from "@/public/circuits/digitaldocs.jpeg"
import wateringSystem from "@/public/circuits/wateringsystem.jpeg"
import thermometer from "@/public/circuits/thermometer.jpeg"
import evm from "@/public/circuits/evm.jpeg"
import trafficLight from "@/public/circuits/trafficlight.jpeg"


import roboticArmCode from "@/public/codes/roboticcode.jpeg"
import digitalDiceCode  from "@/public/codes/digitaldicecode.jpeg"
import evmCode from "@/public/codes/evmcode.jpeg"
import thermoCode from "@/public/codes/thermocode.jpeg"
import wateringSystemCode from "@/public/codes/wateringsystemcode.jpeg"
import trafficLightCode from "@/public/codes/trafficlightcode.jpeg"

interface ModelItem {
    id: number;
    title: string;
    description: string;
    category: string;
    rating: number;
    downloads: number;
    price: string;
    image: StaticImageData;
    tags: string[];
}


export const newCadModels: ModelItem[] = [
    {
        id: 1,
        title: "HexaCopter Body",
        description: "Central frame with six arms for motor and propeller placement.",
        category: "Drones",
        rating: 4.5,
        downloads: 120,
        price: "199 rs.",
        image: hexacopter,
        tags: ["drone", "hexcopter", "aerospace"]
    },
    {
        id: 2,
        title: "Quad-Copter Body",
        description: "Four-arm frame for motors and flight components.",
        category: "Drones",
        rating: 4.3,
        downloads: 95,
        price: "199 rs.",
        image: quadCopter,
        tags: ["drone", "quadcopter", "UAV"]
    },
    {
        id: 3,
        title: "RC Plane Body",
        description: "Streamlined fuselage with mounts for wings and electronics.",
        category: "Aeronautics",
        rating: 4.6,
        downloads: 80,
        price: "249 rs.",
        image: rcPlane,
        tags: ["aircraft", "rc plane", "model"]
    },
    {
        id: 4,
        title: "2-Stage Reduction Gearbox",
        description: "CAD model with two spur gear sets for speed reduction and torque increase.",
        category: "Automobile",
        rating: 4.2,
        downloads: 150,
        price: "99 rs.",
        image: stageReduction,
        tags: ["gearbox", "mechanical", "automobile"]
    },
    {
        id: 5,
        title: "Raspberry Pi 5 Model",
        description: "Single-board layout with ports, GPIO, and heat sink mounts.",
        category: "Electronics",
        rating: 4.7,
        downloads: 200,
        price: "69 rs.",
        image: raspberrypi,
        tags: ["raspberry pi", "electronics", "board"]
    },
    {
        id: 6,
        title: "GoPro Mount",
        description: "Compact mount designed to securely hold a GoPro camera.",
        category: "Accessories",
        rating: 4.1,
        downloads: 75,
        price: "29 rs.",
        image: gopromount,
        tags: ["gopro", "mount", "camera"]
    }
];

export const circuitModels: ModelItem[] = [
    {
      id: 1,
      title: "Robotic Arm",
      description: "Contains circuit design, diagrams and instructions.",
      category: "Robotics",
      rating: 4.5,
      downloads: 320,
      price: "149 rs.",
      image: roboticArm,
      tags: ["robotics", "arm", "circuit"]
    },
    {
      id: 2,
      title: "Digital Dice",
      description: "Contains circuit design, diagrams and instructions.",
      category: "Circuits",
      rating: 4.2,
      downloads: 280,
      price: "99 rs.",
      image: digitaldocs,
      tags: ["dice", "digital", "circuit"]
    },
    {
      id: 3,
      title: "Digital Thermometer",
      description: "Contains circuit design, diagrams and instructions.",
      category: "Appliance",
      rating: 4.3,
      downloads: 240,
      price: "99 rs.",
      image: thermometer,
      tags: ["temperature", "thermometer", "circuit"]
    },
    {
      id: 4,
      title: "Smart Watering System",
      description: "Contains circuit design, diagrams and instructions.",
      category: "Circuits",
      rating: 4.6,
      downloads: 400,
      price: "149 rs.",
      image: wateringSystem,
      tags: ["watering", "smart", "automation"]
    },
    {
        id: 5,
        title: "EVM Machine",
        description: "Contains circuit design, diagrams and instructions.",
        category: "Circuits",
        rating: 4.6,
        downloads: 400,
        price: "99 rs.",
        image: evm,
        tags: ["evm", "electronic"]
      },
      {
        id: 6,
        title: "Smart Traffic Light",
        description: "Contains circuit design, diagrams and instructions.",
        category: "Circuits",
        rating: 4.6,
        downloads: 400,
        price: "99 rs.",
        image: trafficLight,
        tags: ["evm", "electronic", "IOT"]
      },

  ];


  export const codeModels: ModelItem[] = [
    {
      id: 1,
      title: "Robotic Arm Code",
      description: "Contains codes and instructions.",
      category: "Robotics",
      rating: 4.5,
      downloads: 310,
      price: "49 rs.",
      image: roboticArmCode,
      tags: ["robotics", "arm", "code"]
    },
    {
      id: 2,
      title: "Digital Dice Code",
      description: "Contains codes and instructions.",
      category: "Circuits",
      rating: 4.3,
      downloads: 270,
      price: "49 rs.",
      image: digitalDiceCode,
      tags: ["dice", "digital", "code"]
    },
    {
      id: 3,
      title: "Digital Thermometer Code",
      description: "Contains codes and instructions.",
      category: "Appliance",
      rating: 4.4,
      downloads: 250,
      price: "49 rs.",
      image: thermoCode,
      tags: ["thermometer", "temperature", "code"]
    },
    {
      id: 4,
      title: "Smart Watering System Code",
      description: "Contains codes and instructions.",
      category: "Automation",
      rating: 4.6,
      downloads: 330,
      price: "69 rs.",
      image: wateringSystemCode,
      tags: ["watering", "smart", "irrigation"]
    },
    {
      id: 5,
      title: "EVM Machine Code",
      description: "Contains codes and instructions.",
      category: "Electronics",
      rating: 4.2,
      downloads: 290,
      price: "49 rs.",
      image: evmCode,
      tags: ["evm", "voting", "code"]
    },
    {
      id: 6,
      title: "Smart Traffic Light Code",
      description: "Contains codes and instructions.",
      category: "Automation",
      rating: 4.3,
      downloads: 310,
      price: "49 rs.",
      image: trafficLightCode,
      tags: ["traffic", "automation", "signal"]
    }
  ];