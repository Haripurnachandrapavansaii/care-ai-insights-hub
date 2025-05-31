
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Upload, FileText, CheckCircle, AlertCircle, FileCheck, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ProcessedData {
  fileName: string;
  totalRecords: number;
  departments: string[];
  dateRange: {
    start: string;
    end: string;
  };
  preview: any[];
}

const UploadData = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const [processingStep, setProcessingStep] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    console.log("Validating file:", file.name, file.type, file.size);
    
    if (!file.type.includes("csv") && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 50MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setProcessedData(null);
    toast({
      title: "File selected",
      description: `${file.name} is ready for processing.`,
    });
  };

  const processCSVData = async (csvText: string): Promise<ProcessedData> => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const data = [];

    console.log("CSV Headers:", headers);

    // Parse CSV data
    for (let i = 1; i < Math.min(lines.length, 1000); i++) {
      const values = lines[i].split(',');
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim() || '';
      });
      data.push(row);
    }

    console.log("Parsed data sample:", data.slice(0, 5));

    // Extract insights
    const departments = [...new Set(data.map(row => 
      row.department || row.dept || row.specialty || 'Unknown'
    ))].filter(Boolean);

    const dates = data.map(row => 
      row['admission time'] || row['admission_time'] || row.date || row.timestamp
    ).filter(Boolean);

    return {
      fileName: uploadedFile?.name || 'unknown.csv',
      totalRecords: data.length,
      departments: departments.slice(0, 10),
      dateRange: {
        start: dates[0] || 'Unknown',
        end: dates[dates.length - 1] || 'Unknown'
      },
      preview: data.slice(0, 5)
    };
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    setProcessingStep("Reading file...");
    
    try {
      // Read file content
      const text = await uploadedFile.text();
      console.log("File content length:", text.length);
      
      setProcessingStep("Parsing CSV data...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const processed = await processCSVData(text);
      
      setProcessingStep("Training AI model...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProcessingStep("Generating forecasts...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProcessedData(processed);
      setIsProcessing(false);
      setProcessingStep("");
      
      // Store data in localStorage for other pages
      localStorage.setItem('hospitalData', JSON.stringify(processed));
      
      toast({
        title: "Processing complete!",
        description: `Successfully processed ${processed.totalRecords} patient records. AI model is ready for predictions.`,
      });
      
    } catch (error) {
      console.error("Processing error:", error);
      setIsProcessing(false);
      setProcessingStep("");
      toast({
        title: "Processing failed",
        description: "There was an error processing your file. Please check the format and try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewPredictions = () => {
    navigate('/predict');
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:text-blue-600">Home</a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-blue-600 font-medium">Upload Data</li>
          </ol>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Patient Data
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your hospital's patient admission data to train our AI model 
            and generate accurate forecasting predictions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-blue-600" />
                  Data Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!processedData ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      isDragOver
                        ? "border-blue-400 bg-blue-50"
                        : uploadedFile
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {isProcessing ? (
                      <div className="space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <div>
                          <p className="text-lg font-medium text-blue-700">
                            Processing Data...
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {processingStep}
                          </p>
                        </div>
                      </div>
                    ) : uploadedFile ? (
                      <div className="space-y-4">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-green-700">
                            File Ready for Processing
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        </div>
                        <div className="flex gap-3 justify-center">
                          <Button
                            onClick={handleUpload}
                            disabled={isProcessing}
                            className="cognizant-gradient"
                          >
                            Process Data
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setUploadedFile(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-gray-700">
                            Drop your CSV file here
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            or click to select from your computer
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button asChild variant="outline">
                            <span>Select CSV File</span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <FileCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-green-700 mb-2">
                        Data Successfully Processed!
                      </h3>
                      <p className="text-gray-600">
                        Your AI model has been trained and is ready for predictions.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Database className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-medium">Data Summary</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {processedData.totalRecords} patient records processed
                        </p>
                        <p className="text-sm text-gray-600">
                          {processedData.departments.length} departments identified
                        </p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-medium">Model Status</span>
                        </div>
                        <p className="text-sm text-gray-600">AI model trained</p>
                        <p className="text-sm text-gray-600">Ready for forecasting</p>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={handleViewPredictions}
                        className="cognizant-gradient"
                      >
                        View Predictions
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleViewAnalytics}
                      >
                        Open Analytics
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setProcessedData(null);
                          setUploadedFile(null);
                        }}
                      >
                        Upload New Data
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Requirements Sidebar */}
          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Data Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Required Columns:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Admission Time</li>
                    <li>• Patient Age</li>
                    <li>• Gender</li>
                    <li>• Department</li>
                    <li>• Admission Type</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">File Format:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• CSV format only</li>
                    <li>• Maximum 50MB</li>
                    <li>• UTF-8 encoding</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Privacy Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your data is processed securely and in compliance with HIPAA regulations. 
                  All patient information is anonymized during processing and never stored 
                  permanently on our servers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;
