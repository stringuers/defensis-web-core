import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Eye,
  GitBranch,
  Zap
} from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Security Score',
      value: '92',
      max: '100',
      icon: <Shield className="h-5 w-5 text-accent" />,
      trend: '+5',
      trendLabel: 'from last week',
      color: 'accent'
    },
    {
      title: 'Active Scans',
      value: '3',
      icon: <Eye className="h-5 w-5 text-info" />,
      subtitle: '2 repositories, 1 live app',
      color: 'info'
    },
    {
      title: 'Critical Issues',
      value: '1',
      icon: <AlertTriangle className="h-5 w-5 text-critical" />,
      subtitle: 'Requires immediate attention',
      color: 'critical'
    },
    {
      title: 'Issues Resolved',
      value: '24',
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      trend: '+8',
      trendLabel: 'this week',
      color: 'success'
    },
    {
      title: 'Last Scan',
      value: '2m ago',
      icon: <Clock className="h-5 w-5 text-muted-foreground" />,
      subtitle: 'main branch updated',
      color: 'muted'
    },
    {
      title: 'Repositories',
      value: '5',
      icon: <GitBranch className="h-5 w-5 text-warning" />,
      subtitle: '3 public, 2 private',
      color: 'warning'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'accent':
        return 'text-accent';
      case 'info':
        return 'text-info';
      case 'critical':
        return 'text-critical';
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="gradient-card border-border/50 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={getColorClasses(stat.color)}>
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${getColorClasses(stat.color)}`}>
                  {stat.value}
                </span>
                {stat.max && (
                  <span className="text-sm text-muted-foreground">
                    /{stat.max}
                  </span>
                )}
                {stat.trend && (
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.trend}</span>
                  </div>
                )}
              </div>
              
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground">
                  {stat.subtitle}
                </p>
              )}
              
              {stat.trendLabel && (
                <p className="text-xs text-muted-foreground">
                  {stat.trendLabel}
                </p>
              )}

              {stat.title === 'Security Score' && (
                <div className="mt-2">
                  <Progress value={92} className="h-2" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
