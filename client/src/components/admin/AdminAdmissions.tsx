import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, User, GraduationCap } from "lucide-react";
import type { Admission } from "@shared/schema";

export function AdminAdmissions() {
  const { data: admissions } = useQuery<Admission[]>({
    queryKey: ["/api/admissions"],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admission Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {!admissions || admissions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8" data-testid="text-no-admissions">
            No applications received yet
          </p>
        ) : (
          <div className="space-y-4">
            {admissions.map((admission) => (
              <div key={admission.id} className="border rounded-md p-4" data-testid={`admission-${admission.id}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{admission.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{admission.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{admission.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="secondary">{admission.className}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(admission.submittedAt).toLocaleString()}
                      </span>
                    </div>
                    {admission.documentName && (
                      <div className="text-sm text-muted-foreground">
                        Document: {admission.documentName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
