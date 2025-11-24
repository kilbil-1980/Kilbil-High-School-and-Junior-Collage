import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Trash2, Edit2, Users } from "lucide-react";

interface AdminUser {
  id: number;
  username: string;
  role: string;
  createdAt: string;
}

export function AdminManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "sub-admin",
  });
  const [editingUsername, setEditingUsername] = useState<string | null>(null);
  const [editData, setEditData] = useState({ password: "", role: "sub-admin" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: adminUsers, isLoading } = useQuery<AdminUser[]>({
    queryKey: ["/api/admin/all-users"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/admin/create-user", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Admin user created successfully" });
      setFormData({ username: "", password: "", role: "sub-admin" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/all-users"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.message || "Failed to create user", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { username: string; password?: string; role?: string }) =>
      apiRequest("PATCH", `/api/admin/user/${data.username}`, { password: data.password, role: data.role }),
    onSuccess: () => {
      toast({ title: "Success", description: "Admin user updated successfully" });
      setEditingUsername(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/all-users"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.message || "Failed to update user", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (username: string) => apiRequest("DELETE", `/api/admin/user/${username}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Admin user deleted successfully" });
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/all-users"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.message || "Failed to delete user", variant: "destructive" });
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast({ title: "Error", description: "Username and password are required", variant: "destructive" });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleUpdateSubmit = (username: string) => {
    if (!editData.password && !editData.role) {
      toast({ title: "Error", description: "Enter password or role to update", variant: "destructive" });
      return;
    }
    updateMutation.mutate({
      username,
      password: editData.password || undefined,
      role: editData.role || undefined,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="e.g., john_admin"
                data-testid="input-admin-username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
                data-testid="input-admin-password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger id="admin-role" data-testid="select-admin-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sub-admin">Sub Admin</SelectItem>
                  <SelectItem value="master-admin">Master Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-admin">
              {createMutation.isPending ? "Creating..." : "Create Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Admin Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground text-center py-8">Loading...</p>
          ) : !adminUsers || adminUsers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-admins">
              No admin users yet
            </p>
          ) : (
            <div className="space-y-3">
              {adminUsers.map((admin) => (
                <div key={admin.username} className="border rounded-md p-4" data-testid={`admin-${admin.username}`}>
                  {editingUsername === admin.username ? (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Username</Label>
                        <p className="font-medium">{admin.username}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-password-${admin.username}`} className="text-sm">
                          New Password (optional)
                        </Label>
                        <Input
                          id={`edit-password-${admin.username}`}
                          type="password"
                          value={editData.password}
                          onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                          placeholder="Leave empty to keep current"
                          data-testid={`input-edit-password-${admin.username}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-role-${admin.username}`} className="text-sm">
                          Role
                        </Label>
                        <Select value={editData.role} onValueChange={(value) => setEditData({ ...editData, role: value })}>
                          <SelectTrigger id={`edit-role-${admin.username}`} data-testid={`select-edit-role-${admin.username}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sub-admin">Sub Admin</SelectItem>
                            <SelectItem value="master-admin">Master Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateSubmit(admin.username)}
                          disabled={updateMutation.isPending}
                          data-testid={`button-save-admin-${admin.username}`}
                        >
                          {updateMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingUsername(null)}
                          data-testid={`button-cancel-admin-${admin.username}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{admin.username}</h4>
                        <p className="text-xs text-muted-foreground capitalize">{admin.role}</p>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingUsername(admin.username);
                            setEditData({ password: "", role: admin.role });
                          }}
                          data-testid={`button-edit-admin-${admin.username}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(admin.username)}
                          data-testid={`button-delete-admin-${admin.username}`}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  )}
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
            Are you sure you want to delete this admin user? This action cannot be undone.
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
