
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Brain, Shield, ActivitySquare } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/symptoms");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Features */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-medical-50 to-medical-100 p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            alt="Medical Technology"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="max-w-xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold text-medical-700 mb-4">HealthcareHub</h1>
          <p className="text-medical-600 mb-12">
          Advanced predictive and preventative disease analysis with tailored treatment recommendations by Ayokanmi Adejola...
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4 bg-white/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="p-2 bg-medical-100 rounded-lg">
                <Brain className="h-6 w-6 text-medical-500" />
              </div>
              <div>
                <h3 className="font-semibold text-medical-700 mb-1">Digital Diagnosis</h3>
                <p className="text-medical-600">Advanced symptom analysis and disease prediction</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="p-2 bg-medical-100 rounded-lg">
                <Shield className="h-6 w-6 text-medical-500" />
              </div>
              <div>
                <h3 className="font-semibold text-medical-700 mb-1">Secure Blockchain</h3>
                <p className="text-medical-600">Your medical data is encrypted and secure</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="p-2 bg-medical-100 rounded-lg">
                <ActivitySquare className="h-6 w-6 text-medical-500" />
              </div>
              <div>
                <h3 className="font-semibold text-medical-700 mb-1">Treatment Tracking</h3>
                <p className="text-medical-600">Monitor your progress and medical history</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex items-center justify-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
            alt="Technology Background"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <Card className="w-full max-w-md p-8 space-y-6 relative z-10 bg-white/90 backdrop-blur-sm">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-medical-500 hover:bg-medical-600 text-white">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => navigate("/signup")}
              className="text-medical-600 hover:text-medical-700 text-sm transition-colors"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
