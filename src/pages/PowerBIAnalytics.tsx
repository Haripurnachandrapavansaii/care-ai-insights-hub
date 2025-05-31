
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { BarChart3, RefreshCw, ExternalLink, Download } from "lucide-react";

const PowerBIAnalytics = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive hospital analytics powered by Power BI with real-time insights and interactive visualizations.
          </p>
        </div>

        <Tabs defaultValue="forecast" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
              <TabsTrigger value="forecast">Forecast Dashboard</TabsTrigger>
              <TabsTrigger value="powerbi">Power BI Report</TabsTrigger>
              <TabsTrigger value="summary">Download Summary</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Power BI
              </Button>
            </div>
          </div>

          <TabsContent value="forecast" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Today's Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Occupancy</span>
                    <span className="font-semibold text-blue-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Admissions</span>
                    <span className="font-semibold text-green-600">134</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Peak Hour</span>
                    <span className="font-semibold text-orange-600">2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Beds</span>
                    <span className="font-semibold text-purple-600">23</span>
                  </div>
                </CardContent>
              </Card>

              {/* Department Breakdown */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Department Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Emergency', 'Cardiology', 'Pediatrics', 'Surgery'].map((dept, index) => {
                      const values = [45, 28, 19, 32];
                      const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];
                      return (
                        <div key={dept} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                            <span className="text-sm text-gray-700">{dept}</span>
                          </div>
                          <span className="text-sm font-medium">{values[index]}%</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Gender Distribution */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Patient Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Male</span>
                        <span className="text-sm font-medium">52%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Female</span>
                        <span className="text-sm font-medium">48%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                      </div>
                    </div>
                    <div className="pt-2 text-xs text-gray-500">
                      Age distribution: 25% (0-18), 45% (19-65), 30% (65+)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Forecast vs Actual Chart */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Forecast vs Actual Admissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Power BI chart would be embedded here</p>
                    <p className="text-sm">Showing real-time comparison of predicted vs actual admissions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="powerbi" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Power BI Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <iframe
                      title="Power BI Dashboard"
                      className="w-full h-full rounded-lg"
                      style={{ minHeight: '400px' }}
                      src="about:blank"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          Power BI Dashboard
                        </h3>
                        <p className="text-gray-500 mb-4 max-w-md">
                          Interactive Power BI report would be embedded here showing detailed hospital analytics, 
                          patient flow patterns, and departmental insights.
                        </p>
                        <Button className="cognizant-gradient">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open in Power BI
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Available Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Weekly Forecast Summary</p>
                      <p className="text-sm text-gray-600">PDF • 2.4 MB</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Department Analytics</p>
                      <p className="text-sm text-gray-600">Excel • 1.8 MB</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Patient Flow Report</p>
                      <p className="text-sm text-gray-600">PDF • 3.1 MB</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full cognizant-gradient">
                    <Download className="w-4 h-4 mr-2" />
                    Download Complete Analytics Package
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Schedule Automated Reports
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Share Dashboard Link
                  </Button>
                  
                  <div className="text-sm text-gray-500 mt-4 p-3 bg-blue-50 rounded-lg">
                    <strong>Note:</strong> All reports include anonymized data and comply 
                    with HIPAA regulations. Custom report formats available upon request.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PowerBIAnalytics;
