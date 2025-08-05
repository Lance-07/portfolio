import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Code2,
  Database,
  Terminal,
  FileSpreadsheet,
  TrendingUp,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  ChevronUp,
  Menu,
  X,
  Smartphone,
  BarChart3,
  PieChart,
  TrendingDown,
  Download,
} from "lucide-react";
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiFlask,
  SiNodedotjs,
  SiMongodb,
  SiPandas,
  SiNextdotjs,
  SiSupabase,
} from "react-icons/si";
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Smooth scrolling and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "contact"];
      const scrollY = window.pageYOffset;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop - 100;
          const height = element.offsetHeight;

          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const lastSent = localStorage.getItem("contact_last_sent");
    if (lastSent) {
      const diff = Date.now() - Number(lastSent);
      if (diff < 30000) setCooldown(30000 - diff);
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => (prev > 1000 ? prev - 1000 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cooldown check
    const lastSent = localStorage.getItem("contact_last_sent");
    if (lastSent && Date.now() - Number(lastSent) < 30000) {
      toast({ title: "Please wait before sending another message.", variant: "destructive" });
      return;
    }

    // Validation
    if (!formData.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    if (!validateEmail(formData.email)) {
      toast({ title: "Invalid email address", variant: "destructive" });
      return;
    }
    if (!formData.message.trim()) {
      toast({ title: "Message is required", variant: "destructive" });
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      localStorage.setItem("contact_last_sent", Date.now().toString());
      setCooldown(30000);
      toast({ title: "Message sent successfully!", variant: "default" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({ title: "Failed to send message. Try again later.", variant: "destructive" });
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => scrollToSection(href)}
      className={`transition-colors duration-200 ${
        activeSection === href
          ? "text-custom-blue-600 dark:text-blue-400"
          : "text-slate-600 dark:text-slate-300 hover:text-custom-blue-600 dark:hover:text-blue-400"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-800 dark:text-white">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink href="home">Home</NavLink>
              <NavLink href="skills">Skills</NavLink>
              <NavLink href="projects">Projects</NavLink>
              <NavLink href="contact">Contact</NavLink>
              <Button
                asChild
                size="sm"
                className="bg-custom-blue-600 hover:bg-custom-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-lg"
              >
                <a href="/files/resume.pdf" download>
                  <Download className="w-5 h-5 mr-2" />
                  CV
                </a>
              </Button>
              <ModeToggle />               
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <ModeToggle />
              <button
                className="p-2 text-slate-600 dark:text-slate-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex flex-col">
              <NavLink href="home">Home</NavLink>
              <NavLink href="skills">Skills</NavLink>
              <NavLink href="projects">Projects</NavLink>
              <NavLink href="contact">Contact</NavLink>
              <Button
                asChild
                size="sm"
                className="bg-custom-blue-600 hover:bg-custom-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-lg self-center w-10/12"
              >
                <a href="/files/resume.pdf" download>
                  <Download className="w-5 h-5 mr-2" />
                  CV
                </a>
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-custom-blue-50 dark:from-slate-800 dark:to-slate-900 pt-16 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6">
              Hi! I'm Lance
            </h1>
            <div className="text-xl md:text-2xl text-custom-blue-600 dark:text-blue-400 font-semibold mb-8">
              Analytical Developer
            </div>
            <div className="max-w-4xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm an{" "}
              <strong className="text-slate-800 dark:text-white">
                Analytical Developer
              </strong>
              —a professional adept at both{" "}
              <strong className="text-slate-800 dark:text-white">
                software development
              </strong>{" "}
              and{" "}
              <strong className="text-slate-800 dark:text-white">
                data analysis
              </strong>
              . My strength lies in crafting efficient code while simultaneously
              uncovering critical insights from complex data. I'm driven to
              create impactful, data-informed software, making me a valuable
              asset in any tech-driven environment.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-custom-blue-600 dark:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-custom-blue-700 dark:hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-2 border-custom-blue-600 dark:border-blue-400 text-custom-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-custom-blue-50 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Core Skills
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A comprehensive toolkit spanning software development and data
              analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in">
            {/* JavaScript */}
            <Card className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border-none">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <SiJavascript className="text-3xl text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  JavaScript
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Web development and interactive applications
                </p>
              </CardContent>
            </Card>

            {/* Python */}
            <Card className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border-none">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <SiPython className="text-3xl text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  Python
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Data analysis and automation scripts
                </p>
              </CardContent>
            </Card>

            {/* Shell Scripting */}
            <Card className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border-none">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Terminal className="text-3xl text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  Shell Scripting
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  System automation and task optimization
                </p>
              </CardContent>
            </Card>

            {/* Excel */}
            <Card className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border-none">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FileSpreadsheet className="text-3xl text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  Excel
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Advanced data manipulation and analysis
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Currently Learning Section */}
          <div className="mt-16 text-center fade-in">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8">
              Currently Upskilling
            </h3>
            <Card className="bg-gradient-to-r from-custom-blue-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-xl max-w-2xl mx-auto border-none">
              <CardContent className="text-center p-0">
                <div className="w-20 h-20 bg-custom-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="text-4xl text-custom-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  Power Tools
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Actively learning Power BI, Power Query, and other Microsoft
                  Power Platform tools to enhance data visualization and
                  business intelligence capabilities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 bg-slate-50 dark:bg-slate-800 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A showcase of my work in software development and data analysis
            </p>
          </div>

          {/* Software Development Projects */}
          <div className="mb-16 fade-in">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8 text-center">
              Software Development Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <Card className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-custom-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/projects/software-project-1.png"
                      alt="WEWO: Water Efficiency with Waste Optimization"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const nextElement = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = "flex";
                        }
                      }}
                    />
                    <Code2 className="text-4xl text-custom-blue-600 dark:text-blue-400 hidden" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    WEWO: Water Efficiency with Waste Optimization
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    IoT-powered rainwater purification system designed to tackle
                    water scarcity and plastic waste.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-custom-blue-100 dark:bg-blue-900/30 text-custom-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiJavascript className="text-xs" />
                      JavaScript
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiNextdotjs className="text-xs" />
                      Next.js
                    </span>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiSupabase className="text-xs" />
                      Supabase
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-custom-blue-600 dark:text-blue-400 hover:text-custom-blue-700 dark:hover:text-blue-300 p-2"
                    >
                      <a
                        href="https://wewo-website.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 p-2"
                    >
                      <a
                        href="https://github.com/Lance-07/wewo-website"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project 2 */}
              <Card className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/30 dark:to-green-800/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/projects/software-project-2.png"
                      alt="SaveAStray"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const nextElement = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = "flex";
                        }
                      }}
                    />
                    <Smartphone className="text-4xl text-emerald-600 dark:text-emerald-400 hidden" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    SaveAStray
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Accessible platform for Shelters and Adoptors to find and
                    connect with stray animals.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiJavascript className="text-xs" />
                      JavaScript
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiReact className="text-xs" />
                      React
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiNodedotjs className="text-xs" />
                      Node.js
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiMongodb className="text-xs" />
                      MongoDB
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-custom-blue-600 dark:text-blue-400 hover:text-custom-blue-700 dark:hover:text-blue-300 p-2"
                    >
                      <a
                        href="https://save-a-stray.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 p-2"
                    >
                      <a
                        href="https://github.com/RockyBalbonys/SaveAStray"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project 3 */}
              <Card className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-900/30 dark:to-indigo-800/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/projects/software-project-3.jpg"
                      alt="Project Title 3"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const nextElement = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = "flex";
                        }
                      }}
                    />
                    <Database className="text-4xl text-purple-600 dark:text-purple-400 hidden" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    BIMS: Business Information Management System
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    A tailored business information management system designed
                    to streamline business operations and enhance data
                    accessibility.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiMongodb className="text-xs" />
                      MongoDB
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiNextdotjs className="text-xs" />
                      Next.js
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Work in Progress Project */}
              <Card className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700 relative">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                    {/* Blurred background with pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-custom-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
                    <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-100/5 backdrop-blur-md"></div>

                    {/* Work in Progress overlay */}
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-custom-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 mx-auto">
                        <Code2 className="text-2xl text-custom-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Work in Progress
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          In Development
                        </p>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    Upcoming Project
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Exciting new project currently in development. Stay tuned
                    for updates on this innovative solution.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-sm opacity-70">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 dark:text-slate-500 cursor-not-allowed p-0"
                      disabled
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Preview Soon
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 dark:text-slate-500 cursor-not-allowed p-0"
                      disabled
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Data Analysis Projects */}
          <div className="fade-in">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8 text-center">
              Data Analysis Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Data Project 1 */}
              <Card className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-200 dark:from-orange-900/30 dark:to-red-800/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/projects/data-project-1.png"
                      alt="Netflix Case Study"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const nextElement = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = "flex";
                        }
                      }}
                    />
                    <BarChart3 className="text-4xl text-orange-600 dark:text-orange-400 hidden" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    Netflix Case Study
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Explore Netflix movie data and perform exploratory data
                    analysis for a production company to uncover insights about
                    movies from a particular decade.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiPython className="text-xs" />
                      Python
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiPandas className="text-xs" />
                      Pandas
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-custom-blue-600 dark:text-blue-400 hover:text-custom-blue-700 dark:hover:text-blue-300 p-2"
                    >
                      <a
                        href="https://www.datacamp.com/datalab/w/b8d2fb4f-0fb3-4050-8bdc-9160fb78e6c9/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        View Analysis
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 p-2"
                    >
                      <a
                        href="https://www.datacamp.com/datalab/w/b8d2fb4f-0fb3-4050-8bdc-9160fb78e6c9/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Data Project 2 */}
              <Card className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-cyan-200 dark:from-teal-900/30 dark:to-cyan-800/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/projects/data-project-2.png"
                      alt="Data Analysis Project 2"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const nextElement = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = "flex";
                        }
                      }}
                    />
                    <PieChart className="text-4xl text-teal-600 dark:text-teal-400 hidden" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    Banana Sales Case Study
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Examines banana sales to identify trends, forecast future
                    sales, and model the impact of upsell strategies, pricing
                    changes, and market scenarios using key metrics like growth
                    rate and elasticity of demand.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FileSpreadsheet className="text-xs" />
                      Excel
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <BarChart3 className="text-xs" />
                      Pivot Tables
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-custom-blue-600 dark:text-blue-400 hover:text-custom-blue-700 dark:hover:text-blue-300 p-2"
                    >
                      <a
                        href="https://docs.google.com/spreadsheets/d/1M5v0MeiwlEVH2HYKd7bO0MAOl_Pt5cJY/edit?usp=sharing&ouid=106522059067910992548&rtpof=true&sd=true"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        View Analysis
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 p-2"
                    >
                      <a href="/files/banana-sales.xlsx" download>
                        <FileSpreadsheet className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Data Project 3 */}
              <Card className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-900/30 dark:to-rose-800/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/projects/data-project-3.png"
                      alt="Data Analysis Project 3"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const nextElement = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = "flex";
                        }
                      }}
                    />
                    <TrendingDown className="text-4xl text-pink-600 dark:text-pink-400 hidden" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    Esports Analysis
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    An analysis of esports tournament data reveals the highest and lowest earning trends across various content types, countries, teams, players, and game genres.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FileSpreadsheet className="text-xs" />
                      Excel
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <BarChart3 className="text-xs" />
                      Pivot Tables
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-custom-blue-600 dark:text-blue-400 hover:text-custom-blue-700 dark:hover:text-blue-300 p-2"
                    >
                      <a
                        href="https://docs.google.com/spreadsheets/d/1vmtAFfMGcx6oD6ZZD-QS73-JJL4qpakH/edit?usp=sharing&ouid=106522059067910992548&rtpof=true&sd=true"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        View Analysis
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 p-2"
                    >
                      <a href="/files/esports.xlsx" download>
                        <FileSpreadsheet className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Work in Progress Data Analysis Project */}
              <Card className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700 relative">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                    {/* Blurred background with pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-pink-100/50 dark:from-orange-900/20 dark:to-pink-900/20"></div>
                    <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-100/5 backdrop-blur-md"></div>

                    {/* Work in Progress overlay */}
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-3 mx-auto">
                        <BarChart3 className="text-2xl text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Work in Progress
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Analysis in Development
                        </p>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    Upcoming Analysis
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    New data analysis project currently being developed.
                    Advanced analytics and insights coming soon.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-sm opacity-70">
                      Research Phase
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 dark:text-slate-500 cursor-not-allowed p-0"
                      disabled
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Analysis Soon
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 dark:text-slate-500 cursor-not-allowed p-0"
                      disabled
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's connect and
              discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="flex items-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-none transition-colors duration-300">
                <div className="w-12 h-12 bg-custom-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="text-custom-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Email
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    lanceballesteros.dev@gmail.com
                  </p>
                </div>
              </Card>

              <Card className="flex items-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-none transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  <Linkedin className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    LinkedIn
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    linkedin.com/in/lance-samuel-ballesteros-942659343/
                  </p>
                </div>
              </Card>

              <Card className="flex items-center p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-none transition-colors duration-300">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800/30 rounded-lg flex items-center justify-center mr-4">
                  <Github className="text-gray-600 dark:text-gray-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    GitHub
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    github.com/Lance-07
                  </p>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border-none transition-colors duration-300">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-custom-blue-600 dark:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-custom-blue-700 dark:hover:bg-blue-700 transition-colors duration-200"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 dark:bg-slate-950 text-white py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Lance Samuel Ballesteros
            </h3>
            <p className="text-slate-400 dark:text-slate-500 mb-6">
              Analytical Developer
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-200 transition-colors duration-200 p-2"
              >
                <a href="https://www.linkedin.com/in/lance-samuel-ballesteros-942659343/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="text-2xl" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-200 transition-colors duration-200 p-2"
              >
                <a href="https://github.com/Lance-07"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="text-2xl" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-200 transition-colors duration-200 p-2"
              >
                <a href="mailto: lanceballesteros.dev@gmail.com">
                  <Mail className="text-2xl" />
                </a>
              </Button>
            </div>
            <p className="text-slate-400 dark:text-slate-500">
              © 2025 Lance Samuel Ballesteros. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
