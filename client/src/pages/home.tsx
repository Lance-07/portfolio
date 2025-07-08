import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  TrendingDown
} from 'lucide-react';
import { SiJavascript, SiPython, SiReact, SiFlask, SiNodedotjs, SiMongodb, SiPandas } from 'react-icons/si';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Smooth scrolling and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in');
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
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <button
      onClick={() => scrollToSection(href)}
      className={`transition-colors duration-200 ${
        activeSection === href ? 'text-custom-blue-600' : 'text-slate-600 hover:text-custom-blue-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-800">Your Name</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavLink href="home">Home</NavLink>
              <NavLink href="skills">Skills</NavLink>
              <NavLink href="projects">Projects</NavLink>
              <NavLink href="contact">Contact</NavLink>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <NavLink href="home">Home</NavLink>
              <NavLink href="skills">Skills</NavLink>
              <NavLink href="projects">Projects</NavLink>
              <NavLink href="contact">Contact</NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-custom-blue-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Your Name
            </h1>
            <div className="text-xl md:text-2xl text-custom-blue-600 font-semibold mb-8">
              Analytical Developer
            </div>
            <div className="max-w-4xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
              I'm an <strong>Analytical Developer</strong>—a professional adept at both{' '}
              <strong>software development</strong> and <strong>data analysis</strong>. My strength lies in
              crafting efficient code while simultaneously uncovering critical insights from complex data.
              I'm driven to create impactful, data-informed software, making me a valuable asset in any
              tech-driven environment.
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-custom-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-custom-blue-700 transition-colors duration-200 shadow-lg"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-2 border-custom-blue-600 text-custom-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-custom-blue-50 transition-colors duration-200"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Core Skills</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A comprehensive toolkit spanning software development and data analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in">
            {/* JavaScript */}
            <Card className="bg-slate-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200 border-none">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <SiJavascript className="text-3xl text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">JavaScript</h3>
                <p className="text-slate-600">Web development and interactive applications</p>
              </CardContent>
            </Card>
            
            {/* Python */}
            <Card className="bg-slate-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200 border-none">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <SiPython className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Python</h3>
                <p className="text-slate-600">Data analysis and automation scripts</p>
              </CardContent>
            </Card>
            
            {/* Shell Scripting */}
            <Card className="bg-slate-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200 border-none">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Terminal className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Shell Scripting</h3>
                <p className="text-slate-600">System automation and task optimization</p>
              </CardContent>
            </Card>
            
            {/* Excel */}
            <Card className="bg-slate-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200 border-none">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FileSpreadsheet className="text-3xl text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Excel</h3>
                <p className="text-slate-600">Advanced data manipulation and analysis</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Currently Learning Section */}
          <div className="mt-16 text-center fade-in">
            <h3 className="text-2xl font-semibold text-slate-800 mb-8">Currently Upskilling</h3>
            <Card className="bg-gradient-to-r from-custom-blue-50 to-blue-50 p-8 rounded-xl max-w-2xl mx-auto border-none">
              <CardContent className="text-center p-0">
                <div className="w-20 h-20 bg-custom-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="text-4xl text-custom-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-slate-800 mb-2">Power Tools</h4>
                <p className="text-slate-600">
                  Actively learning Power BI, Power Query, and other Microsoft Power Platform tools to enhance 
                  data visualization and business intelligence capabilities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A showcase of my work in software development and data analysis
            </p>
          </div>
          
          {/* Software Development Projects */}
          <div className="mb-16 fade-in">
            <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center">Software Development Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-custom-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                    <Code2 className="text-4xl text-custom-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Project Title 1</h4>
                  <p className="text-slate-600 mb-4">
                    Brief description of your software development project. Include key technologies used and main features implemented.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-custom-blue-100 text-custom-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiJavascript className="text-xs" />
                      JavaScript
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiReact className="text-xs" />
                      React
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-custom-blue-600 hover:text-custom-blue-700 p-0">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-700 p-0">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Project 2 */}
              <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                    <Smartphone className="text-4xl text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Project Title 2</h4>
                  <p className="text-slate-600 mb-4">
                    Brief description of your software development project. Include key technologies used and main features implemented.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiPython className="text-xs" />
                      Python
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiFlask className="text-xs" />
                      Flask
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-custom-blue-600 hover:text-custom-blue-700 p-0">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-700 p-0">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Project 3 */}
              <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-lg mb-4 flex items-center justify-center">
                    <Database className="text-4xl text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Project Title 3</h4>
                  <p className="text-slate-600 mb-4">
                    Brief description of your software development project. Include key technologies used and main features implemented.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiNodedotjs className="text-xs" />
                      Node.js
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiMongodb className="text-xs" />
                      MongoDB
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-custom-blue-600 hover:text-custom-blue-700 p-0">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-700 p-0">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Data Analysis Projects */}
          <div className="fade-in">
            <h3 className="text-2xl font-semibold text-slate-800 mb-8 text-center">Data Analysis Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Data Project 1 */}
              <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-200 rounded-lg mb-4 flex items-center justify-center">
                    <BarChart3 className="text-4xl text-orange-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Data Analysis Project 1</h4>
                  <p className="text-slate-600 mb-4">
                    Brief description of your data analysis project. Include dataset details, analysis methods, and key insights discovered.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiPython className="text-xs" />
                      Python
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <SiPandas className="text-xs" />
                      Pandas
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-custom-blue-600 hover:text-custom-blue-700 p-0">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      View Analysis
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-700 p-0">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Data Project 2 */}
              <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-lg mb-4 flex items-center justify-center">
                    <PieChart className="text-4xl text-teal-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Data Analysis Project 2</h4>
                  <p className="text-slate-600 mb-4">
                    Brief description of your data analysis project. Include dataset details, analysis methods, and key insights discovered.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FileSpreadsheet className="text-xs" />
                      Excel
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <BarChart3 className="text-xs" />
                      Power BI
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-custom-blue-600 hover:text-custom-blue-700 p-0">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      View Analysis
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-700 p-0">
                      <FileSpreadsheet className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Data Project 3 */}
              <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-rose-200 rounded-lg mb-4 flex items-center justify-center">
                    <TrendingDown className="text-4xl text-pink-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Data Analysis Project 3</h4>
                  <p className="text-slate-600 mb-4">
                    Brief description of your data analysis project. Include dataset details, analysis methods, and key insights discovered.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <BarChart3 className="text-xs" />
                      R
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <PieChart className="text-xs" />
                      Tableau
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-custom-blue-600 hover:text-custom-blue-700 p-0">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      View Analysis
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-700 p-0">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's connect and discuss how I can help bring your ideas to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="flex items-center p-6 bg-slate-50 rounded-xl border-none">
                <div className="w-12 h-12 bg-custom-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="text-custom-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Email</h3>
                  <p className="text-slate-600">your.email@example.com</p>
                </div>
              </Card>
              
              <Card className="flex items-center p-6 bg-slate-50 rounded-xl border-none">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Linkedin className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">LinkedIn</h3>
                  <p className="text-slate-600">linkedin.com/in/yourprofile</p>
                </div>
              </Card>
              
              <Card className="flex items-center p-6 bg-slate-50 rounded-xl border-none">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                  <Github className="text-gray-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">GitHub</h3>
                  <p className="text-slate-600">github.com/yourusername</p>
                </div>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card className="bg-slate-50 p-8 rounded-xl border-none">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Send a Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-custom-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-custom-blue-700 transition-colors duration-200"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Your Name</h3>
            <p className="text-slate-400 mb-6">Analytical Developer</p>
            <div className="flex justify-center space-x-6 mb-8">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white transition-colors duration-200 p-2">
                <Linkedin className="text-2xl" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white transition-colors duration-200 p-2">
                <Github className="text-2xl" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white transition-colors duration-200 p-2">
                <Mail className="text-2xl" />
              </Button>
            </div>
            <p className="text-slate-400">© 2024 Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
