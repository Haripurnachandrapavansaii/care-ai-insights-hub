
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { 
  Download, 
  Share2, 
  Users, 
  Clock, 
  Bed, 
  TrendingUp,
  Activity,
  Calendar,
  Building
} from "lucide-react";

const SummaryReport = () => {
  const kpiData = [
    {
      title: "Total Admissions",
      value: "2,847",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      description: "This month vs last month"
    },
    {
      title: "Average Length of Stay",
      value: "4.2 days",
      change: "-0.8%",
      trend: "down",
      icon: Clock,
      description: "Improved efficiency"
    },
    {
      title: "ICU Bed Utilization",
      value: "87.5%",
      change: "+3.2%",
      trend: "up",
      icon: Bed,
      description: "Current capacity usage"
    },
    {
      title: "Forecast Accuracy",
      value: "94.7%",
      change: "+1.4%",
      trend: "up",
      icon: TrendingUp,
      description: "Model performance"
    }
  ];

  const departmentData = [
    { name: "Emergency", admissions: 842, utilization: "92%" },
    { name: "Cardiology", admissions: 567, utilization: "78%" },
    { name: "Pediatrics", admissions: 389, utilization: "65%" },
    { name: "Surgery", admissions: 623, utilization: "85%" },
    { name: "ICU", admissions: 234, utilization: "87%" },
    { name: "Maternity", admissions: 192, utilization: "71%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Healthcare Summary Report
              </h1>
              <p className="text-xl text-gray-600">
                Comprehensive analytics and insights for hospital operations
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button className="cognizant-gradient">
                <Download className="w-4 h-4 mr-2" />
                Download PDF Report
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="medical-card hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <kpi.icon className="w-5 h-5 text-blue-600" />
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-gray-500">{kpi.description}</span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    kpi.trend === 'up' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Department Performance */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{dept.name}</span>
                          <span className="text-sm text-gray-600">{dept.utilization} utilization</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-blue-600">{dept.admissions}</span>
                          <span className="text-sm text-gray-500">admissions this month</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Report Period
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium">Nov 1, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">Nov 30, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Generated:</span>
                    <span className="font-medium">Dec 1, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Update:</span>
                    <span className="font-medium">Dec 7, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  PDF Report (2.4 MB)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Excel Data (1.8 MB)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Email Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Key Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Positive Trends</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>Forecast accuracy improved by 1.4% this month</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>Average length of stay decreased, indicating improved efficiency</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>Emergency department handling 12.3% more patients effectively</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Consider increasing ICU capacity during peak periods</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Optimize staff scheduling for cardiology department</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Review patient flow processes in pediatrics</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center py-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">CognizantCare AI</span>
          </div>
          <p className="text-gray-600">
            Powered by Advanced Machine Learning • Confidential Healthcare Analytics
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This report contains anonymized data and complies with HIPAA regulations
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;
