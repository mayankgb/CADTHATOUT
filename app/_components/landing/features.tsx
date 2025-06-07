"use client"
import { Rocket, Code, Settings, Shield, Users, FileCode } from "lucide-react";
import { motion, Variants } from "motion/react";

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      ease: "easeInOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
    },
  },
};

const hoverVariants: Variants = {
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  index: number;
}

export function FeaturesCard() {
  const features = [
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Get your CAD models and designs delivered within 48 hours',
    },
    {
      icon: Code,
      title: 'Ready-to-Use Code',
      description: 'Pre-tested Arduino and embedded code for your projects',
    },
    {
      icon: Settings,
      title: 'Custom Solutions',
      description: 'Tailored CAD designs and solutions for your specific needs',
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every design undergoes rigorous testing and validation',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced CAD engineers and designers at your service',
    },
    {
      icon: FileCode,
      title: 'Documentation',
      description: 'Comprehensive documentation and support materials',
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl font-bold text-center mb-16 text-[#1f1926]"
        >
          Why Choose Us?
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl"
    >
      <div
        className={`${
          index === 0 ? "w-full justify-between" : "w-12 justify-center"
        } h-12 rounded-lg flex items-center mb-4`}
      >
        <motion.div
          className="h-12 w-12 flex items-center justify-center rounded-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: "#f3e8ff" }}
        >
          <Icon className="w-6 h-6" style={{ color: "#a855f7" }} />
        </motion.div>

        {index === 0 && (
          <div className="rounded-full text-sm font-semibold text-slate-400 p-1 px-3 w-fit bg-[#f3e8ff]">
            coming soon
          </div>
        )}
      </div>

      <motion.h3
        className="text-lg font-semibold mb-2 text-[#1f1926]"
        variants={hoverVariants}
      >
        {title}
      </motion.h3>

      <motion.p className="text-gray-600 text-sm" variants={hoverVariants}>
        {description}
      </motion.p>
    </motion.div>
  );
};
