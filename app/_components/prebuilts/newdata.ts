import stageReduction from "@/public/cad/2 Stage Reduction Gearbox.png";
import gopromount from "@/public/cad/GoPro Mount.png";
import hexacopter from "@/public/cad/hexacopter.png";
import quadCopter from "@/public/cad/QuadCopter.png";
import raspberrypi from "@/public/cad/Raspberry Pie 5.png";
import rcPlane from "@/public/cad/RC Plane.png";
import { StaticImageData } from "next/image";

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
