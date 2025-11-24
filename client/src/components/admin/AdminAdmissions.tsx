import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, Mail, Phone, User, GraduationCap, Download, Trash2, DownloadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Admission } from "@shared/schema";

export function AdminAdmissions() {
  const { toast } = useToast();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [clearAllConfirm, setClearAllConfirm] = useState(false);
  
  const { data: admissions, refetch } = useQuery<Admission[]>({
    queryKey: ["/api/admissions"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admissions/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Admission form deleted successfully" });
      setDeleteConfirm(null);
      refetch();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete admission form", variant: "destructive" });
    },
  });

  const clearAllMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", "/api/admissions/clear-all", {}),
    onSuccess: () => {
      toast({ title: "Success", description: "All admission forms cleared successfully" });
      setClearAllConfirm(false);
      refetch();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to clear admission forms", variant: "destructive" });
    },
  });

  const downloadMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/admissions/${id}/download`).then((res) => {
        if (!res.ok) throw new Error("Download failed");
        return res.blob();
      }),
    onSuccess: (blob, id) => {
      const admission = admissions?.find((a) => a.id === id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${admission?.name || "admission"}-documents.zip`;
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

  const downloadAllMutation = useMutation({
    mutationFn: () => fetch("/api/admissions/download-all").then((res) => {
      if (!res.ok) throw new Error("Download failed");
      return res.blob();
    }),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `all-admissions-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: "Success", description: "All documents downloaded successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to download all documents", variant: "destructive" });
    },
  });

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>Admission Applications</CardTitle>
          {admissions && admissions.length > 0 && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadAllMutation.mutate()}
                disabled={downloadAllMutation.isPending}
                data-testid="button-download-all"
              >
                <DownloadCloud className="w-4 h-4 mr-2" />
                Download All
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setClearAllConfirm(true)}
                disabled={clearAllMutation.isPending}
                data-testid="button-clear-all"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
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
                  <div className="flex gap-2 flex-wrap">
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
                      onClick={() => setDeleteConfirm(admission.id)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm !== null} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this admission form? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && deleteMutation.mutate(deleteConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={clearAllConfirm} onOpenChange={setClearAllConfirm}>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Clear All</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete ALL admission forms? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => clearAllMutation.mutate()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete All
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
