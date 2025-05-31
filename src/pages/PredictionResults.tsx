
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { TrendingUp, Calendar, Users, Building } from "lucide-react";

const PredictionResults = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedAdmissionType, setSelectedAdmissionType] = useState("all");

  // Mock data - in real app this would come from the ML model
  const predictions = {
    peakDay: "Monday, Dec 18",
    avgDailyAdmissions: 127,
    mostImpactedDept: "Emergency",
    forecastAccuracy: "94.5%"
  };

  const departments = ["All Departments", "Emergency", "Cardiology", "Pediatrics", "Surgery", "ICU"];
  const admissionTypes = ["All Types", "Emergency", "Scheduled", "Transfer", "Outpatient"];

  // Mock chart data points for 7-day forecast
  const chartData = [
    { day: "Mon", admissions: 145 },
    { day: "Tue", admissions: 132 },
    { day: "Wed", admissions: 128 },
    { day: "Thu", admissions: 118 },
    { day: "Fri", admissions: 125 },
    { day: "Sat", admissions: 95 },
    { day: "Sun", admissions: 88 },
  ];

  const maxAdmissions = Math.max(...chartData.map(d => d.admissions));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            7-Day Patient Volume Forecast
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered predictions based on historical admission patterns and seasonal trends.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept.toLowerCase().replace(' ', '-')}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedAdmissionType} onValueChange={setSelectedAdmissionType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Admission Type" />
            </SelectTrigger>
            <SelectContent>
              {admissionTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Predicted Peak Day</p>
                  <p className="text-2xl font-bold text-blue-600">{predictions.peakDay}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Daily Admissions</p>
                  <p className="text-2xl font-bold text-green-600">{predictions.avgDailyAdmissions}</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Most Impacted Dept</p>
                  <p className="text-2xl font-bold text-orange-600">{predictions.mostImpactedDept}</p>
                </div>
                <Building className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                  <p className="text-2xl font-bold text-purple-600">{predictions.forecastAccuracy}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-xl">Weekly Admission Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Simple bar chart using CSS */}
              <div className="flex items-end justify-between h-64 bg-gray-50 rounded-lg p-4">
                {chartData.map((data, index) => {
                  const height = (data.admissions / maxAdmissions) * 200;
                  return (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className="text-sm font-medium text-gray-700">
                        {data.admissions}
                      </div>
                      <div
                        className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md w-12 transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                        style={{ height: `${height}px` }}
                      />
                      <div className="text-sm text-gray-600 font-medium">
                        {data.day}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Patient Admissions</span>
                <span>Days of the Week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Info */}
        <Card className="medical-card mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Powered by Random Forest Regression
              </h3>
              <p className="text-gray-600">
                This forecast is generated using advanced machine learning algorithms trained on 
                historical admission data, seasonal patterns, and departmental trends. Model last updated: Today
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionResults;
