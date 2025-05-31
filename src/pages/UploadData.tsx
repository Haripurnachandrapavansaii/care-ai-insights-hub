
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadData = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

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
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        setUploadedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file only.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful!",
        description: "Your patient data has been processed and is ready for analysis.",
      });
    }, 2000);
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
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-green-700">
                          File Ready for Upload
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={handleUpload}
                          disabled={isUploading}
                          className="cognizant-gradient"
                        >
                          {isUploading ? "Processing..." : "Process Data"}
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
