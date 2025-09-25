import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  GitBranch, 
  Eye,
  ArrowRight
} from 'lucide-react';

const RecentScans = () => {
  const scans = [
    {
      id: '1',
      repository: 'defensis-web-core',
      branch: 'main',
      status: 'completed',
      duration: '2m 34s',
      timestamp: '2 hours ago',
      vulnerabilities: 0,
      issues: 0,
      language: 'TypeScript'
    },
    {
      id: '2',
      repository: 'api-backend',
      branch: 'develop',
      status: 'completed',
      duration: '3m 12s',
      timestamp: '1 day ago',
      vulnerabilities: 2,
      issues: 1,
      language: 'Python'
    },
    {
      id: '3',
      repository: 'mobile-app',
      branch: 'main',
      status: 'running',
      duration: '1m 45s',
      timestamp: 'In progress',
      vulnerabilities: null,
      issues: null,
      language: 'React Native'
    },
    {
      id: '4',
      repository: 'infrastructure',
      branch: 'main',
      status: 'failed',
      duration: '0m 12s',
      timestamp: '2 days ago',
      vulnerabilities: null,
      issues: null,
      language: 'Terraform'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'running': return 'info';
      case 'failed': return 'critical';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'running': return <Clock className="h-4 w-4 text-info" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-critical" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-accent" />
          Recent Scans
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg bg-secondary/50">
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(scan.status)}
                  <Badge 
                    variant="outline" 
                    className={`text-xs bg-${getStatusColor(scan.status)}/10 border-${getStatusColor(scan.status)}/20 text-${getStatusColor(scan.status)}`}
                  >
                    {scan.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm">{scan.repository}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{scan.branch}</span>
                    <span>•</span>
                    <span>{scan.language}</span>
                    <span>•</span>
                    <span>{scan.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {scan.status === 'completed' && (
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-success">{scan.vulnerabilities} vulns</span>
                      <span className="text-warning">{scan.issues} issues</span>
                    </div>
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  {scan.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            View All Scans
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentScans;
