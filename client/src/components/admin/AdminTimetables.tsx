import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Plus, Trash2, Clock, Edit2 } from "lucide-react";
import type { Timetable, Period } from "@shared/schema";

export function AdminTimetables() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<string>("Morning Batch");
  const [periods, setPeriods] = useState<Period[]>([
    { name: "Period 1", time: "8:00 AM - 9:00 AM", isBreak: false },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<string>("");
  const [editPeriods, setEditPeriods] = useState<Period[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: timetablesData } = useQuery<Timetable[]>({
    queryKey: ["/api/timetables"],
  });

  const timetables = timetablesData ? [...timetablesData].reverse() : undefined; // Recently added first

  const createMutation = useMutation({
    mutationFn: (data: { category: string; periods: string }) => 
      apiRequest("POST", "/api/timetables", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Timetable created successfully" });
      setPeriods([{ name: "Period 1", time: "8:00 AM - 9:00 AM", isBreak: false }]);
      queryClient.invalidateQueries({ queryKey: ["/api/timetables"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; category: string; periods: string }) =>
      apiRequest("PATCH", `/api/timetables/${data.id}`, { category: data.category, periods: data.periods }),
    onSuccess: () => {
      toast({ title: "Success", description: "Timetable updated successfully" });
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/timetables"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/timetables/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Timetable deleted successfully" });
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ["/api/timetables"] });
    },
  });

  const addPeriod = () => {
    setPeriods([...periods, { name: "", time: "", isBreak: false }]);
  };

  const updatePeriod = (index: number, field: keyof Period, value: string | boolean) => {
    const updated = [...periods];
    updated[index] = { ...updated[index], [field]: value };
    setPeriods(updated);
  };

  const removePeriod = (index: number) => {
    setPeriods(periods.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if category already has a timetable
    if (timetables?.some(t => t.category === category)) {
      toast({ 
        title: "Error", 
        description: `A timetable already exists for ${category}. Please edit or delete the existing one.`, 
        variant: "destructive" 
      });
      return;
    }
    
    if (periods.length === 0) {
      toast({ title: "Error", description: "Add at least one period", variant: "destructive" });
      return;
    }
    
    // Check for empty fields
    const hasEmptyFields = periods.some(p => !p.name?.trim() || !p.time?.trim());
    if (hasEmptyFields) {
      toast({ title: "Error", description: "All periods must have a name and time", variant: "destructive" });
      return;
    }
    
    createMutation.mutate({ category, periods: JSON.stringify(periods) });
  };

  const handleEdit = (timetable: Timetable) => {
    setEditingId(timetable.id);
    setEditCategory(timetable.category);
    setEditPeriods(JSON.parse(timetable.periods));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditCategory("");
    setEditPeriods([]);
  };

  const handleUpdatePeriod = (index: number, field: keyof Period, value: string | boolean) => {
    const updated = [...editPeriods];
    updated[index] = { ...updated[index], [field]: value };
    setEditPeriods(updated);
  };

  const handleRemoveEditPeriod = (index: number) => {
    setEditPeriods(editPeriods.filter((_, i) => i !== index));
  };

  const handleAddEditPeriod = () => {
    setEditPeriods([...editPeriods, { name: "", time: "", isBreak: false }]);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingId) return;
    
    // Check if category changed and if new category already has a timetable
    const currentTimetable = timetables?.find(t => t.id === editingId);
    if (currentTimetable && editCategory !== currentTimetable.category) {
      if (timetables?.some(t => t.category === editCategory)) {
        toast({ 
          title: "Error", 
          description: `A timetable already exists for ${editCategory}. Cannot update to a batch that already has a timetable.`, 
          variant: "destructive" 
        });
        return;
      }
    }
    
    if (editPeriods.length === 0) {
      toast({ title: "Error", description: "Add at least one period", variant: "destructive" });
      return;
    }
    
    // Check for empty fields
    const hasEmptyFields = editPeriods.some(p => !p.name?.trim() || !p.time?.trim());
    if (hasEmptyFields) {
      toast({ title: "Error", description: "All periods must have a name and time", variant: "destructive" });
      return;
    }
    
    updateMutation.mutate({ id: editingId, category: editCategory, periods: JSON.stringify(editPeriods) });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Timetable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tt-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="tt-category" data-testid="select-timetable-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning Batch">Morning Batch</SelectItem>
                  <SelectItem value="Afternoon Batch">Afternoon Batch</SelectItem>
                  <SelectItem value="Junior College">Junior College</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Periods</Label>
              {periods.map((period, index) => (
                <div key={index} className="border rounded-md p-3 space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Period {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePeriod(index)}
                      data-testid={`button-remove-period-${index}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Period name (e.g., Mathematics)"
                    value={period.name}
                    onChange={(e) => updatePeriod(index, "name", e.target.value)}
                    data-testid={`input-period-name-${index}`}
                  />
                  <Input
                    placeholder="Time (e.g., 8:00 AM - 9:00 AM)"
                    value={period.time}
                    onChange={(e) => updatePeriod(index, "time", e.target.value)}
                    data-testid={`input-period-time-${index}`}
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={period.isBreak || false}
                      onChange={(e) => updatePeriod(index, "isBreak", e.target.checked)}
                      className="rounded"
                      data-testid={`checkbox-period-break-${index}`}
                    />
                    <span className="text-sm">Is Break/Lunch</span>
                  </label>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addPeriod} className="w-full" data-testid="button-add-period">
                <Plus className="w-4 h-4 mr-2" />
                Add Period
              </Button>
            </div>

            <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-timetable">
              {createMutation.isPending ? "Creating..." : "Create Timetable"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Timetables</CardTitle>
        </CardHeader>
        <CardContent>
          {!timetables || timetables.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-timetables">
              No timetables yet
            </p>
          ) : editingId ? (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-tt-category">Category</Label>
                <Select value={editCategory} onValueChange={setEditCategory}>
                  <SelectTrigger id="edit-tt-category" data-testid="select-edit-timetable-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning Batch">Morning Batch</SelectItem>
                    <SelectItem value="Afternoon Batch">Afternoon Batch</SelectItem>
                    <SelectItem value="Junior College">Junior College</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Periods</Label>
                {editPeriods.map((period, index) => (
                  <div key={index} className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Period {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveEditPeriod(index)}
                        data-testid={`button-remove-edit-period-${index}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Period name (e.g., Mathematics)"
                      value={period.name}
                      onChange={(e) => handleUpdatePeriod(index, "name", e.target.value)}
                      data-testid={`input-edit-period-name-${index}`}
                    />
                    <Input
                      placeholder="Time (e.g., 8:00 AM - 9:00 AM)"
                      value={period.time}
                      onChange={(e) => handleUpdatePeriod(index, "time", e.target.value)}
                      data-testid={`input-edit-period-time-${index}`}
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={period.isBreak || false}
                        onChange={(e) => handleUpdatePeriod(index, "isBreak", e.target.checked)}
                        className="rounded"
                        data-testid={`checkbox-edit-period-break-${index}`}
                      />
                      <span className="text-sm">Is Break/Lunch</span>
                    </label>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddEditPeriod} className="w-full" data-testid="button-add-edit-period">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Period
                </Button>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={updateMutation.isPending} data-testid="button-update-timetable">
                  {updateMutation.isPending ? "Updating..." : "Update Timetable"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelEdit} data-testid="button-cancel-edit">
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {timetables.map((timetable) => (
                <div key={timetable.id} className="border rounded-md p-4" data-testid={`timetable-${timetable.id}`}>
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h4 className="font-semibold">{timetable.category}</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(timetable)}
                        data-testid={`button-edit-timetable-${timetable.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirm(timetable.id)}
                        data-testid={`button-delete-timetable-${timetable.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {JSON.parse(timetable.periods).length} periods
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Timetable?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the timetable. This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel data-testid="button-cancel-delete-timetable">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && deleteMutation.mutate(deleteConfirm)}
              disabled={deleteMutation.isPending}
              data-testid="button-confirm-delete-timetable"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
