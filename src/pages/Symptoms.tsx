
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Stethoscope, ThermometerSun, PieChart as PieChartIcon, Activity } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Define common diseases and their mock analysis data
const diseases = {
  fever: {
    name: "Fever",
    symptoms: [
      { name: "High Temperature", value: 40, color: "#FF6B6B" },
      { name: "Body Aches", value: 30, color: "#4ECDC4" },
      { name: "Fatigue", value: 30, color: "#45B7D1" },
    ],
    treatments: [
      { name: "Rest", effectiveness: 90, color: "#FF6B6B" },
      { name: "Hydration", effectiveness: 85, color: "#4ECDC4" },
      { name: "Medication", effectiveness: 75, color: "#45B7D1" },
      { name: "Cold Compress", effectiveness: 65, color: "#96CEB4" },
    ],
    description: "An elevated body temperature often indicating infection or illness."
  },
  cold: {
    name: "Common Cold",
    symptoms: [
      { name: "Runny Nose", value: 35, color: "#9b87f5" },
      { name: "Sore", value: 35, color: "#7E69AB" },
      { name: "Cough", value: 30, color: "#D6BCFA" },
    ],
    treatments: [
      { name: "Rest", effectiveness: 85, color: "#9b87f5" },
      { name: "Hydration", effectiveness: 80, color: "#7E69AB" },
      { name: "Vitamin C", effectiveness: 70, color: "#D6BCFA" },
      { name: "Steam Inhalation", effectiveness: 60, color: "#8E9196" },
    ],
    description: "A viral infection affecting the upper respiratory tract."
  },
  headache: {
    name: "Migraine",
    symptoms: [
      { name: "Head Pain", value: 45, color: "#FF9F1C" },
      { name: "Sensitivity", value: 30, color: "#E71D36" },
      { name: "Nausea", value: 25, color: "#2EC4B6" },
    ],
    treatments: [
      { name: "Dark Room", effectiveness: 80, color: "#FF9F1C" },
      { name: "Pain Relief", effectiveness: 75, color: "#E71D36" },
      { name: "Hydration", effectiveness: 70, color: "#2EC4B6" },
      { name: "Rest", effectiveness: 65, color: "#011627" },
    ],
    description: "A severe throbbing pain, often accompanied by sensitivity to light and sound."
  }
};

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<{
    disease?: string;
    treatment?: string;
  } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Error",
        description: "Please enter your symptoms",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      // Simulate API response with mock data
      const symptomsLower = symptoms.toLowerCase();
      let detectedDisease = "cold"; // default

      if (symptomsLower.includes("fever") || symptomsLower.includes("temperature")) {
        detectedDisease = "fever";
      } else if (symptomsLower.includes("headache") || symptomsLower.includes("migraine")) {
        detectedDisease = "headache";
      }

      setSelectedDisease(detectedDisease);
      setPrediction({
        disease: diseases[detectedDisease].name,
        treatment: ` ${diseases[detectedDisease].treatments
          .map(t => t.name)
          .join(", ")}. ${diseases[detectedDisease].description}`,
      });

      toast({
        title: "Analysis Complete",
        description: "We've analyzed your symptoms and provided recommendations.",
      });
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      toast({
        title: "Error",
        description: "Unable to analyze symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-medical-50 to-medical-100">
      <div className="max-w-4xl mx-auto space-y-8 pt-8">
        <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Symptom Analysis</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Describe your symptoms</label>
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your symptoms in detail (e.g., fever, headache, cough)..."
                className="min-h-[200px] resize-none"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-medical-500 hover:bg-medical-600 text-white"
              disabled={loading}
            >
              <Stethoscope className="mr-2 h-5 w-5" />
              {loading ? "Analyzing..." : "Analyze Symptoms"}
            </Button>
          </form>
        </Card>

        {prediction && selectedDisease && (
          <>
            <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-6 w-6 text-medical-500" />
                <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Possible Condition</h3>
                  <p className="text-gray-600">{prediction.disease}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Recommended Treatment</h3>
                  <p className="text-gray-600">{prediction.treatment}</p>
                </div>
                
                <div className="mt-4 p-4 bg-medical-50 rounded-lg">
                  <p className="text-sm text-medical-600">
                    Disclaimer: This information is generated by Ayokanmi Adejola using algorithmic analysis. It is intended 
                    for educational purposes only and is not a replacement for professional medical advice. For proper diagnosis and treatment, please consult with a licensed healthcare professional.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <PieChartIcon className="h-6 w-6 text-medical-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Symptom Distribution</h2>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diseases[selectedDisease].symptoms}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {diseases[selectedDisease].symptoms.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <ThermometerSun className="h-6 w-6 text-medical-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Treatment Effectiveness</h2>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={diseases[selectedDisease].treatments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="effectiveness">
                        {diseases[selectedDisease].treatments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </>
        )}

        <Card className="p-8 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical History</h2>
          <p className="text-gray-500">No previous medical records found.</p>
        </Card>
      </div>
    </div>
  );
}
