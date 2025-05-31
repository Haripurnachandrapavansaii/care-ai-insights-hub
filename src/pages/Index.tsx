
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { 
  Upload, 
  BarChart3, 
  Brain, 
  Shield, 
  TrendingUp, 
  Users,
  Calendar,
  Activity
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms predict patient admission patterns with high accuracy.",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Monitor hospital capacity, track trends, and make data-driven decisions instantly.",
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data privacy and regulatory compliance.",
    },
    {
      icon: Users,
      title: "Department Insights",
      description: "Get detailed forecasts for different hospital departments and specialties.",
    },
  ];

  const stats = [
    { value: "95%", label: "Prediction Accuracy" },
    { value: "50+", label: "Hospitals Served" },
    { value: "2M+", label: "Predictions Made" },
    { value: "24/7", label: "System Uptime" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <Activity className="w-4 h-4 mr-2" />
              Powered by Advanced Machine Learning
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Predict.
              </span>{" "}
              <span className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                Prepare.
              </span>{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Perform.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform hospital operations with AI-driven patient admission forecasting. 
              CognizantCare AI helps healthcare providers optimize capacity planning, 
              reduce wait times, and improve patient outcomes through intelligent predictions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/upload">
                <Button 
                  size="lg" 
                  className="cognizant-gradient hover:scale-105 transition-all duration-300 shadow-lg text-lg px-8 py-6"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Patient Data
                </Button>
              </Link>
              
              <Link to="/predict">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-blue-200 hover:bg-blue-50 hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Predictions
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CognizantCare AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with healthcare expertise to deliver 
              unparalleled insights for hospital management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="medical-card hover:scale-105 transition-all duration-300 p-6"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 cognizant-gradient rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 cognizant-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hospital Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join leading healthcare providers who trust CognizantCare AI for 
            intelligent patient admission forecasting and capacity planning.
          </p>
          <Link to="/upload">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 cognizant-gradient rounded-lg flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">CognizantCare AI</span>
          </div>
          <p className="text-gray-400 mb-4">
            Intelligent Healthcare Analytics • Powered by Advanced Machine Learning
          </p>
          <p className="text-sm text-gray-500">
            © 2024 CognizantCare AI. All rights reserved. Built with care for healthcare providers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
