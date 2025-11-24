import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Trash2, Clock } from "lucide-react";
import type { Timetable, Period } from "@shared/schema";

export function AdminTimetables() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<string>("Morning Batch");
  const [periods, setPeriods] = useState<Period[]>([
    { name: "Period 1", time: "8:00 AM - 9:00 AM", isBreak: false },
  ]);

  const { data: timetables } = useQuery<Timetable[]>({
    queryKey: ["/api/timetables"],
  });

  const createMutation = useMutation({
    mutationFn: (data: { category: string; periods: string }) => 
      apiRequest("POST", "/api/timetables", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Timetable created successfully" });
      setPeriods([{ name: "Period 1", time: "8:00 AM - 9:00 AM", isBreak: false }]);
      queryClient.invalidateQueries({ queryKey: ["/api/timetables"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/timetables/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Timetable deleted successfully" });
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
    if (periods.length === 0) {
      toast({ title: "Error", description: "Add at least one period", variant: "destructive" });
      return;
    }
    createMutation.mutate({ category, periods: JSON.stringify(periods) });
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
          ) : (
            <div className="space-y-4">
              {timetables.map((timetable) => (
                <div key={timetable.id} className="border rounded-md p-4" data-testid={`timetable-${timetable.id}`}>
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h4 className="font-semibold">{timetable.category}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(timetable.id)}
                      data-testid={`button-delete-timetable-${timetable.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
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
    </div>
  );
}
