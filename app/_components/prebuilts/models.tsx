"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Box, CircuitBoard, Code, Bot, Zap } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import ModelCard from "./modelCard"
import { circuitModels, codeModels, newCadModels } from "./newdata"

const containerVariants  = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };



export default function Models () {
    return (
        <Tabs defaultValue="cad" className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-gray-100 mb-6 sm:mb-8 p-1">
            <TabsTrigger 
              value="cad" 
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-xs sm:text-sm"
            >
              <Box className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              CAD Models
            </TabsTrigger>
            <TabsTrigger 
              value="circuits"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-xs sm:text-sm"
            >
              <CircuitBoard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Circuit Models
            </TabsTrigger>
            <TabsTrigger 
              value="codes"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-xs sm:text-sm"
            >
              <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Prebuilt Codes
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <TabsContent value="cad" key="cad">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {newCadModels.map((model) => (
                <ModelCard key={model.id} model={model} icon={Bot} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="circuits" key="circuits">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {circuitModels.map((circuit) => (
                <ModelCard key={circuit.id} model={circuit} icon={Zap} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="codes" key="codes">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {codeModels.map((code) => (
                <ModelCard key={code.id} model={code} icon={Code} />
              ))}
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    )
}