import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Trash2, Edit2, Users, Lock } from "lucide-react";

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
  });
  const [editingUsername, setEditingUsername] = useState<string | null>(null);
  const [editData, setEditData] = useState({ username: "", password: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: adminUsers, isLoading } = useQuery<AdminUser[]>({
    queryKey: ["/api/admin/all-users"],
  });

  const createMutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => 
      apiRequest("POST", "/api/admin/create-user", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Admin user created successfully" });
      setFormData({ username: "", password: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/all-users"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.message || "Failed to create user", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { username: string; newUsername?: string; password?: string }) =>
      apiRequest("PATCH", `/api/admin/user/${data.username}`, { newUsername: data.newUsername, password: data.password }),
    onSuccess: () => {
      toast({ title: "Success", description: "Master admin updated successfully" });
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

  const handleMasterAdminUpdate = (username: string) => {
    if (!editData.password && !editData.username) {
      toast({ title: "Error", description: "Enter username or password to update", variant: "destructive" });
      return;
    }
    updateMutation.mutate({
      username,
      newUsername: editData.username || undefined,
      password: editData.password || undefined,
    });
  };

  const masterAdmin = adminUsers?.find(u => u.role === "master-admin");
  const subAdmins = adminUsers?.filter(u => u.role === "sub-admin") || [];

  return (
    <div className="space-y-6">
      {/* Master Admin Section */}
      {masterAdmin && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Lock className="w-5 h-5" />
              Master Administrator
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingUsername === masterAdmin.username ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleMasterAdminUpdate(masterAdmin.username);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="master-edit-username">Username</Label>
                  <Input
                    id="master-edit-username"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    placeholder="Leave empty to keep current"
                    data-testid="input-master-edit-username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="master-edit-password">New Password</Label>
                  <Input
                    id="master-edit-password"
                    type="password"
                    value={editData.password}
                    onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                    placeholder="Leave empty to keep current"
                    data-testid="input-master-edit-password"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    data-testid="button-save-master-admin"
                  >
                    {updateMutation.isPending ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditingUsername(null);
                      setEditData({ username: "", password: "" });
                    }}
                    data-testid="button-cancel-master-edit"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-semibold text-lg">{masterAdmin.username}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingUsername(masterAdmin.username);
                      setEditData({ username: "", password: "" });
                    }}
                    data-testid="button-edit-master-admin"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(masterAdmin.createdAt).toLocaleDateString()}
                </div>
                <p className="text-sm text-amber-700">
                  Master admin cannot be deleted. You can only change the username or password.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Sub Admin
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

              <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-admin">
                {createMutation.isPending ? "Creating..." : "Create Sub Admin"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Sub Administrators
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading...</p>
            ) : !subAdmins || subAdmins.length === 0 ? (
              <p className="text-muted-foreground text-center py-8" data-testid="text-no-admins">
                No sub admin users yet
              </p>
            ) : (
              <div className="space-y-3">
                {subAdmins.map((admin) => (
                  <div key={admin.username} className="border rounded-md p-4" data-testid={`admin-${admin.username}`}>
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{admin.username}</h4>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      </div>
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
