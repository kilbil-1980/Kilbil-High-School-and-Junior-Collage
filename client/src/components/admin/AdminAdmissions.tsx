import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone, User, GraduationCap, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Admission } from "@shared/schema";

export function AdminAdmissions() {
  const { toast } = useToast();
  const { data: admissions, refetch } = useQuery<Admission[]>({
    queryKey: ["/api/admissions"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admissions/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Admission form deleted successfully" });
      refetch();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete admission form", variant: "destructive" });
    },
  });

  const downloadMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/admissions/${id}/download`).then((res) => {
        if (!res.ok) throw new Error("Download failed");
        return res.blob();
      }),
    onSuccess: (blob, id) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `admission-${id}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: "Success", description: "Documents downloaded successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to download documents", variant: "destructive" });
    },
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    {admission.lastSchool && (
                      <div className="text-sm text-muted-foreground">
                        Last School: {admission.lastSchool}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadMutation.mutate(admission.id)}
                    disabled={downloadMutation.isPending}
                    data-testid={`button-download-${admission.id}`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Docs
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(admission.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${admission.id}`}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
