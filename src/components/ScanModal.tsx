import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, CheckCircle2, AlertTriangle, Clock, Zap } from 'lucide-react';

interface ScanResult {
  id: string;
  type: 'vulnerability' | 'dependency' | 'code_quality';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  file: string;
  line?: number;
  status: 'found' | 'scanning' | 'completed';
}

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  repositoryName?: string;
}

const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose, repositoryName = 'defensis-web-core' }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const scanPhases = [
    { name: 'Initializing scan...', duration: 1000 },
    { name: 'Analyzing dependencies...', duration: 2000 },
    { name: 'Scanning source code...', duration: 3000 },
    { name: 'Checking security patterns...', duration: 2000 },
    { name: 'Generating report...', duration: 1000 }
  ];

  const mockResults: ScanResult[] = [
    {
      id: '1',
      type: 'vulnerability',
      severity: 'critical',
      title: 'SQL Injection in user authentication',
      description: 'Direct SQL query construction without parameterization',
      file: 'src/auth.py',
      line: 45,
      status: 'found'
    },
    {
      id: '2',
      type: 'dependency',
      severity: 'high',
      title: 'Vulnerable dependency: lodash@4.17.20',
      description: 'Known vulnerability in lodash library',
      file: 'package.json',
      status: 'found'
    },
    {
      id: '3',
      type: 'code_quality',
      severity: 'medium',
      title: 'Missing CSRF protection',
      description: 'Forms lack CSRF token validation',
      file: 'src/forms.py',
      line: 12,
      status: 'found'
    },
    {
      id: '4',
      type: 'vulnerability',
      severity: 'low',
      title: 'Weak password policy',
      description: 'Password requirements are too lenient',
      file: 'src/config.py',
      line: 28,
      status: 'found'
    }
  ];

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    setIsComplete(false);

    for (let i = 0; i < scanPhases.length; i++) {
      const phase = scanPhases[i];
      setCurrentPhase(phase.name);
      
      // Simulate phase progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, phase.duration / 10));
        setScanProgress(((i * 100) + progress) / scanPhases.length);
      }
    }

    // Add results gradually
    for (let i = 0; i < mockResults.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setScanResults(prev => [...prev, { ...mockResults[i], status: 'found' }]);
    }

    setIsScanning(false);
    setIsComplete(true);
    setCurrentPhase('Scan completed!');
    setScanProgress(100);

    toast({
      title: "Scan Complete!",
      description: `Found ${mockResults.length} security issues in ${repositoryName}`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'critical';
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-critical" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-high" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-medium" />;
      case 'low': return <AlertTriangle className="h-4 w-4 text-low" />;
      default: return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  useEffect(() => {
    if (isOpen && !isScanning && !isComplete) {
      startScan();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            Security Scan: {repositoryName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!isComplete ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  {isScanning ? (
                    <Zap className="h-8 w-8 text-accent animate-pulse" />
                  ) : (
                    <Shield className="h-8 w-8 text-accent" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isScanning ? 'Scanning in Progress...' : 'Starting Security Scan'}
                </h3>
                <p className="text-muted-foreground">
                  {isScanning ? currentPhase : 'Preparing to scan your repository for security vulnerabilities.'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(scanProgress)}%</span>
                </div>
                <Progress value={scanProgress} className="w-full" />
              </div>

              {isScanning && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>This may take a few minutes...</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Scan Complete!</h3>
                <p className="text-muted-foreground">
                  Found {scanResults.length} security issues in {repositoryName}
                </p>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {scanResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 border rounded-lg bg-card"
                  >
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(result.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{result.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs bg-${getSeverityColor(result.severity)}/10 border-${getSeverityColor(result.severity)}/20 text-${getSeverityColor(result.severity)}`}
                          >
                            {result.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{result.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{result.file}</span>
                          {result.line && <span>Line {result.line}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button>
                  View Full Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanModal;
