'use client'

import { prebuiltOrders } from "@/app/lib/server-actions/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Icon, Star, Download, Eye, LucideIcon, ShoppingBagIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

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

export default function ModelCard({ model, icon: Icon } : ModelCardProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);


    const handleClick = async (serviceName : string) => {

      const loading = toast.loading("loading ...")
      const response = await prebuiltOrders(serviceName)


      if (response.status > 400) {
        toast.error(response.message)
        toast.dismiss(loading)
        return
      }
      toast.success("order placed successfully our expert team will reach out you")
      toast.dismiss(loading)
    }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full flex flex-col justify-between   bg-gray-50 border-gray-200 hover:border-violet-300  hover:shadow-lg">
        <div className=" flex flex-col justify-between gap-4">
        <CardHeader className="pb-2 pt-2 sm:pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-violet-600" />
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                {model.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">{model.rating}</span>
            </div>
          </div>
          <CardTitle className="text-gray-900 text-base sm:text-lg">{model.title}</CardTitle>
          <CardDescription className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            {model.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2 gap-4 sm:pb-3">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              <Icon className="h-8 w-8 sm:h-12 sm:w-12" />
            </motion.div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {model.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-[10px] sm:text-xs border-gray-200 text-gray-600">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              {model.downloads.toLocaleString()} downloads
            </span>
            <span className="font-semibold text-violet-600 text-sm sm:text-base">{model.price}</span>
          </div>
        </CardContent>
        
        </div>
        <CardFooter className="pt-2  gap-1 sm:gap-2 flex items-center">
          <Button onClick={() => handleClick(model.title)} size="sm" className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm h-8 sm:h-9 flex items-center justify-center">
            <ShoppingBagIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}