import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Trash2, Calendar, Edit2, X } from "lucide-react";
import type { Announcement } from "@shared/schema";

export function AdminAnnouncements() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: 0,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: announcementsData } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  const announcements = announcementsData?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => 
      editingId 
        ? apiRequest("PATCH", `/api/announcements/${editingId}`, data)
        : apiRequest("POST", "/api/announcements", data),
    onSuccess: () => {
      toast({ title: "Success", description: editingId ? "Announcement updated successfully" : "Announcement created successfully" });
      setFormData({ title: "", content: "", priority: 0 });
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/announcements/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Announcement deleted successfully" });
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", content: "", priority: 0 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {editingId ? (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Announcement
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add New Announcement
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ann-title">Title</Label>
              <Input
                id="ann-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Announcement title"
                data-testid="input-announcement-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ann-content">Content</Label>
              <Textarea
                id="ann-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Announcement details"
                rows={4}
                data-testid="textarea-announcement-content"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ann-priority">Priority (0-10)</Label>
              <Input
                id="ann-priority"
                type="number"
                min="0"
                max="10"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                data-testid="input-announcement-priority"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-announcement" className="flex-1">
                {createMutation.isPending ? (editingId ? "Updating..." : "Creating...") : (editingId ? "Update Announcement" : "Create Announcement")}
              </Button>
              {editingId && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleCancelEdit}
                  data-testid="button-cancel-edit"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {!announcements || announcements.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-announcements">
              No announcements yet
            </p>
          ) : (
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-md p-4" data-testid={`announcement-${announcement.id}`}>
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h4 className="font-semibold break-words">{announcement.title}</h4>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(announcement)}
                        data-testid={`button-edit-announcement-${announcement.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirm(announcement.id)}
                        data-testid={`button-delete-announcement-${announcement.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 break-words max-h-32 overflow-y-auto">{announcement.content}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(announcement.date).toLocaleDateString()}
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
            Are you sure you want to delete this announcement? This action cannot be undone.
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
    </div>
  );
}
